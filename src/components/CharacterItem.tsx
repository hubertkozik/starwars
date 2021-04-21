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
  border-bottom: 1px solid black;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
`;

const Name = styled.h3``;

const Gender = styled.h4``;

const BirthYear = styled.h5``;

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
        <Gender>{gender}</Gender>
        <BirthYear>{birthYear}</BirthYear>
      </Item>
      {popupShow && (
        <CharacterDetailsPopup url={url} handleItemClick={handleItemClick} />
      )}
    </>
  );
}

export default CharacterItem;
