import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS } from '../Actions/Action_Types';

const defaultFriendsState = [];

// profile reducer
export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend);
    default:
      return state;
  }
}
