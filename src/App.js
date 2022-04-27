import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import List from './views/List';
import Details from './views/Details';
//import { BrowserRouter as Router, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './views/Header';

export default function App() {
  return (
    <div>
    <Header></Header>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
