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
  handleCreateEventLoggedIn = (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const password = e.target.parentElement.parentElement.children[1].children[2].value;
    const passwordConfirm = e.target.parentElement.parentElement.children[1].children[3].value;
    this.props.signUp(name, email, password, passwordConfirm);
  }
  handleCreateEventPublic = (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].value;
    const email = e.target.parentElement.parentElement.children[1].children[1].value;
    const password = e.target.parentElement.parentElement.children[1].children[2].value;
    const passwordConfirm = e.target.parentElement.parentElement.children[1].children[3].value;
    this.props.signUp(name, email, password, passwordConfirm);
  }
  render() {
    const { loggedIn } = this.props;
    if(loggedIn){
      return (
      <div className={box} >
        <Helmet title='Add Event' />
        <div className={titleBox}>
          <h2  className={title}>Add Event Here</h2>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Title'} />
          <textarea className={input} type='text' placeholder={'Description'} />
          <input className={input} type='time'  />
          <input className={input} type='time'  />
          <input className={input} type='date'  />
          <input className={input} type='text' placeholder={'Address'} />
          <input className={input} type='text' placeholder={'NeighborHood'} />
          <input className={input} type='file' placeholder={'Event Image'} />
        </div>
        <div onClick={this.handleCreateEventLoggedIn} className={buttonBox}>
          <a className={button}>Add Event</a>
        </div>
      </div>);
    } else {
      return (
      <div className={box} >
        <Helmet title='Add Event' />
        <div className={titleBox}>
          <h2  className={title}>Add Event Here</h2>
        </div>
        <div className={inputBox}>
          <input className={input} type='text' placeholder={'Your Name Or Groups Name'} />
          <input className={input} type='text' placeholder={'Email'} />
          <input className={input} type='text' placeholder={'Title'} />
          <textarea className={input} type='text' placeholder={'Description'} />
          <input className={input} type='time'  />
          <input className={input} type='time'  />
          <input className={input} type='date'  />
          <input className={input} type='text' placeholder={'Address'} />
          <input className={input} type='text' placeholder={'NeighborHood'} />
          <input className={input} type='file' placeholder={'Event Image'} />
        </div>
        <div onClick={this.handleCreateEventPublic} className={buttonBox}>
          <a className={button}>Add Event</a>
        </div>
      </div>);
    }

  }
}

export default connect(store => ({ loggedIn: store.user.loggedIn }),{signUp})(LoginSignUp);
