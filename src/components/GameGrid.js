import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard'
import {Link} from "react-router-dom";
import Loader from './Loader';
import "../css/Gamegrid.css";
require('dotenv').config();

function GameGrid({ query }) {

  const [pagination, setPagination] = useState()
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    fetchNext(pagination).then((resData) => {
        setPagination(resData.next)
        setGames(games.concat(resData.results))
      })
  }

  useEffect(() => {
    fetchData(query).then((resData) => {
      setPagination(resData.next)
      setGames(resData.results)
    })
  }, [query])

  if (games?.length > 0 && !isLoaded) {
      setIsLoaded(true)
  }

  if (isLoaded) {
    return (
      <div className="GameGrid-Wrapper">
        <div className="GameGrid">
          {games.map((game) => {
            //Every card is a link to the game site
            return <Link key={game.id} to={"/" + game.slug} >{GameCard(game)}</Link>
          })}
        </div>
        {pagination && <button onClick={handleClick}>Load more</button>}
      </div>
    )
  } else {
    return <Loader />
  }
}

async function fetchData(query) {
  const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_KEY}&search=${query}&ordering=-added&search_exact=true&page_size=20`)
  return await response.json()
}

async function fetchNext(query) {
  const response = await fetch(query)
  return await response.json()
}

export default GameGrid;