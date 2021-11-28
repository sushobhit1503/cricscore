import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './Home';
import Play from "./Play"
import Batting from './Batting';
import Overs from './Overs';
import Bowling from "./Bowling"
import icon from "./Icon.png"

class App extends React.Component {
  render() {
    return (
      <div>
        <img src={icon} alt="logo" style={{ width: "200px", height: "50px" }} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/batting-card" element={<Batting />} />
          <Route path="/bowling-card" element={<Bowling />} />
          <Route path="/over-card" element={<Overs />} />
        </Routes>
      </div>
    );
  }
}

export default App;
