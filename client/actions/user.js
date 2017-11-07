import { userService } from '../services';



/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';
export const UPDATE_NAME = 'UPDATE_NAME';
export const TOGGLE_LOGIN_SIGNUP = 'TOGGLE_LOGIN_SIGNUP';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
function parseJSON(response) {
  return response.json()
}
/**
 * action creators
 */
export function toggleLoginSignup(){
  return { type: TOGGLE_LOGIN_SIGNUP}
}
export function setConfig(config) {
  return(dispatch, getState) => {
    console.log('state', getState() );
    dispatch({
      type: SET_CONFIG,
      config
    });
  }
}

export function updateName(name) {
  return { type: UPDATE_NAME, name };
}

function loginSuccess(id) {
  return {
    type: LOGIN_SUCCESS,
    id
  }
}
function logoutSucess() {
   return {
    type: LOGOUT_SUCCESS
  }
}
export function signUp(name, email, password, passwordConfirm) {
  return(dispatch, getState) => {
    const data = {
      name,
      email,
      password
    };
    debugger;
    return userService().signUp(data)
      .then((response) => {
        const { id } = response.data;
        dispatch(signupSuccess(id))

      })
      .catch((err) => {
        debugger;
      });
  }
}

export function login(email, password) {
  return(dispatch, getState) => {
    const data = {
      email,
      password
    };
    debugger;
    return userService().login(data)
      .then((response) => {
        debugger;
        const id = response.data;
        dispatch(loginSuccess(id))
      })
      .catch((err) => {
        debugger;
      });
  }
}
export function logout() {
  return(dispatch, getState) => {
    return userService().logout()
      .then((response) => {
        dispatch(logoutSucess())
      })
      .catch((err) => {
        debugger;
      });
  }
}