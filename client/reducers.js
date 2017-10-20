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
function user(state = 'Andreas', action) {
  switch (action.type) {
  case UPDATE_NAME:
    return action.name;
  default:
    return state;
  }
}

export default combineReducers({
    config,
    user
});
