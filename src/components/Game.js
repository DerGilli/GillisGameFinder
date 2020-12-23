import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
//import GameVideo from "./GameVideo";
import "../css/Game.css"
import Iconbar from "./Iconbar";
import Loader from "./Loader";
import ScreenshotGallery from "./ScreenshotGallery";

const parse = require('html-react-parser');

function Game() {

  const [game, setGame] = useState();
  const { slug } = useParams();
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    getData(slug).then((data) => {
      if (!data.redirect) {
        setGame(data)
        getScreenshots(slug).then((data) => {
          setScreenshots(data.results)
        })
      }
    })

  }, [slug])



  if (typeof game === "undefined") {
    return <Loader />
  } else {
    const gameDescription = () => {
      try {
        return parse(game.description)
      } catch (error) {
        console.log(error)
        return "no description available"
      }
    }
    return (
      <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.5)),  url(" + game.background_image_additional + ")" }} className="wrapper">
        <div className="content">
          <div className="header">
            <h2>{game.name}</h2>
            <Iconbar redditLink={game.reddit_url} website={game.website} />
          </div>
          <div className="content-details">
            {/* <GameVideo slug={slug} /> */}
            {gameDescription()}
          </div>
        </div>
        {screenshots.length ? <ScreenshotGallery screenshots={screenshots} /> : <div></div>}
      </div>
    )
  }
}

async function getData(slug) {
  console.log("caching data")
  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=a7fa218298c14aa19d0190447e2f279c`).catch((err) => console.log(err));
  return await response.json();
}

async function getScreenshots(slug) {
  console.log("caching screenshot")
  const response = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=a7fa218298c14aa19d0190447e2f279c`).catch((err) => console.log(err));
  return await response.json();
}

export default Game;