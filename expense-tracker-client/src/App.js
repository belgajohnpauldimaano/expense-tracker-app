import React, { Component } from 'react';
import './App.css';


import { Provider } from 'react-redux';
import configureStore from './store/index';

import styles from './App.css'

import Main from './components/main/main'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Main />
      </Provider>
    );
  }
}

export default App;
