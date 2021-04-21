import React, { useState } from "react";
import styled from "styled-components";
import CharacterDetailsPopup from "./CharacterDetailsPopup";
import MovieDetailsPopup from "./MovieDetailsPopup";

interface IProps {
  type: string;
  name: string;
  url: string;
}

const Item = styled.div`
  border-bottom: 1px solid white;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;

  &:hover {
    cursor: pointer;
    background-color: #3a3a3a;
  }
`;

const Name = styled.h3`
  color: #ffc500;
  margin-bottom: 0.5rem;
`;

const Type = styled.h4`
  color: white;
`;

function SearchItem(props: IProps) {
  const { type, name, url } = props;
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const handleSearchItemClick = () => {
    setPopupShow(!popupShow);
  };

  return (
    <>
      <Item onClick={handleSearchItemClick}>
        <Name>{name}</Name>
        <Type>{type}</Type>
      </Item>
      {popupShow && type === "Character" && (
        <CharacterDetailsPopup
          url={url}
          handleItemClick={handleSearchItemClick}
        />
      )}
      {popupShow && type === "Movie" && (
        <MovieDetailsPopup url={url} handleItemClick={handleSearchItemClick} />
      )}
    </>
  );
}

export default SearchItem;
