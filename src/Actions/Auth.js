import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START,SIGNUP_SUCCESS,SIGNUP_FAILED } from './Action_Types';
import { APIUrls } from '../Helpers/Urls';
import { getFormBody } from '../Helpers/Utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error : errorMessage
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    let url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log('data', data);
      if(data.success){
        localStorage.setItem('token',data.data.token);
        dispatch(loginSuccess(data.data.user));
      }else{
        dispatch(loginFailed(data.message));
      }
    });
  };
}


export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error : errorMessage
  };
}

export function signup(email, password , confirmPassword , name) {
  return (dispatch) => {
    dispatch(startSignup());
    let url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password , confirm_password:confirmPassword , name}),
    })
      .then((response) => 
        response.json()
      )
      .then((data) => {
        // console.log('data', data);
        if(data.success){
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
        }else{
          dispatch(signupFailed(data.message));
        }
      });
  };
}