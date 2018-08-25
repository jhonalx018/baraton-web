import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../../assets/Header/index.css';

export const TopBar = () => (
  <AppBar position="static" color="default">
    <Toolbar className="top-bar">
      <Typography variant="title" className="title-bar">
          Baraton
      </Typography>
    </Toolbar>
  </AppBar>);
