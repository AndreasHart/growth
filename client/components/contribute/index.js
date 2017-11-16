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
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const skills = e.target.parentElement.parentElement.children[1].children[2].value;
    const education = e.target.parentElement.parentElement.children[1].children[3].value;
    const links = e.target.parentElement.parentElement.children[1].children[4].value;
    const wwsk = e.target.parentElement.parentElement.children[1].children[5].value;
    this.props.contributor(name, email, skills, education, links, wwsk);
  }
  render() {
    return (
      <div className={box} >
        <div className={titleBox}>
          <Helmet title='Contact' />
          <h2 className={title}>Want to contribute?</h2>
          <div>We dont require much information to apply.<br/> Fill in what you want and send it over we'll be happy to review and see how we can help each other.</div>
        </div>
        <div className={inputBox}>
          <textarea className={input} type='text' placeholder={'Name'} />
          <textarea className={input} type='text' placeholder={'Email'} />
          <textarea className={input} type='text' placeholder={'Skiils'} />
          <textarea className={input} type='text' placeholder={'Education'} />
          <textarea className={input} type='text' placeholder={'Links to Work'} />
          <textarea className={input} type='text' placeholder={'Tell us what we should know about you? :)'} />
        </div>
        <div className={buttonBox}>
          <a className={button} onClick={this.handleContributorContact} >Get in Touch</a>
        </div>
      </div>
    )
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup, signUp, contributor})(LoginSignUp);
