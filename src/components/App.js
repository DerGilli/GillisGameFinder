import React from 'react';
import '../css/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      game: null,
      style: {
        backgroundImage: "",
        display: "flex",
        flexDirection: "column"
      }
    }
  }

  handleOnClick() {
    //Get a random entry from the result array containing the games
    const randomGame = this.state.data[Math.floor(Math.random() * this.state.data.length)];
    this.setState({
      game: randomGame,
      style: { backgroundImage: "url(" + randomGame.background_image + ")" }
    });
    console.log(JSON.parse(localStorage.getItem("games")))
  };

  render() {

    if (!this.state.isLoaded) {
      return (
        <div className="App"><h1>fetching Data...</h1></div>
      )
    }

    let content
    if (this.state.game) {
      content =
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* <div className="GameImage" style={this.state.style}></div> */}
          <h1>{this.state.game.name}</h1>
          <h2>{this.state.game.released}</h2>
          <h2>User Rating: {this.state.game.rating}/5 </h2>
          <h2>Metacritic: {this.state.game.metacritic} </h2>
        </div>
    }

    return (
      <div className="App" style={this.state.style}>
        {content}
        <button onClick={() => this.handleOnClick()}>Get random Game</button>
      </div>
    );
  };

  fetchData() {
    if (!this.state.data.length > 0) {

      //set page size to 40, which is unfortunately the maximum
      let query = `https://api.rawg.io/api/games?key=a7fa218298c14aa19d0190447e2f279c&page_size=20`
      let gameCollection = []
      gameCollection = JSON.parse(localStorage.getItem("games"));

      if (!gameCollection.length > 0) {
        this.fetchAsync(query, gameCollection)
      } else {
        console.log("got data from local storage")
        console.log(gameCollection)
        this.setState({
          data: gameCollection,
          isLoaded: true
        })
      }
    }
  }

  async fetchAsync(query, gameCollection) {
    let i = 0;
    while (i < 5) {
      await fetch(query)
        .then(response => response.json())
        .then(data => {
          gameCollection = gameCollection.concat(data.results);
          query = data.next
        }
        )
        .catch(err => console.log(err));
      i++
    }
    this.setState({
      data: gameCollection,
      isLoaded: true
    })
    localStorage.setItem("games", JSON.stringify(gameCollection))
  }

  componentDidMount() {
    this.fetchData();
  }

};

export default App;