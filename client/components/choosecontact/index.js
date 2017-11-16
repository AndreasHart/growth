import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink , Link} from 'react-router';
import { choiceBox, buttonBox, input, title, subtitle, description, box, button, buttonInside, titleBox } from './styles';
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
          <h2 className={title}>Currenlty have three channels to contact us</h2>
          <div>Choose whichever applies to you most, you can be all three if you want jsut gotta ask</div>
        </div>
        <div className={choiceBox}>
          <div className={box}>
            <div className={title}>Consumer Contact</div>
            <div className={subtitle}>You'd like to give feedback on content or have some other inquiry</div>
            <div className={buttonBox}>
              <Link className={buttonInside} to='/contact'>Welcome</Link>
            </div>
          </div>
          <div className={box}>
            <div className={title}>Creator Contact</div>
            <div className={subtitle}>You'd like to contribute somehting to the halifax events ecosystem. That's great come on in!</div>
            <div className={buttonBox}>
              <Link className={buttonInside} to='/contribute'>Welcome</Link>
            </div>
          </div>
          <div className={box}>
            <div className={title}>Corporate Contact</div>
            <div className={subtitle}>Your interested in whose doing all this creating or looking for promotional services. Answers inside!</div>
            <div className={buttonBox}>
              <Link className={buttonInside} to='/adcontact'>Welcome</Link>
            </div>
          </div>
        </div>
        <div className={buttonBox} >
          <div className={title} >
            Consider Joining our newsletter. Only the best content out of Halifax here.
          </div>
        </div>
        <div className={buttonBox}>
          <input className={input} type='text' placeholder='Email Pls' />
          <a className={button} onClick={this.handleContributorContact} >Subscribe</a>
        </div>
      </div>
    )
  }

}

export default connect(store => ({ loginOrSignUp: store.login.loginOrSignUp }),{ toggleLoginSignup, signUp, contributor})(LoginSignUp);
