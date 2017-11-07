import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { toggleLoginSignup, signUp } from '../../actions/user';

class LoginSignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loginOrSignUp:true,
    }
    this.handleSignUp=this.handleSignUp.bind(this)
  }
  handleToggleLogin = () => {
    this.props.toggleLoginSignup()
  }
  handleSignUp = (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const password = e.target.parentElement.parentElement.children[1].children[2].value;
    const passwordConfirm = e.target.parentElement.parentElement.children[1].children[3].value;
    this.props.signUp(name, email, password, passwordConfirm);
  }
  render() {
    const { loginOrSignUp } = this.props;
    if(loginOrSignUp){
      return (
        <div className={box} >
          <div className={titleBox}>
            <Helmet title='Login' />
            <h2 className={title}>Login</h2>
            <div>No account? <a onClick={this.handleToggleLogin} >SignUp</a></div>
          </div>
          <div className={inputBox}>
            <input className={input} type='text' placeholder={'Email'} />
            <input className={input} type='password' placeholder={'Password'} />
          </div>
          <div className={buttonBox}>
            <a className={button} >Login</a>
          </div>
        </div>)
  } else {
    return (
      <div className={box} >
        <Helmet title='SignUp' />
        <div className={titleBox}>
          <h2  className={title}>Sign Up</h2>
          <div>Have account? <a onClick={this.handleToggleLogin} >Login</a></div>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Name'} />
          <input className={input} type='text' placeholder={'Email'} />
          <input className={input} type='password' placeholder={'Password'} />
          <input className={input} type='password' placeholder={'Password Again Pls'} />
        </div>
        <div onClick={this.handleSignUp} className={buttonBox}>
          <a className={button}  >Sign Up</a>
        </div>
      </div>);

  }
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup, signUp})(LoginSignUp);
