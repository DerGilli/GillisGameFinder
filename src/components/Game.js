import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Iconbar from "./Iconbar";
import Loader from "./Loader";
import GameVideo from './GameVideo'
import ScreenshotGallery from "./ScreenshotGallery";
import "../css/Game.css"
require('dotenv').config();
const parse = require('html-react-parser');

function Game() {

  const [game, setGame] = useState();
  const [gameIsSet, setgameIsSet] = useState(false)
  const { slug } = useParams();
  const [screenshots, setScreenshots] = useState([]);

  //use this function in order to be able to use await, just because its prettier then .then().
  //Call this  function inside useEffect with a slug dependency so it updated automatically
  async function initalize(slug){
    setgameIsSet(false)
    const gameData = await getGameData(slug)
    if (!gameData.redirect) {
      setGame(gameData)
      setgameIsSet(true)
        const screenshotData = await getScreenshots(slug)
          setScreenshots(screenshotData.results)
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
      <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.5)),  url(" + game.background_image_additional + ")" }} className="wrapper">
        <div className="content">
          <div className="header">
            <h2>{game.name}</h2>
            <Iconbar redditLink={game.reddit_url} website={game.website} />
          </div>
          <div className="content-details">
            <GameVideo slug={slug} />
            {game.description && parse(game.description)}
          </div>
        </div>
        {screenshots.length ? <ScreenshotGallery screenshots={screenshots} /> : <div></div>}
      </div>
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