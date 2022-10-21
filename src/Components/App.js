import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../Actions/Posts';
import { Home, Navbar, Page404, Login, Signup, Setting } from './';
import { authenticateUser } from '../Actions/Auth';
import { history } from '../Helpers/Utils';

class App extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token');
    let user;
    if (token) {
      user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          name: user.name,
          email: user.email,
          _id: user._id,
        })
      );
    }
    this.props.dispatch(fetchPosts());
    
  }

  render() {
    console.log('props', this.props);
    //private router

    const PrivateWrapper = () => {
      const { auth } = this.props;
      // const {val: Component} = props;
    history.location = useLocation();
    console.log('history.location', history.location);
      return auth.isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to={{pathname: "/login"}} />
      );
    };

    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
            <Route element={<PrivateWrapper />}>
              <Route
                exact
                path="/"
                element={<Home {...this.props} posts={this.props.posts} />}
                // render={(props) => {
                //   return <Home {...props} posts={this.props.posts} />;
                // }}
              />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
