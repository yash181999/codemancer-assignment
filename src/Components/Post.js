import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import React from "react";
import { Gif } from "@giphy/react-components";

function Post({ message }) {
  return (
    <PostContainer>
      <ProfileInfo>
        <Avatar></Avatar>
        <h5>Demo User</h5>
      </ProfileInfo>
      <PostMedia>
        <p>{message.message}</p>
        {message.gif && (
          <Gif width={"100%"} height={300} gif={message.gif}></Gif>
        )}
      </PostMedia>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  max-width: 500px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 5px;
  padding: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  > h5 {
    margin-left: 10px;
  }
`;

const PostMedia = styled.div`
  margin-left: 4px;
  text-align: left;
`;
