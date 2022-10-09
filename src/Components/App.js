import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../Actions/Posts';
import { PostsList, Navbar } from './';

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
          <PostsList posts={this.props.posts} />
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
