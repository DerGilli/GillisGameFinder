//This is the main entry point of the application
import React, { useState } from 'react';
import {BrowserRouter as Router,  Route} from "react-router-dom";
import Game from "./Game";
import GameGrid from './GameGrid';
import Navbar from "./Navbar";
import '../css/App.css';

function App() {

  const [query, setQuery] = useState("");

  const handleChange = (q) => {
    setQuery(q)
  }

  return (
    <div className="App">
      <Router>
        <Navbar setQuery={handleChange} query={query} />
        {/* One Route is for the main site, the other one for a specific game. 
        Which Game should be displayed depends on the paremeter calles slug */}
        <Route path="/" exact children={<GameGrid query={query} />}></Route>
        <Route path="/:slug" children={<Game />}></Route>
      </Router>
    </div>
  );
};

export default App;