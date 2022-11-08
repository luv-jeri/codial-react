import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../Actions/Profile';
import { addFriend, removeFriend } from '../Actions/Friends';
import { APIUrls } from '../Helpers/Urls';
import { getAuthTokenFromLocalStorage } from '../Helpers/Utils';
import friends from './../Reducers/Friends';

const checkIfUserIdisFriend = (friends) => {
  const userId = window.location.href.split('/')[4];
  const index = friends.map((friends) => friends?.to_user?._id).indexOf(userId);
  if (index !== -1) {
    return true;
  }
  return false;
};
// # Create a custom hook for isUserAFriend
// const useIsFriend = () => {
//   const friends = useSelector((state) => state.friends);
//   const [isUserAFriend, setIsUserAFriend] = useState(false);

//   useEffect(() => {
//     setIsUserAFriend(checkIfUserIdisFriend(friends));
//   }, [friends]);

//   return isUserAFriend;
// }

export default function UserProfile() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isUserAFriend, setIsUserAFriend] = useState();

  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends);

  const dispatch = useDispatch();

  //
  useLayoutEffect(() => {
    setIsUserAFriend(checkIfUserIdisFriend(friends));
  }, [friends]);

  const handleClick = async () => {
    const userId = window.location.href.split('/')[4];

    const url = !isUserAFriend
      ? APIUrls.addFriend(userId)
      : APIUrls.removeFriend(userId);

    const url_ = APIUrls[!isUserAFriend ? 'addFriend' : 'removeFriend'](userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      setSuccess(data.message);
      // * Toggle the state of isUserAFriend, we dont want to calculate it again
      setIsUserAFriend(!isUserAFriend);

      // Redux will actully check for the store and if the store is updated i.e. if the refrence of the frinds array changes then i will cause the component to re-render
      // # then change the action type to ADD_FRIEND or REMOVE_FRIEND
      // ! have a look in the reducer for the action type it is updated there
      dispatch(
        !isUserAFriend ? addFriend(data.data.friendship) : removeFriend(userId)
      );
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-lable">Name</div>
        <div className="field-value">{user.name}</div>
      </div>
      <div className="field">
        <div className="field-lable">Email</div>
        <div className="field-value">{user.email}</div>
      </div>
      <div className="btn-grp">
        <button className="button save-btn" onClick={handleClick}>
          {!isUserAFriend ? 'Add Friend' : 'Remove Friend'}
        </button>
      </div>
      {success && <div className="alert success-dailog">{success}</div>}
      {error && <div className="alert error-dailog">{error}</div>}
    </div>
  );
}
