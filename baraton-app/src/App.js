import React, { Component } from 'react';
import './assets/App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './Store/Store';
import BodyApp from './Components/BodyApp/BodyApp';
import ProfileCar from './Components/ProfileCar/ProfileCar';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/home" component={BodyApp} />
              <Route path="/car" component={ProfileCar} />
              <Route path="/" component={BodyApp} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
