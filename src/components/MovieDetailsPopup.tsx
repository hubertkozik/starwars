import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DuelingLightsabers from "../svgs/dueling_lightsabers.svg";
import ReactLoading from "react-loading";

interface IProps {
  url: string;
  handleItemClick: () => void;
}

interface IMovieDetails {
  title: string;
  director: string;
  releaseDate: string;
  openingCrawl: string;
  characters: Array<string>;
}

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
  max-width: 70%;
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
    max-width: 90%;
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
  align-items: center;
`;

const Detail = styled.h4`
  margin-top: 0.5rem;
  width: 100%;
`;

const Yellow = styled.span`
  color: #ffc500;
  margin-right: 5%;
`;

const ShowCharacters = styled.button`
  width: fit-content;
  margin-left: 50%;
  transform: translatex(-50%);
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  font-weight: 1rem;
  border-radius: 0.75rem;
  background-color: #ffc500;
  outline: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #facd38;
  }
`;

const CharactersList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 2rem;
  width: 100%;
`;

const CharacterItem = styled.div`
  text-align: center;
`;

const Loading = styled(ReactLoading)`
  margin-top: 2rem;
`;

function MovieDetailsPopup(props: IProps) {
  const { url, handleItemClick } = props;
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [charactersLoading, setCharactersLoading] = useState<boolean>(false);
  const [charactersPlayed, setCharactersPlayed] = useState<Array<string>>([]);

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success

        const temp = {
          title: response.data.title,
          director: response.data.director,
          releaseDate: response.data.release_date,
          openingCrawl: response.data.opening_crawl,
          characters: response.data.characters,
        };

        setMovieDetails(temp);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [url]);

  const handleShowCharacters = () => {
    if (movieDetails) {
      setCharactersLoading(true);
      axios
        .all(
          movieDetails.characters.map((characterUrl) => axios.get(characterUrl))
        )
        .then(
          axios.spread((...responses) => {
            setCharactersLoading(false);
            setCharactersPlayed(
              responses.map((response) => response.data.name)
            );
          })
        );
    }
  };

  return (
    <Darken>
      <Popup>
        <Header>Movie Details</Header>

        <Close onClick={handleItemClick} src={DuelingLightsabers} alt="Close" />

        {movieDetails ? (
          <Details>
            <Detail>
              <Yellow>Title:</Yellow> {movieDetails?.title}
            </Detail>
            <Detail>
              <Yellow>Director:</Yellow> {movieDetails?.director}
            </Detail>
            <Detail>
              <Yellow>Release date:</Yellow> {movieDetails?.releaseDate}
            </Detail>
            <Detail>
              <Yellow>Opening crawl:</Yellow> {movieDetails?.openingCrawl}
            </Detail>

            <ShowCharacters onClick={handleShowCharacters}>
              If you want to show characters, which played in that movie click
              me!
            </ShowCharacters>

            {charactersLoading && (
              <Loading type="spinningBubbles" height="5%" width="5%" />
            )}
            {charactersPlayed.length > 0 && (
              <>
                <CharactersList>
                  {charactersPlayed.map((character) => (
                    <CharacterItem key={character}>{character}</CharacterItem>
                  ))}
                </CharactersList>
              </>
            )}
          </Details>
        ) : (
          <Loading type="spinningBubbles" height="30%" width="30%" />
        )}
      </Popup>
    </Darken>
  );
}

export default MovieDetailsPopup;
