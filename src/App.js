import React, { Component } from 'react';
import './App.scss';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        { routes }
      </div>
    );
  }
}

export default App;
