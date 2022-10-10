import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../Actions/Posts';
import { Home, Navbar,Page404,Login } from './';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('props', this.props);
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home {...(this.props)} posts={this.props.posts}  />}
              // render={(props) => {
              //   return <Home {...props} posts={this.props.posts} />;
              // }}
            />
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<Page404/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
