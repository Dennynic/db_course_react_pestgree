import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar';
import Routing from './components/routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    );
  }
}
export default App;
