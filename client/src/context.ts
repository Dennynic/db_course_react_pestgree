import React from 'react';
import CarBrandsStore from 'models/store/car-brands-store';

const Context = React.createContext({
  carBrandsStore: CarBrandsStore,
  device: '',
});
export { Context };
