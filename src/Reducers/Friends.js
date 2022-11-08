import {
  ADD_FRIEND,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from '../Actions/Action_Types';

const defaultFriendsState = [];

// profile reducer
export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      // # JUST UPDATE original state and donot create a new state and return it, because this will cause the component to re-render
      // # we want to update the original state and not create a new state
      state.push(action.friend);
      break; // or return state
    case REMOVE_FRIEND:
      const index = state.findIndex(
        (friend) => friend.to_user._id === action.userId
      );
      state.splice(index, 1);
      break; // or return state
    default:
      return state;
  }
}
