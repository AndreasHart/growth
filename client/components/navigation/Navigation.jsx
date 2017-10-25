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
        <Link to="/" className={itemBigger} >Logo.</Link>
        <Link to="/about" className={item} >About.</Link>
        <Link to="/about" className={item} >Videos.</Link>
        <Link to="/about" className={item} >Eats.</Link>
        <Link to="/about" className={item} >Team.</Link>
      </div>
    </div>;
  }

}