import React, { useContext, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { dispatch, setChatPage } = useContext(ChatContext);

  const handleSearch = async () => {
    if (username.trim() === "") {
      setUsers([]);
      setErr(false);
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.displayName.toLowerCase().includes(username.toLowerCase())) {
          console.log(userData.displayName);
          usersData.push(userData);
        }
      });

      setUsers(usersData);
      if (usersData.length === 0) {
        setUsers([]);
        setErr(true);
      } else {
        setErr(false);
      }
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
     handleSearch();
  };

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setChatPage(true);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a users"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span className="userNotFound">users not found!</span>}
     {users.map((user) => (
        <div className="userChat" onClick={() => handleSelect(user)} key={user.uid}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
