import { combineReducers } from 'redux';
import posts from './Posts';
import auth from './Auth';
import profile from './Profile';

export default combineReducers({
  posts,
  auth,
  profile,
});
