import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <NavContainer>
      <img src="https://codeinsta-8cec1.web.app/static/media/logo.d87a39ef.png"></img>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.div`
  height: 65px;
  background: #ffffff;
  z-index: 1000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  > img {
    width: 13%;
  }
`;
