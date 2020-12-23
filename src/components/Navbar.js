import "../css/Navbar.css"


function Navbar({ query, setQuery }) {

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="Navbar">
      <h1>Gillis Game Finder</h1>
      <h6>powered by <a href="https://rawg.io/" target="_blank" rel="nureferrer">rawg.io</a></h6>
      <input onChange={(e) => { handleChange(e) }} value={query} className="searchbar" type="search" placeholder="search...">
      </input>
    </div>
  )
}

export default Navbar;