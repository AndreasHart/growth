/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';
export const UPDATE_NAME = 'UPDATE_NAME';
/**
 * action creators
 */

export function setConfig(config) {
  return(dispatch, getState)=> {
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
