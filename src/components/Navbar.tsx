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
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Search = styled.input`
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
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
<<<<<<< HEAD
      <Logo>Star Wars Catalog</Logo>
      <Search
        onKeyDown={(e) => handleSendSearch(e)}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        placeholder="Type to search"
      />
=======
      <Logo to="/">Star Wars Catalog</Logo>
>>>>>>> Basic_logic_of_app
    </Nav>
  );
}

export default Navbar;
