import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { newPostBox, post, subtitle, body, buttonBox, input, title, box, button, titleBox } from './styles';
import { approvePost, denyPost } from '../../actions/contact';
import AdminNav from './nav'
class Admin extends Component {
   constructor(props) {
    super(props);
  }
  allPosts = () => {
    return this.props.newPosts.map((each, index) => {
      return <div className={post} key={index}>
        <div className={title}>{each}</div>
        <div className={subtitle}>Post SubTitle</div>
        <div className={body}>Post Body</div>
        <div className={buttonBox}>
          <a className={button}>Approve</a>
          <a className={button}>Needs Review</a>
        </div>
       </div>
    })
  }
  render() {
    return (
      <div className={box} >
        <div className={titleBox}>
          <Helmet title='Admin DashBoard' />
          <h2 className={title}>Admin DashBoard</h2>
          <AdminNav />
        </div>
        <div className={newPostBox}>
          {this.allPosts()}
        </div>
      </div>
    )
  }

}

export default connect(store => ({ newPosts: ['array', 'of', 'posts', 'not', 'strings'] }),{ approvePost, denyPost })(Admin);
