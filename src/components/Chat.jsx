import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
import back from "../img/back icon.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data, setChatPage } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
      {data.user?.photoURL ? (
        <>
        <img className="back_icon" src={back} alt="back" onClick={() => setChatPage(false)} />
        <img src={data.user?.photoURL} alt="profile_pic" />
        <span>{data.user?.displayName}</span>
        </>
      ) : null}
        {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
