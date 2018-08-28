import React, { Component } from 'react';
import { TopBar } from '../TopBar/TopBar';
import DraweNavigation from '../DrawerNavigation/DrawerNavigation';
import ContentProducts from '../ContentProducts/ContentProducts';

class BodyApp extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <DraweNavigation />
        <ContentProducts />
      </div>
    );
  }
}

export default BodyApp;
