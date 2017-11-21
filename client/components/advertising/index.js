import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { advertiser } from '../../actions/contact';

class Advertising extends Component {
   constructor(props) {
    super(props);
  }
  handleAdvertiserContact = (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const business = e.target.parentElement.parentElement.children[1].children[2].value;
    const password = e.target.parentElement.parentElement.children[1].children[3].value;
    this.props.advertiser(name, email, business, password);
  }
  render() {
    return (
      <div className={box} >
        <div className={titleBox}>
          <Helmet title='Contact' />
          <h2 className={title}>Corporate Interest</h2>
          <div>We hope to support our halifax content creators as best we can<br/>
          If you are interested in digital marketing content or promotional services for your business please create an account.</div>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Name'} />
          <input className={input} type='text' placeholder={'Email'} />
          <input className={input} type='text' placeholder={'Business'} />
          <input className={input} type='password' placeholder={'Password'} />
        </div>
        <div className={buttonBox}>
          <a className={button} onClick={this.handleAdvertiserContact} >Enter Marketing Portal</a>
        </div>
      </div>
    )
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ advertiser })(Advertising);
