import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DuelingLightsabers from "../svgs/dueling_lightsabers.svg";
import ReactLoading from "react-loading";

const Darken = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  position: relative;
  background-color: #222222;
  width: fit-content;
  padding: 5% 10%;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: 1px solid #ffc500;

  @media (max-width: 960px) {
    width: 90%;
  }
`;

const Close = styled.img`
  position: absolute;
  right: 5%;
  top: 5%;
  width: 4rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  @media (max-width: 960px) {
    width: 2rem;
  }
`;

const Header = styled.h2`
  margin-bottom: 3rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Detail = styled.h4`
  margin-top: 0.5rem;
  font-weight: normal;
`;

const DetailList = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const DetailListItem = styled.li`
  margin-top: 0.5rem;
  margin-left: 2rem;
`;

const Yellow = styled.span`
  color: #ffc500;
  margin-right: 5%;
`;

const Loading = styled(ReactLoading)`
  margin-top: 2rem;
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
        const temp: ICharacterDetails = {
          name: response.data.name,
          gender: response.data.gender,
          birthYear: response.data.birth_year,
          height: response.data.height,
          eyeColor: response.data.eye_color,
          hairColor: response.data.hair_color,
          homeworld: response.data.homeworld,
          films: [],
        };

        const films = response.data.films;

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

        axios.all(films.map((movieUrl: string) => axios.get(movieUrl))).then(
          axios.spread((...responses) => {
            temp.films = responses.map((response: any) => response.data.title);

            setCharacterDetails(temp);
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

        <Close onClick={handleItemClick} src={DuelingLightsabers} alt="Close" />

        {characterDetails ? (
          <Details>
            <Detail>
              <Yellow>Name:</Yellow> {characterDetails?.name}
            </Detail>
            <Detail>
              <Yellow>Gender:</Yellow> {characterDetails?.gender}
            </Detail>
            <Detail>
              <Yellow>Birth year:</Yellow> {characterDetails?.birthYear}
            </Detail>
            <Detail>
              <Yellow>Height:</Yellow> {characterDetails?.height}
            </Detail>
            <Detail>
              <Yellow>Eye color:</Yellow> {characterDetails?.eyeColor}
            </Detail>
            <Detail>
              <Yellow>Hair color:</Yellow> {characterDetails?.hairColor}
            </Detail>
            <Detail>
              <Yellow>Homeworld:</Yellow> {characterDetails?.homeworld}
            </Detail>
            <DetailList>
              Films where character played:
              {characterDetails?.films.map((film) => (
                <DetailListItem key={film}>{film}</DetailListItem>
              ))}
            </DetailList>
          </Details>
        ) : (
          <Loading type="spinningBubbles" height="30%" width="30%" />
        )}
      </Popup>
    </Darken>
  );
}

export default CharacterDetailsPopup;
