import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import GameVideo from "./GameVideo";
import "../css/Game.css"
import Loader from "./Loader";

const parse = require('html-react-parser');

function Game() {

  const [game, setGame] = useState();
  const { slug } = useParams();

  useEffect(() => {
    getData(slug).then((data) => {
      setGame(data)
    })
  }, [])

  if (typeof game === "undefined") {
    return <Loader />
  } else {
    return (
      <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.5)),  url(" + game.background_image + ")" }} className="wrapper">
        <div className="content">
          <h2>{game.name}</h2>
          <GameVideo slug={slug} />
          <div className="content-details">
            {parse(game.description)}
          </div>
        </div>
      </div>
    )
  }
}

async function getData(slug) {
  console.log("caching data")
  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=a7fa218298c14aa19d0190447e2f279c`);
  return await response.json();
}

export default Game;