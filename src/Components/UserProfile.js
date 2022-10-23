import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

export class UserProfile extends Component {
    componentDidMount() { 
    const {userId} = this.props.params;
        if(userId) {
            //dispatch action
            console.log('userId', userId);
        }
     }

  render() {
    const {userId} = this.props.params;
    // console.log('userId',userId);
    
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
          <div className="field-value">abc abc</div>
        </div>
        <div className="field">
          <div className="field-lable">Email</div>
          <div className="field-value">abc@abc.com</div>
        </div>
        <div className="btn-grp">
            <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    )
  }
}

export default (props) => (
    <UserProfile
        {...props}
        params={useParams()}
    />
);