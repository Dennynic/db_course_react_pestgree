import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../config/route-paths';

function Routing() {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
      
    </Routes>
  );
}

export default Routing;
