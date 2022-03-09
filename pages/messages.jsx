import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
import axios from "axios";
import { baseURL } from "./util/auth";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Segment, Header, Divider, Comment, Grid } from "semantic-ui-react";
import ChatListSearch from "./components/chat/ChatListSearch";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behavior: "smooth" });

const messages = ({ chatsData, user }) => {
  const [chats, setChats] = useState(chatsData);
  const router = useRouter();

  const socket = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicURL: "" });

  const divRef = useRef();
  const openChatId = useRef("");

  // useEffect(() => {
  //   if (!socket.current) {
  //     socket.current = io("http://localhost:3001");
  //   }

  //   if (socket.current) {
  //     socket.current.emit("pingServer", { name: "Jimmy", age: 245 });
  //   }
  // }, []);

  const deleteChat = async (messagesWith) => {
    try {
      await axios.delete(`${baseURL}/api/v1/messages/${messagesWith}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      setChats((prev) =>
        prev.filter((chat) => chat.messagesWith !== messagesWith)
      );
      router.push("/messages", undefined, { shallow: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Segment>
      <Header
        icon="home"
        content="Go Back"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
      <Divider hidden />
      <div style={{ marginTop: "10px" }}>
        <ChatListSearch chats={chats} setChats={setChats} />
      </div>

      {chats.length > 0 ? (
        <>
          <Grid stackable>
            <Grid.Column width={4}>
              <Comment.Group size="big">
                <Segment
                  raised
                  style={{ overflow: "auto", maxHeight: "32rem" }}
                >
                  {chats.map((chat, i) => (
                    <p>Chat Component</p>
                  ))}
                </Segment>
              </Comment.Group>
            </Grid.Column>

            <Grid.Column width={12}>
              {router.query.message && (
                <>
                  <div
                    style={{
                      overflow: "auto",
                      overflowX: "hidden",
                      maxHeight: "32rem",
                      height: "32rem",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <div style={{ position: "sticky", top: "0" }}>
                      <p>Banner Component</p>
                    </div>
                    {messages.length > 0 &&
                      messages.map((message, i) => <p>message Component</p>)}
                  </div>

                  <p>Message Input Component</p>
                </>
              )}
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <p>No Chats</p>
      )}
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
