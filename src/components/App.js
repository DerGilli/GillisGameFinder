import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Game from "./Game";
import '../css/App.css';
import GameGrid from './GameGrid';
import Navbar from "./Navbar";

function App() {

  const [query, setQuery] = useState("");

  const handleChange = (q) => {
    setQuery(q)
  }

  return (
    <div className="App">

      <Router>
        <Navbar setQuery={handleChange} query={query} />
        <Route path="/" exact children={<GameGrid query={query} />}></Route>
        <Route path="/:slug" children={<Game />}></Route>
      </Router>
    </div>
  );
};

export default App;