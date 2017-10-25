import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { banner, p, link } from './styles';
import { updateName } from '../../actions.js'
class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.

    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */
  handleDomething = (e) => {
    this.props.doSomething();
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
      <div onClick={this.handleDomething} className={banner}>
      hi
      </div>
      <p className={p}>
        Please take a look at <Link className={link} to='/docs'>usage</Link> page.
      </p>
    </div>;
  }

}


export default connect(store => ({ user: store.user }), {doSomething:updateName})(Homepage);
