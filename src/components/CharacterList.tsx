import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import CharacterItem from "./CharacterItem";

interface ICharacter {
  name: string;
  gender: string;
  birthYear: string;
  url: string;
}

const List = styled.div`
  display: grid;
  place-items: center;
  margin-top: 2rem;
`;

const LoadMoreCharacters = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

function CharacterList() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [is5Loaded, setIs5Loaded] = useState<boolean>(false);
  const maxCharacters = useRef<number>(0);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then(function (response) {
        // handle success
        const temp = response.data.results.map((elem: any) => ({
          name: elem.name,
          gender: elem.gender,
          birthYear: elem.birth_year,
          url: elem.url,
        }));
        setCharacters(temp);
        setNextPage(response.data.next);
        maxCharacters.current = response.data.count;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleLoadMoreCharacters = () => {
    if (
      characters.length <
      maxCharacters.current - (maxCharacters.current % 5)
    ) {
      if (!is5Loaded) {
        axios
          .get(nextPage)
          .then(function (response) {
            // handle success
            let temp = [];
            for (let i = 0; i < response.data.results.length / 2; i++)
              temp.push({
                name: response.data.results[i].name,
                gender: response.data.results[i].gender,
                birthYear: response.data.results[i].birth_year,
                url: response.data.results[i].url,
              });
            setCharacters([...characters, ...temp]);
            setIs5Loaded(!is5Loaded);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } else {
        axios
          .get(nextPage)
          .then(function (response) {
            // handle success
            let temp = [];
            for (
              let i = response.data.results.length / 2;
              i < response.data.results.length;
              i++
            )
              temp.push({
                name: response.data.results[i].name,
                gender: response.data.results[i].gender,
                birthYear: response.data.results[i].birth_year,
                url: response.data.results[i].url,
              });
            setCharacters([...characters, ...temp]);
            setIs5Loaded(!is5Loaded);
            setNextPage(response.data.next);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } else if (characters.length === maxCharacters.current) {
      alert("brak wiecej");
    } else {
      axios
        .get(nextPage)
        .then(function (response) {
          // handle success
          const temp = response.data.results.map((elem: any) => ({
            name: elem.name,
            gender: elem.gender,
            birthYear: elem.birth_year,
            url: elem.url,
          }));
          setCharacters([...characters, ...temp]);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  return (
    <List>
      {characters.length > 0 ? (
        <>
          {characters.map((character) => (
            <CharacterItem
              name={character.name}
              gender={character.gender}
              birthYear={character.birthYear}
              url={character.url}
              key={character.name}
            />
          ))}
          <LoadMoreCharacters onClick={handleLoadMoreCharacters}>
            Load 5 more characters
          </LoadMoreCharacters>
        </>
      ) : (
        <div>Loading</div>
      )}
    </List>
  );
}

export default CharacterList;
