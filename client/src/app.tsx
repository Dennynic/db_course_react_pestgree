import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar';
import Routing from './components/routes';
import { Context } from 'context';
import CarBrandsStore from 'models/store/car-brands-store';
import { Provider} from 'mobx-react';

class App extends Component {
  
  componentDidMount(): void {
    console.log("App mounted");
    //this.store.fetchList();
  }

  render() {
    
    return (
      <Provider 
        carBrandsStore ={ CarBrandsStore}
        device={ "firstdevice"}       
      >
          <BrowserRouter>
            <NavBar />
            <Routing />
          </BrowserRouter> 
    </Provider>
      
    );
  }
}
export default App;
