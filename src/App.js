// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Editor from "./Editor";
import ReactToHtml from "./ReactToHtml";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
     
        <Route path="/react-to-html" element={<ReactToHtml />} />
      
      </Routes>
    </Router>
  );
}

export default App;
