import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navigation from '../navigation/Navigation'
import Devtools from '../dev-tools'
export default class App extends Component {

  render() {
    return <div>
      <Helmet title='newGrow' />
      <Navigation />
      {this.props.children}
    </div>;
  }

}
