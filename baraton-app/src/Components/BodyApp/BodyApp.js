import React, { Component } from 'react';
import { TopBar } from '../TopBar/TopBar';
import DraweNavigation from '../DrawerNavigation/DrawerNavigation';

class BodyApp extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <DraweNavigation />
      </div>
    );
  }
}

export default BodyApp;
