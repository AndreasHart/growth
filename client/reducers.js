import { combineReducers } from 'redux';
import { SET_CONFIG, UPDATE_NAME, LOGIN_SUCCESS, LOGOUT_SUCCESS, TOGGLE_LOGIN_SIGNUP } from './actions/user';

function config(state = {}, action) {
  switch (action.type) {
  case SET_CONFIG:
    return action.config;
  default:
    return state;
  }
}

function userName(state = '', action) {
  switch (action.type) {
  case UPDATE_NAME:
    return action.name;
  default:
    return state;
  }
}
function id(state = null, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return action.id;
  default:
    return state;
  }
}

function loggedIn(state = false, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return true;
  case LOGOUT_SUCCESS:
    return false;
  default:
    return state;
  }
}

const user = combineReducers({
  userName,
  loggedIn,
  id
})

function loginOrSignUp(state = true, action) {
  switch (action.type) {
  case TOGGLE_LOGIN_SIGNUP:
    return !state;
  default:
    return state;
  }
}
const login =  combineReducers({
  loginOrSignUp
})
export default combineReducers({
    config,
    login,
    user
});
