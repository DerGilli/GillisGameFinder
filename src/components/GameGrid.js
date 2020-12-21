import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard'
import "../css/Gamegrid.css";
import {
  Link
} from "react-router-dom";
import Loader from './Loader';

function GameGrid() {


  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data.length < 1) {
      fetchData().then((data) => {
        setData(data.results)
      })
    }
  }, [])

  if (data.length > 0 && !isLoaded) {
    setIsLoaded(true)
  }

  if (isLoaded) {
    return (
      <div className="GameGrid-Wrapper">
        <div className="Sidebar">

        </div>
        <div className="GameGrid">
          {data.map((game, idx) => {
            return <Link key={idx} to={"/" + game.slug} >{GameCard(game)}</Link>
          })}
        </div>
      </div>
    )
  } else {
    return <Loader />
  }
}


function fetchData() {
  //Try to get the Collection from local Storage. Request data from API if not succesful.

  //let gameCollection = []
  //gameCollection = JSON.parse(localStorage.getItem("games"));
  // if (!gameCollection.length > 0) {
  //   gameCollection = fetchAsync()
  // }
  //return gameCollection

  return fetch(`https://api.rawg.io/api/games?key=a7fa218298c14aa19d0190447e2f279c&page_size=40`).then((res) => res.json())

}

// async function fetchAsync() {
//   let gameCollection = []
//   let i = 0;
//   let query = `https://api.rawg.io/api/games?key=a7fa218298c14aa19d0190447e2f279c&page_size=20`
//   while (i < 5) {
//     await fetch(query)
//       .then(response => response.json())
//       .then(data => {
//         gameCollection = gameCollection.concat(data.results);
//         query = data.next
//       }
//       )
//       .catch(err => console.log(err));
//     i++
//   }
//   localStorage.setItem("games", JSON.stringify(gameCollection))
//   return gameCollection
// }

export default GameGrid;