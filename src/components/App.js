import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import HeaderBar from './header/HeaderBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <HeaderBar />
          <div>
            <Route path='/' exact component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
