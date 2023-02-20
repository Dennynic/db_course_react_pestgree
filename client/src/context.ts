import React from 'react';
import CarBrandsStore from 'store/car-brands-store';
import clientsStore from 'store/client-colection-store';

const Context = React.createContext({
  carBrandsStore: CarBrandsStore,
  clientsStore,
});
export { Context };
