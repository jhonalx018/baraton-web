import React, { Component } from 'react';
import DraweNavigation from '../DrawerNavigation/DrawerNavigation';
import ContentProducts from '../ContentProducts/ContentProducts';

class BodyApp extends Component {

  render() {
    return (
      <div className="App">
        <DraweNavigation />
        <ContentProducts />
      </div>
    );
  }
}

export default BodyApp;
