import React from 'react';
import "../css/Gamecard.css";

function GameCard(myGame) {

  return (
    <div className="GameCard" style={{ backgroundImage: "url(" + myGame.background_image + ")" }}>
      <div className="details">
        <h3>{myGame.name}</h3>
        <table>
          <tbody>
            <tr>
              <td>Genre:</td>
              <td>{myGame.genres.map((x, i) => {
                if (i !== myGame.genres.length - 1) {
                  return x.name + ", "
                } else {
                  return x.name
                }
              })}</td>
            </tr>
            <tr>
              <td>Release Date:</td>
              <td>{myGame.released}</td>
            </tr>
            <tr>
              <td>Metacritic:</td>
              <td>{myGame.metacritic}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GameCard;