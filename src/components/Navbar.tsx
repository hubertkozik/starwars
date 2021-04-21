import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  background-color: black;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  color: black;
  text-shadow: -1px 0 #ffc500, 0 1px #ffc500, 1px 0 #ffc500, 0 -1px #ffc500;
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  @media (max-width: 960px) {
    font-size: 1.5rem;
  }
`;

const Search = styled.input`
  background-color: transparent;
  color: #a3a3a3;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 30%;

  &::placeholder {
    color: white;
    text-align: center;
  }

  @media (max-width: 960px) {
    width: 90%;
  }
`;

function Navbar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const history = useHistory();

  const handleSendSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push("/search/" + searchInput);
      setSearchInput("");
    }
  };

  return (
    <Nav>
      <Logo to="/">Star Wars Catalogue</Logo>
      <Search
        onKeyDown={(e) => handleSendSearch(e)}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        placeholder="Type to search for characters or films"
      />
    </Nav>
  );
}

export default Navbar;
