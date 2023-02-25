import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar';
import Routing from './components/routes';
import carBrandsStore from 'store/car-brands-store';
import clientsStore from 'store/client-colection-store';
import placeStore from 'store/place-store';
import { Provider } from 'mobx-react';

class App extends Component {
  componentDidMount(): void {
    
    //request client
  }

  render() {
    return (
      <Provider 
      carBrandsStore={carBrandsStore} 
      clientsStore={clientsStore}
        placeStore={placeStore}>
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
