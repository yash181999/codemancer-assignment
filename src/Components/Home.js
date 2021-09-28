import { Avatar, Button, Icon, IconButton } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import styled from "styled-components";
import { Gif, Grid } from "@giphy/react-components";
import { offset } from "dom-helpers";
import GifSharp from "@material-ui/icons/GifSharp";
import Post from "./Post";

function Home() {
  const [textPost, setTextPost] = useState("");
  const [gif, setGif] = useState(null);
  const [openGifPicker, setOpenGifPicker] = useState(false);
  const [gifData, setGifData] = useState(null);
  const [searchGif, setSearchGif] = useState("hello");
  const giphyFetch = new GiphyFetch("j4fmea9GqBTbc6VgXJpfuPwZRO973iiD");
  const [messageList, setMessageList] = useState(null);
  const ref = useRef();

  const fetchGifs = async () => {
    const data = searchGif
      ? await giphyFetch.search(searchGif, { offset, limit: 100 })
      : await giphyFetch.trending({ offset, limit: 100 });
    setGifData(data);
  };

  const onGifClick = (gif, e) => {
    e.preventDefault();
    setGif(gif);
    setOpenGifPicker(false);
  };

  useEffect(() => {
    fetchGifs();
  }, [searchGif]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openGifPicker && ref.current && !ref.current.contains(e.target)) {
        setOpenGifPicker(false);
        setSearchGif("");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openGifPicker]);

  const addMessage = () => {
    const list = messageList ? messageList : [];
    const message = {
      id: Date.now(),
      message: textPost,
      gif: gif ? gif : "",
    };
    list.push(message);
    setMessageList(list);
    localStorage.setItem("messages", JSON.stringify(list));
    setTextPost("");
    setGif(null);
  };

  const getMessageList = () => {
    const list = JSON.parse(localStorage.getItem("messages"));
    setMessageList(list);
    console.log(list);
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <HomeContainer>
      <PostContainer>
        <PostMessage>
          <ProfileInfo>
            <Avatar></Avatar>
            <h3>Demo User</h3>
          </ProfileInfo>
          <textarea
            value={textPost}
            onChange={(e) => setTextPost(e.target.value)}
            placeholder="What do you want to talk about"
            className="post__textarea"
          />
          <div>{gif && <Gif width={200} gif={gif}></Gif>}</div>
          <MessageBoxBottom>
            <GifButtonContainer>
              <IconButton
                onClick={() => setOpenGifPicker(!openGifPicker)}
                style={{ background: "#0b86ee" }}
              >
                <GifSharp />
              </IconButton>
              {openGifPicker && (
                <GifInputBox ref={ref}>
                  <div>
                    <input
                      value={searchGif}
                      onChange={(e) => setSearchGif(e.target.value)}
                      placeholder="Search GIF"
                    ></input>
                  </div>
                  {gifData && (
                    <div>
                      {gifData.data.map((item) => {
                        return (
                          <Gif
                            onGifClick={onGifClick}
                            key={item.id}
                            width={300}
                            gif={item}
                          />
                        );
                      })}
                    </div>
                  )}
                </GifInputBox>
              )}
            </GifButtonContainer>
            <Button onClick={addMessage}>POST</Button>
          </MessageBoxBottom>
        </PostMessage>
      </PostContainer>
      {messageList &&
        messageList
          .sort((a, b) => {
            return +a.id < +b.id ? 1 : -1;
          })
          .map((message) => {
            return <Post message={message} />;
          })}
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  background: #f0f2f5;
  height: 100vh;
  padding: 10px;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = styled.div`
  margin-top: 65px;
  width: 100%;
  max-width: 500px;
`;

const PostMessage = styled.div`
  padding: 20px;
  background: white;
  border: 1px solid gray;
  border-radius: 5px;
  max-width: 500px;
  > textarea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
    height: 100px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  > h3 {
    margin-left: 10px;
  }
`;

const GifInputBox = styled.div`
  height: 300px;
  position: absolute;
  z-index: 1000;
  background-color: white;
  width: 300px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  overflow: scroll;
  padding: 10px;
  > div {
    position: absolute;
    background-color: black;
    > input {
      position: fixed;
      z-index: 2000;
      width: 300px;
      border: none;
      height: 25px;
      padding: 3px;
      font-size: 16px;
      outline: none;
      margin-bottom: 10px;
    }
  }
`;

const GifButtonContainer = styled.div`
  position: relative;
`;

const MessageBoxBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  > button {
    background: #008000;
    color: white;
    :hover {
      color: #008000;
      background: lightblue;
    }
  }
`;
