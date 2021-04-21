import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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

const ShowCharacters = styled.button``;

const CharactersList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CharacterItem = styled.div``;

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

        <Close onClick={handleItemClick}>Close</Close>

        {movieDetails ? (
          <Details>
            <Detail>Title: {movieDetails?.title}</Detail>
            <Detail>Director: {movieDetails?.director}</Detail>
            <Detail>Release date: {movieDetails?.releaseDate}</Detail>
            <Detail>Opening crawl: {movieDetails?.openingCrawl}</Detail>

            <ShowCharacters onClick={handleShowCharacters}>
              If you want to show characters, which played in that movie click
              me!
            </ShowCharacters>

            {charactersLoading && <p>Loading</p>}
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
          <p>Loading</p>
        )}
      </Popup>
    </Darken>
  );
}

export default MovieDetailsPopup;
