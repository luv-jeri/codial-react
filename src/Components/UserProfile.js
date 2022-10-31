import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../Actions/Profile';
import { addFriend } from '../Actions/Friends';
import { APIUrls } from '../Helpers/Urls';
import { getAuthTokenFromLocalStorage } from '../Helpers/Utils';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      message : '',
    };
  }
  componentDidMount() {
    const userId = window.location.href.split('/')[4];

    if (userId) {
      //dispatch action
      this.props.dispatch(fetchUserProfile(userId));
    }
  }

  checkIfUserIdisFriend = () => {
    const { friends } = this.props;
    const userId = window.location.href.split('/')[4];

    const index = friends.map((friends) => friends.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = window.location.href.split('/')[4];
    const url = APIUrls.addFriend(userId);
    console.log('url', url);
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
      this.setState({
        success: true,
        message: data.message,
      });
      console.log('success in response',this.state.message);
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const { profile } = this.props;
    const { success, error } = this.state;
    console.log('success error', success, error);

    const user = profile.user;
    // if (profile.inProgress) {
    //   return (
    //     <div>
    //       <h1>Loading...</h1>
    //     </div>
    //   );
    // }
    const isUserAFriend = this.checkIfUserIdisFriend();
    console.log('isUserAFriend', isUserAFriend);
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
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button className="button save-btn">Remove Friend</button>
          )}
        </div>
        {success && (
          <div className="alert success-dailog">{this.state.message}</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    );
  }
}

function MapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(MapStateToProps)(UserProfile);
