import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../Actions/Profile';

export class UserProfile extends Component {
  componentDidMount() {
    const userId  = window.location.href.split('/')[4];
 
    if (userId) {
      //dispatch action
      this.props.dispatch(fetchUserProfile(userId));
     
    }
  }

  

  render() {
    const { profile } = this.props;

    const user = profile.user;
    if(profile.inProgress){
      return (<div><h1>Loading...</h1></div>)
    }

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
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function MapStateToProps({ profile }) {
  return {
    profile,
  };
}
export default connect(MapStateToProps)(UserProfile);
