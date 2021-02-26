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
              <td>{myGame.genres.map(genre => genre.name).join(", ")}</td>
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