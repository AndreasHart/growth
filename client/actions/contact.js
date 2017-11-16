import { contributorService } from '../services';


export const SHOW_NEW_POST = 'SHOW_NEW_POST';
export const HIDE_NEW_POST = 'HIDE_NEW_POST';

export function contributor() {
  return(dispatch, getState) => {
    return contributorService().addNewContributor()
      .then((response) => {
        console.log('good to go');
      })
      .catch((err) => {
        debugger;
      });
  }
}
