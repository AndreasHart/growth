import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { inputBox, input, box } from './styles';
import { toggleLoginSignup } from '../../actions';

class LoginSignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loginOrSignUp:true
    }
  }
  handleToggleLogin = () => {
    this.props.toggleLoginSignup()
  }
  render() {
    const { loginOrSignUp } = this.props;
    if(loginOrSignUp){
      return <div className={box} >
      <Helmet title='Login' />
      <h2 >Login</h2>
      <div>No account? <a onClick={this.handleToggleLogin} >SignUp</a></div>
      <div className={inputBox}>
        <input className={input} type='text' placeholder={'Email'} />
        <input className={input} type='password' placeholder={'Password'} />
      </div>
    </div>;
  } else {
    return <div >
      <Helmet title='SignUp' />
      <h2 >Sign Up</h2>
      <div>Have account? <a onClick={this.handleToggleLogin} >Login</a></div>
    </div>;

  }
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup })(LoginSignUp);
