import { userService } from '../services';



/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';
export const UPDATE_NAME = 'UPDATE_NAME';
export const TOGGLE_LOGIN_SIGNUP = 'TOGGLE_LOGIN_SIGNUP';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

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
    dispatch({
      type: SET_CONFIG,
      config
    });
  }
}

export function updateName(name) {
  return {
    type: UPDATE_NAME,
    name
  }
}
function signupSuccess(id,roles) {
  return {
    type: SIGNUP_SUCCESS,
    id,
    roles
  }
}
function loginSuccess(id, roles) {
  return {
    type: LOGIN_SUCCESS,
    id,
    roles
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
    return userService().signUp(data)
      .then((response) => {
        const { id, roles } = response.data;
        dispatch(signupSuccess(id, roles))
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
    return userService().login(data)
      .then((response) => {
        const { ID, Roles} = response.data;
        dispatch(loginSuccess(ID, Roles))

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
export function check() {
  return(dispatch, getState) => {
    return userService().logout()
      .then((response) => {
       debugger;
      })
      .catch((err) => {
        debugger;
      });
  }
}