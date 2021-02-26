import { useState } from 'react'
import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Navbar({ query, setQuery }) {

  const [randomNumber, setrandomNumber] = useState(Math.floor(Math.random() * 50000))

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const getRandomNumber = () => Math.floor(Math.random() * 50000)

  const handleOnClick = (e) => {
    setrandomNumber(getRandomNumber())
  }

  return (
    <div className="Navbar">
      <Link className="title" to="/"><h1>Gillis Game Finder</h1></Link>
      <h6>powered by <a href="https://rawg.io/" target="_blank" rel="noreferrer">rawg.io</a></h6>
      <div className="input-container">
        <input onChange={(e) => { handleChange(e) }} value={query} className="searchbar" type="search" placeholder="search...">
        </input>
        <Link to={"/" + randomNumber} onClick={(e) => handleOnClick(e)}> <button>Randomizer</button></Link>
      </div>
    </div>
  )
}

export default Navbar;