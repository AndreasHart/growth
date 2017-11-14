import { combineReducers } from 'redux';

import { TOGGLE_LOGIN_SIGNUP } from '../actions/user';

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

export default login
