import React from 'react';
import AppHeader from '../app-header/app-header';
import {Outlet} from 'react-router-dom';


export function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <Outlet />
    </React.Fragment>
  );
}
