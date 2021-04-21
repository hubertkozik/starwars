import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  background-color: black;
  display: grid;
  place-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

function Navbar() {
  return (
    <Nav>
      <Logo to="/">Star Wars Catalog</Logo>
    </Nav>
  );
}

export default Navbar;
