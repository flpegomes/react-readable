import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import HeaderBar from './header/HeaderBar'
import CategoryPosts from './pages/CategoryPosts';
import PostDetail from './pages/PostDetail';


class App extends Component {

  render() {
    return (
      <Router>
        <div className='app'>
          <HeaderBar />
          <div>
            <Route path='/' exact component={Home} />
            <Route path='/:category' exact component={CategoryPosts} />
            <Route path='/:category/:post_id' exact component={PostDetail} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
