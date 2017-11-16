import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bar, example, p, link, item, itemBigger } from './navStyles';
import { logout } from '../../actions/user'
class Navigation extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return <div>
      <div className={bar}>
        <a className={item} >General Contact.</a>
        <a className={item} >Contributor Contact.</a>
        <a className={item} >Advertising Contact.</a>
        <a className={item} >New Posts For Approval.</a>
      </div>
    </div>;
  }

}

export default connect(store => ({ loggedIn: store.user.loggedIn }),{ logout })(Navigation);