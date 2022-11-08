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

      // ! Dispatch will update the state of friends and useSelector will forcefully re-render the component and will make the state to be default again
      // ? So we need to call the dsipatch function inside the setTimeout function so that the state will be updated after 1 second and we can see the messages and changes
      // ! WARNING: do not clear the timeout function in the useEffect function because it will clear the timeout function and the store will not be updated.
      // # REASON : redux will not preserve the state of the component on re-rendering.
      
      setTimeout(() => {
        dispatch(
          !isUserAFriend
            ? addFriend(data.data.friendship)
            : removeFriend(userId)
        );
      }, 1000);
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
