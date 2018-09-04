import React, { Component } from 'react';
import './assets/App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './Store/Store';
import BodyApp from './Components/BodyApp/BodyApp';
import ProfileCar from './Components/ProfileCar/ProfileCar';
import TopBar from './Components/TopBar/TopBar';

class App extends Component {
  render() {
    const hostname = process.env.REACT_APP_HOSTNAME;
    return (
      <div className="App">

        <Provider store={store}>
          <BrowserRouter>
            <div>
              <TopBar />
              <Switch>
                <Route path={hostname + "/home" }component={BodyApp} />
                <Route path={hostname + "/car" }component={ProfileCar} />
                <Route path={hostname + "/" }component={BodyApp} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>

      </div>
    );
  }
}

export default App;
