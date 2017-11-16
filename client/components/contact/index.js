import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { toggleLoginSignup, signUp, contributor } from '../../actions/user';

class LoginSignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loginOrSignUp:true,
    }
  }
  handleToggleLogin = () => {
    this.props.toggleLoginSignup()
  }
  handleContributorContact = (e) => {
    const email = e.target.parentElement.parentElement.children[1].children[0].value;
    const skills = e.target.parentElement.parentElement.children[1].children[1].value;
    const education = e.target.parentElement.parentElement.children[1].children[2].value;
    const links = e.target.parentElement.parentElement.children[1].children[3].value;
    const wwsk = e.target.parentElement.parentElement.children[1].children[4].value;
    this.props.contributor(email, skills, education, links, wwsk);
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
          <a className={button} onClick={this.handleContributorContact} >Get in Touch</a>
        </div>
      </div>
    )
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup, signUp, contributor})(LoginSignUp);
