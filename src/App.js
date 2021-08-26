import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto';
import store from './utils/store'
import Routes from './Routes/index'

function App() {
  return (
    <Router>
      <Provider store={store()}>
        <Routes />
      </Provider>
    </Router>
  );
}

export default App;
