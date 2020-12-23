import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
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
      <Navbar setQuery={handleChange} query={query} />
      <Router>
        <Switch>
          <Route path="/" exact children={<GameGrid query={query} />}></Route>
          <Route path="/:slug" children={<Game />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;