import { LOGIN_START } from './action_types';
import { APIUrls } from '../Helpers/Urls';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (dispatch) => {
    let url = APIUrls.logIn();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    });
  };
}
