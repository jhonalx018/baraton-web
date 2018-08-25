import React, { Component } from 'react';
import { TopBar } from './Components/TopBar/TopBar';
import './assets/App.css';
import { Provider } from 'react-redux';
import { store } from './Store/Store';

class App extends Component {
  componentWillMount() {
    console.log(store);
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <TopBar />
        </Provider>
      </div>
    );
  }
}

export default App;
