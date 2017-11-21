import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink, Link } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { toggleLoginSignup, signUp, login } from '../../actions/user';

class LoginSignUp extends Component {
   constructor(props) {
    super(props);
    this.handleSignUp=this.handleSignUp.bind(this)
  }
  handleSignUp = (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const password = e.target.parentElement.parentElement.children[1].children[2].value;
    const passwordConfirm = e.target.parentElement.parentElement.children[1].children[3].value;
    //need to check values an disable button
    this.props.signUp(name, email, password, passwordConfirm);
  }
  render() {
    return (
      <div className={box} >
        <Helmet title='SignUp' />
        <div className={titleBox}>
          <h2  className={title}>Sign Up</h2>
          <div>Have account? <Link to='login'>Login</Link></div>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Name'} />
          <input className={input} type='text' placeholder={'Email'} />
          <input className={input} type='password' placeholder={'Password'} />
          <input className={input} type='password' placeholder={'Password Confirm'} />
        </div>
        <div onClick={this.handleSignUp} className={buttonBox}>
          <a className={button}>Sign Up</a>
        </div>
      </div>);
  }
}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{signUp})(LoginSignUp);
