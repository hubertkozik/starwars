import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import SearchItem from "./SearchItem";

interface IParamTypes {
  searchValue: string;
}

interface IResponse {
  type: string;
  name: string;
  url: string;
}

const List = styled.div`
  display: grid;
  place-items: center;
  margin-top: 2rem;
`;

function SearchPage() {
  const { searchValue } = useParams<IParamTypes>();
  const [searchResponse, setSearchResponse] = useState<IResponse[]>([]);

  useEffect(() => {
    console.log(searchValue);
    axios
      .all([
        axios.get(`https://swapi.dev/api/people/?search=` + searchValue),
        axios.get(`https://swapi.dev/api/films/?search=` + searchValue),
      ])
      .then(
        axios.spread((response1, response2) => {
          // output of req.
          console.log(response2.data);
          const tempResp1 = response1.data.results.map(
            (elem: { name: string; url: string }) => ({
              type: "Character",
              name: elem.name,
              url: elem.url,
            })
          );

          const tempResp2 = response2.data.results.map(
            (elem: { title: string; url: string }) => ({
              type: "Movie",
              name: elem.title,
              url: elem.url,
            })
          );

          const tempArr = [...tempResp1, ...tempResp2];
          setSearchResponse(tempArr);
        })
      );
  }, [searchValue]);

  return (
    <List>
      {searchResponse.length > 0 ? (
        searchResponse.map((elem) => (
          <SearchItem
            name={elem.name}
            type={elem.type}
            url={elem.url}
            key={elem.name}
          />
        ))
      ) : (
        <div>Loading</div>
      )}
    </List>
  );
}

export default SearchPage;
