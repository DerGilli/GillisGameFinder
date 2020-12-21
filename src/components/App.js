import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Game from "./Game";
import '../css/App.css';
import GameGrid from './GameGrid';
import Navbar from "./Navbar";
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact children={<GameGrid />}></Route>
          <Route path="/:slug" children={<Game />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;