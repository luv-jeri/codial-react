import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Why?
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }
  handleFormSubmit(e) {
    e.preventDefault();
    console.log('email input', this.emailInputRef);
    console.log('password input', this.passwordInputRef);
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
            ref={this.emailInputRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            ref={this.passwordInputRef}
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
