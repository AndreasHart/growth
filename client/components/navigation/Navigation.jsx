import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { header, example, p, link, item, itemBigger } from './styles';
import { logout } from '../../actions/user'
class Navigation extends Component {
  constructor(props) {
    super(props);

  }

  handleLogout = () => {
    this.props.logout()
  }
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
        <Link to="/eats" className={item} >Eats.</Link>
        <Link to="/team" className={item} >Team.</Link>
        {this.props.loggedIn ? <a className={item} onClick={this.handleLogout} >Logout.</a> :<Link to="/login" className={item} >Login.</Link>}
      </div>
    </div>;
  }

}

export default connect(store => ({ loggedIn: store.user.loggedIn }),{ logout })(Navigation);