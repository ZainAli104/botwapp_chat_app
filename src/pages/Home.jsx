import React, { useContext, useEffect, useState } from "react";

import { ChatContext } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { showChat } = useContext(ChatContext);

  useEffect(() => {
    const handleWindowResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (currentIsMobile !== isMobile) {
        setIsMobile(currentIsMobile);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isMobile]);

  return (
    <div className="home">
      <div className="container">
      {isMobile ? (
        !showChat ? <Sidebar /> : <Chat />
      ) : (
        <>
          <Sidebar />
          <Chat />
        </>
      )}
      </div>
    </div>
  );
};

export default Home;
