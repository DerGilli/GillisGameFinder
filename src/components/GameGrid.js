import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard'
import "../css/Gamegrid.css";
import {
  Link
} from "react-router-dom";
import Loader from './Loader';

function GameGrid({ query }) {

  require('dotenv').config();

  const [data, setData] = useState({});
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    if (data.next) {
      fetchNext(data.next).then((resData) => {
        setData(resData)
        setGames(games.concat(resData.results))
      })
    }
  }

  useEffect(() => {
    fetchData(query).then((resData) => {
      setData(resData)
      setGames(resData.results)
    })
  }, [query])

  if (data.results?.length > 0 && !isLoaded) {
    setIsLoaded(true)
  }

  if (isLoaded) {
    return (
      <div className="GameGrid-Wrapper">
        <div className="GameGrid">
          {games.map((game, idx) => {
            return <Link key={idx} to={"/" + game.slug} >{GameCard(game)}</Link>
          })}
        </div>
        <button onClick={handleClick}>Load more</button>
      </div>

    )
  } else {
    return <Loader />
  }
}


function fetchData(query) {
  return fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_KEY}&search=${query}&ordering=-added&search_exact=true&page_size=20`).then((res) => res.json())
}

function fetchNext(query) {
  return fetch(query).then((res) => res.json())
}

export default GameGrid;