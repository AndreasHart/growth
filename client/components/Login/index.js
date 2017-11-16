import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink, Link } from 'react-router';
import { inputBox, buttonBox, input, title, box, button, titleBox } from './styles';
import { toggleLoginSignup, signUp, login } from '../../actions/user';

class LoginSignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loginOrSignUp:true,
    }
  }
  handleLogIn = (e) => {
    const email = e.target.parentElement.parentElement.children[1].children[0].value;
    const password = e.target.parentElement.parentElement.children[1].children[1].value;
    this.props.login(email, password);
  }
  render() {
    return (
      <div className={box} >
        <div className={titleBox}>
          <Helmet title='Login' />
          <h2 className={title}>Login</h2>
          <div>No account? <Link to='signup' >SignUp</Link></div>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Email'} />
          <input className={input} type='password' placeholder={'Password'} />
        </div>
        <div className={buttonBox}>
          <a className={button} onClick={this.handleLogIn} >Login</a>
        </div>
      </div>
    )
  }
}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup, signUp, login})(LoginSignUp);
