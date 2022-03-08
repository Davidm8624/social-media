import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { baseURL } from "./util/auth";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Segment, Header, Divider, Comments, Grid } from "semantic-ui-react";
import { set } from "lodash";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  devRef.current.scrollIntoView({ behavior: "smooth" });

const messages = ({chatsData, user}) => {
  const [chats, setChats] = useState(chatsData);
  const router = useRouter();
  const socket = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicURL: "" });

  const divRef = useRef();
  const openChatId = useRef("");

  // useEffect(() => {
  //   if(!socket.current){
  //     socket.current = io('http://localhost:3001')
  //   }
  //   if(socket.current){
  //     socket.current.emit('pingServer', {name: jimmy, age: 123456789})
  //   }
  // }, []);

  const deleteChat = async (messagesWith) => {
    try {
      await axios.delete(`${baseURL}/api/v1/messages/${messagesWith}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      setChats((prev) =>
        prev.filter((chat) => chat.messagesWith === messagesWith)
      );
      router.push("/messages", { shallow: true });
    } catch (error) {
      console.log(error).send("error at delete chat");
    }
  };

  return (
    <Segment>
      <Header
        icon="home"
        content="go back"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
      <Divider hidden/>
      <div style={{marginTop: "10px"}}>
        <p>chat search component</p>
      </div>

      {chats.length > 0 ? (<></>) : (<p>no chats</p>)}
    </Segment>
  );
};

messages.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { chatsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default messages;
