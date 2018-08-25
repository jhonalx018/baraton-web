import React, { Component } from 'react';
import './assets/App.css';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import BodyApp from './Components/BodyApp/BodyApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BodyApp />
        </Provider>
      </div>
    );
  }
}

export default App;
