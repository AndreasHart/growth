import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { banner, p, link } from './styles';
import { updateName } from '../../actions.js'
class Eats extends Component {
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
      <p className={p}>
        Some Interesting People that contribute to the sites
      </p>
    </div>;
  }

}


export default connect(store => ({ user: store.user }), { doSomething:updateName })(Eats);