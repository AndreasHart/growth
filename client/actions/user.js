import { userService } from '../services';



/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';
export const UPDATE_NAME = 'UPDATE_NAME';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const TOGGLE_LOGIN_SIGNUP = 'TOGGLE_LOGIN_SIGNUP';


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
          debugger;
      })
      .catch((err) => {
        debugger;
      });
  }
}