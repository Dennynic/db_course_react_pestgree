import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes } from '../config/route-paths';

function Routing() {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
      <Route path={'/reports'} element={<Navigate replace to="/reports/1" />} />
    </Routes>
  );
}

export default Routing;
