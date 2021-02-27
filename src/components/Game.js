import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Iconbar from "./Iconbar";
import Loader from "./Loader";
import GameVideo from './GameVideo'
import Chart from './Chart'
import ScreenshotGallery from "./ScreenshotGallery";
import "../css/Game.css"
require('dotenv').config();
const parse = require('html-react-parser');

function Game() {

  const [game, setGame] = useState();
  const [gameIsSet, setgameIsSet] = useState(false)
  const [screenshots, setScreenshots] = useState([]);
  const [hasScreenshots, setHasScreenshots] = useState(false)
  const [hasRating, setHasRating] = useState(false)
  const { slug } = useParams();
  
  //use this function in order to be able to use await, just because its prettier then .then().
  //Call this  function inside useEffect with a slug dependency so it updated automatically
  async function initalize(slug){
    setgameIsSet(false)
    const gameData = await getGameData(slug)
    if (!gameData.redirect && gameData.detail !== "Not found") {
      setGame(gameData)
      setgameIsSet(true)
      gameData.ratings?.length > 1 ? setHasRating(true) : setHasRating(false)
      console.log(gameData.ratings)
      const screenshotData = await getScreenshots(slug)
      if (screenshotData.results?.length > 1) {
        setScreenshots(screenshotData.results)
        setHasScreenshots(true)
      } else {
        setHasScreenshots(false)
        setScreenshots([])
      }
    }
  }      

  // As described above just call initialize.
  useEffect(() => {
      initalize(slug)}
    , [slug])
    
  if (!gameIsSet) {
    return <Loader />
  } else {
    return (
    <>
      <div className="wrapper" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),  url(" + game.background_image_additional + ")", backgroundSize: 'cover' }}>
        <div className="content" >
          <div className="header">
            <h2>{game.name}</h2>
            <Iconbar redditLink={game.reddit_url} website={game.website} />
          </div>
          <div className="content-details">
            <GameVideo slug={slug} />
            {game.description && parse(game.description)}
          </div>
        </div>
      </div>
      {hasRating && <Chart ratings={game.ratings} />}
      {hasScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </>
    )
  }
}

async function getGameData(slug) {
  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${process.env.REACT_APP_RAWG_KEY}`).catch((err) => console.log(err));
  return await response.json();
}

async function getScreenshots(slug) {
  const response = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.REACT_APP_RAWG_KEY}`).catch((err) => console.log(err));
  return await response.json();
}

export default Game;