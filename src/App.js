import React from 'react';
import './App.css';
import Header from './layouts/header';
import AppContainer from './main/appContainer';
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="App">
      <Route path="/" component={AppContainer} />
    </BrowserRouter>
  );
}

export default App;
