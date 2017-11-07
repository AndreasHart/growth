import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { banner, p, link } from './styles';
import { updateName } from '../../actions/user'
class About extends Component {
  /*eslint-enable */
  render() {
    return <div>
      <Helmet
        title='About'
        meta={[
          {
            property: 'og:title',
            content: 'NewGrowth.io'
          }
        ]} />
      <h1>About Growth</h1>
      <p className={p}>
       Aboot things
      </p>
    </div>;
  }

}


export default connect(store => ({ user: store.user }), {doSomething:updateName})(About);