import React, { useState } from "react";
import styled from "styled-components";
import CharacterDetailsPopup from "./CharacterDetailsPopup";

interface IProps {
  name: string;
  gender: string;
  birthYear: string;
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

const Gender = styled.h4`
  color: white;
  margin-bottom: 0.5rem;
`;

const BirthYear = styled.h5`
  color: white;
`;

function CharacterItem(props: IProps) {
  const { name, gender, birthYear, url } = props;

  const [popupShow, setPopupShow] = useState<boolean>(false);

  const handleItemClick = () => {
    setPopupShow(!popupShow);
  };

  return (
    <>
      <Item onClick={handleItemClick}>
        <Name>{name}</Name>
        <Gender>Gender: {gender}</Gender>
        <BirthYear>Birth year: {birthYear}</BirthYear>
      </Item>
      {popupShow && (
        <CharacterDetailsPopup url={url} handleItemClick={handleItemClick} />
      )}
    </>
  );
}

export default CharacterItem;
