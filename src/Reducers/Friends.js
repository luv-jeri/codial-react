import { FETCH_FRIENDS_SUCCESS } from '../Actions/Action_Types';

const defaultFriendsState = [];

// profile reducer
export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    default:
      return state;
  }
}
