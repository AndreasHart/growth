import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { contact } from '../../actions/contact';

class Contact extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loginOrSignUp:true,
    }
  }
  handleContact = (e) => {
    const email = e.target.parentElement.parentElement.children[1].children[0].value;
    const concerns = e.target.parentElement.parentElement.children[1].children[1].value;
    this.props.contact(email, concerns);
  }
  render() {
    return (
      <div className={box} >
        <div className={titleBox}>
          <Helmet title='Contact' />
          <h2 className={title}>General Inquires</h2>
          <div>Please reach out with any questions.</div>
        </div>
        <div className={inputBox}>
          <textarea className={input} type='text' placeholder={'Email'} />
          <textarea className={input} type='text' placeholder={'Questions or Concerns'} />
        </div>
        <div className={buttonBox}>
          <a className={button} onClick={this.handleContact} >Get in Touch</a>
        </div>
      </div>
    )
  }
}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ contact })(Contact);
