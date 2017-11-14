import { combineReducers } from 'redux';
import { SHOW_NEW_POST, HIDE_NEW_POST } from '../actions/blog';
function showNewBlogPost(state = false, action) {
  switch (action.type) {
  case SHOW_NEW_POST:
    return true;
  case HIDE_NEW_POST:
    return false;
  default:
    return state;
  }
}

const blog =  combineReducers({
  showNewBlogPost
})

export default blog