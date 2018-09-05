import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

import '../../assets/Header/index.css';

class TopBar extends Component {

  constructor() {
    super();
    this.state = {
      anchorEl: null,
      numCar: (localStorage.getItem('carShopping'))
        ? (JSON.parse(localStorage.getItem('carShopping')).length)
        : 0,
      classAnimation: {
        ctn: 'content-number-item',
        active: ''
      }
    };
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = (paramLink) => {
    const hostname = process.env.REACT_APP_HOSTNAME;
    this.setState({anchorEl: null});
    if(typeof paramLink === 'string')
    {
      window.location.pathname = hostname+paramLink;
    }
    
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      numCar: nextProps.shopping.length
    }, () => {
      this.appyAnimation();
    });
  }

  componentDidMount = () => {
    this.appyAnimation();
  }

  appyAnimation = () => {
    let cls = this.state.classAnimation;
    cls.active = 'active-animation';
    clearTimeout(window['animation']);
    clearTimeout(window['animationTow']);
    window['animation'] = setTimeout(() => {
      this.setState({
        classAnimation: cls
      }, () => {
        window['animationTow'] = setTimeout(() => {
          cls.active = '';
          this.setState({classAnimation: cls});
        }, 500);
      });
    }, 500);

  }
  getNumItems = () => {

    if (this.state.numCar > 0) {
      return <div
        className={this.state.classAnimation.ctn + ' ' + this.state.classAnimation.active}>{this.state.numCar}</div>
    } else {
      return null;
    }
  }

  render() {
    const {anchorEl} = this.state;
    return (
      <AppBar position="static" color="default">
        <Toolbar className="top-bar">
          <Typography variant="title" className="title-bar">
            <div className="content-top-bar">
              <div className="content-menu-top-bar">
                <Button
                  aria-owns={anchorEl
                  ? 'simple-menu'
                  : null}
                  variant="contained"
                  color="secondary"
                  aria-haspopup="true"
                  onClick={this.handleClick}>
                  BARATON MENU
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}>
                  <MenuItem
                    onClick={() => {
                    this.handleClose('/car')
                  }}>Shopping Car</MenuItem>
                  <MenuItem
                    onClick={() => {
                    this.handleClose('/home')
                  }}>List Items</MenuItem>
                </Menu>
              </div>
              <div className="content-car-items" onClick={()=>{ window.location.pathname = '/car'}}>
                {this.getNumItems()}
                <i className="material-icons">
                  shopping_cart
                </i>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({shopping: state.ShoppingCarRx});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)