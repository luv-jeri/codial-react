import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this); // required with simple function
    this.state = {
        email:'',
        password:''
    };

  }
  handleEmailInput=(event)=>{
    this.setState({email:event.target.value});
  }
  handlePasswordInput=(event)=>{
    this.setState({password:event.target.value});
  }
  handleFormSubmit=(e) =>{
    e.preventDefault();
    console.log('state', this.state);
  }
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailInput}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordInput}
            value={this.state.password}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
