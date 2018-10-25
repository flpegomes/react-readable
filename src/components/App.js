import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import HeaderBar from './header/HeaderBar'
import CategoryPosts from './pages/CategoryPosts';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';


class App extends Component {

  render() {
    return (
      <Router>
        <div className='app'>
          <HeaderBar />
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/category/:category' exact component={CategoryPosts} />
              <Route path='/:category/:post_id' exact component={PostDetail} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
