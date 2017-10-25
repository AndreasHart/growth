import { combineReducers } from 'redux';
import { SET_CONFIG, UPDATE_NAME } from './actions';

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

function loggedIn(state = false, action) {
  switch (action.type) {
  case LOG_IN:
    return true;
  case LOG_OUT:
    return false;
  default:
    return state;
  }
}

const user = combineReducers({
  userName,
  loggedIn
})

export default combineReducers({
    config,
    user
});
