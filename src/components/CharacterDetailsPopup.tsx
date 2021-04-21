import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Darken = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Popup = styled.div`
  position: relative;
  background-color: #3d3d3d;
  width: 80%;
  height: 80vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

const Close = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.h2``;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Detail = styled.h4`
  margin-top: 0.5rem;
`;

interface IProps {
  url: string;
  handleItemClick: () => void;
}

interface ICharacterDetails {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  eyeColor: string;
  hairColor: string;
  homeworld: string;
  films: Array<string>;
}

function CharacterDetailsPopup(props: IProps) {
  const { url, handleItemClick } = props;

  const [characterDetails, setCharacterDetails] = useState<ICharacterDetails>();

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        const temp = {
          name: response.data.name,
          gender: response.data.gender,
          birthYear: response.data.birth_year,
          height: response.data.height,
          eyeColor: response.data.eye_color,
          hairColor: response.data.hair_color,
          homeworld: response.data.homeworld,
          films: response.data.films,
        };

        axios
          .get(temp.homeworld)
          .then(function (response) {
            // handle success
            temp.homeworld = response.data.name;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

        temp.films.forEach(
          (movieUrl: string, index: number, array: Array<string>) =>
            axios
              .get(movieUrl)
              .then(function (response) {
                // handle success
                temp.films[index] = response.data.title;

                if (index === array.length - 1) {
                  setCharacterDetails(temp);
                }
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [url]);

  return (
    <Darken>
      <Popup>
        <Header>Character Details</Header>

        <Close onClick={handleItemClick}>Close</Close>

        {characterDetails ? (
          <Details>
            <Detail>Name: {characterDetails?.name}</Detail>
            <Detail>Gender: {characterDetails?.gender}</Detail>
            <Detail>Birth year: {characterDetails?.birthYear}</Detail>
            <Detail>Height: {characterDetails?.height}</Detail>
            <Detail>Eye color: {characterDetails?.eyeColor}</Detail>
            <Detail>Hair color:{characterDetails?.hairColor}</Detail>
            <Detail>Homeworld: {characterDetails?.homeworld}</Detail>
            <Detail>Films played:</Detail>
            {characterDetails?.films.map((film) => (
              <Detail key={film}>{film}</Detail>
            ))}
          </Details>
        ) : (
          <p>Loading</p>
        )}
      </Popup>
    </Darken>
  );
}

export default CharacterDetailsPopup;
