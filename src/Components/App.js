import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostsList } from './';
import PropTypes from 'prop-types';

import { fetchPosts } from '../Actions/Posts';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('props', this.props);
    return (
      <div>
        <PostsList posts={this.props.posts} />
      </div>
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
