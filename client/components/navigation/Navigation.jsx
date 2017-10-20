import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { header, example, p, link, item, itemBigger } from './styles';

export default class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.
    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */

  render() {
    return <div>
      <Helmet
        title='Home page'
        meta={[
          {
            property: 'og:title',
            content: 'NewGrowth.io'
          }
        ]} />
      <div className={header}>
        <div className={itemBigger} >Logo.</div>
        <div className={item} >About.</div>
        <div className={item} >Videos.</div>
        <div className={item} >Eats.</div>
        <div className={item} >Team.</div>
      </div>
    </div>;
  }

}