import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  background-color: black;
  display: grid;
  place-items: center;
`;

const Logo = styled.h2`
  color: white;
`;

function Navbar() {
  return (
    <Nav>
      <Logo>Star Wars Catalog</Logo>
    </Nav>
  );
}

export default Navbar;
