import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setIsLoading(true);

    const messageData = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };
  
    let successfullyUpdated = false;
  
    if (img) {
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const messageWithImage = {
            ...messageData,
            img: downloadURL,
          };
  
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion(messageWithImage),
            });
            successfullyUpdated = true;
          } catch (error) {
            console.error(error);
          }
  
          if (!successfullyUpdated) {
            await setDoc(doc(db, "chats", data.chatId), {
              messages: [messageWithImage],
            });
          }
        }
      );
    } else if (text.trim()) {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion(messageData),
        });
        successfullyUpdated = true;
      } catch (error) {
        console.error(error);
      }
  
      if (!successfullyUpdated) {
        await setDoc(doc(db, "chats", data.chatId), {
          messages: [messageData],
        });
      }
    } else {
      console.error("No text or image");
      setIsLoading(false);
      return;
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".displayName"]: data.user.displayName,
      [data.chatId + ".uid"]:         data.user.uid,
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]:        serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".displayName"]: currentUser.displayName,
      [data.chatId + ".uid"]:         currentUser.uid,
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setIsLoading(false);
  };

  return (
    <div className="input">
      <textarea
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {/* <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      /> */}
      <div className="send">
        {/* <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        {!isLoading ? (
          <button onClick={handleSend}>Send</button>
        ) : (
          <button>Sending...</button>
        )}
      </div>
    </div>
  );
};

export default Input;
