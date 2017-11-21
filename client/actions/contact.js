import { contactService } from '../services';


export const SHOW_NEW_POST = 'SHOW_NEW_POST';
export const HIDE_NEW_POST = 'HIDE_NEW_POST';

export function contributor(name, email, skills, education, links, wwsk) {
  return(dispatch, getState) => {
    return contactService().createContributor({ name, email, skills, education, links, wwsk })
      .then((response) => {
        console.log('good to go');
      })
      .catch((err) => {
        debugger;
      });
  }
}

export function contact(email, skills, education, links, wwsk) {
  return(dispatch, getState) => {
    return contactService().contact({ email, skills, education, links, wwsk })
      .then((response) => {
        console.log('good to go');
      })
      .catch((err) => {
        debugger;
      });
  }
}

export function advertiser(name, email, business, password) {
  return(dispatch, getState) => {
    return contactService().createAdvertiser({ name, email, business, password })
      .then((response) => {
        console.log('good to go');
      })
      .catch((err) => {
        debugger;
      });
  }
}
