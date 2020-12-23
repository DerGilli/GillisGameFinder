import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
//import GameVideo from "./GameVideo";
import "../css/Game.css"
import Loader from "./Loader";
import ScreenshotGallery from "./ScreenshotGallery";

const parse = require('html-react-parser');

function Game() {

  const [game, setGame] = useState();
  const { slug } = useParams();
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    getData(slug).then((data) => {
      setGame(data)
    })
    getScreenshots(slug).then((data) => {
      setScreenshots(data.results)
    })
  }, [])

  if (typeof game === "undefined") {
    return <Loader />
  } else {
    return (
      <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.5)),  url(" + game.background_image_additional + ")" }} className="wrapper">
        <div className="content">
          <h2>{game.name}</h2>
          <div className="content-details">
            {/* <GameVideo slug={slug} /> */}
            {parse(game.description)}
          </div>
        </div>
        {screenshots.length ? <ScreenshotGallery screenshots={screenshots} /> : <div></div>}
      </div>
    )
  }
}

async function getData(slug) {
  console.log("caching data")
  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=a7fa218298c14aa19d0190447e2f279c`);
  return await response.json();
}

async function getScreenshots(slug) {
  console.log("caching screenshot")
  const response = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=a7fa218298c14aa19d0190447e2f279c`);
  return await response.json();
}

export default Game;