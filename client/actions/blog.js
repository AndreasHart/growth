import { blogService } from '../services';


export const SHOW_NEW_POST = 'SHOW_NEW_POST';
export const HIDE_NEW_POST = 'HIDE_NEW_POST';

export function getPosts() {
  return(dispatch, getState) => {
    return blogService().getBlogPosts()
      .then((response) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  }
}

export function showNewPost() {
  return(dispatch, getState) => {
    if(!getState().blog.showNewBlogPost){
      dispatch({
        type: SHOW_NEW_POST
      })
    } else {
      dispatch({
        type: HIDE_NEW_POST
      })
    }
  }
}