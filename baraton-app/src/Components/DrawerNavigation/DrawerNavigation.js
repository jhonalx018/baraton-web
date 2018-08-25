import React, { Component } from 'react';
import '../../assets/DrawerNavigation/DrawerNavigation.css';

class DraweNavigation extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  render() {
    return (
      <div className="content-drawer" style={{ left: (this.state.open === true) ? '0px' : '-330px' }}>
        <i className="material-icons icon-menu-drawer" style={{ right: (this.state.open === true) ? '10px' : '-43px' }} onClick={() => { this.setState({ open: !this.state.open }); }}>menu</i>
      </div>
    );
  }
}

export { DraweNavigation };
