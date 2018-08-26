import React, { Component } from 'react';
import { TopBar } from '../TopBar/TopBar';
import DraweNavigation from '../DrawerNavigation/DrawerNavigation';
import ConenteProducts from '../ConenteProducts/ConenteProducts';

class BodyApp extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <DraweNavigation />
        <ConenteProducts />
      </div>
    );
  }
}

export default BodyApp;
