import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { postBox, buttonBox, input, title, box, button, titleBox, subtitle, body, circle, authorBox, author,authorinfo, tagline, date } from './styles';
import { getPosts, showNewPost } from '../../actions/blog';

class Blog extends Component {
   constructor(props) {
    super(props);
    this.handleSignUp=this.handleSignUp.bind(this)
  }
  componentDidMount = () => {
   this.props.getPosts()
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
  handleShowNewPost = (e) => {
    this.props.showNewPost()
  }
  createEvents = () => {
    if(this.props.loggedIn){
      return(
        this.props.showNewBlogPost ? (
             <button className={button} onClick={this.handleShowNewPost}>Hide New Post</button>
            ) : (
            <button className={button} onClick={this.handleShowNewPost} >New Pst</button>
            )
          )
    }
  }
  postInputs = () => {
    if(this.props.showNewBlogPost){
      return (
        <div className={postBox}>
          <div className={title}>
              <input className={input} type='text' placeholder='title' />
            </div>
            <div className={subtitle}>
              <input className={input} type='text' placeholder='subtitle'/>
            </div>
            <div className={body}>
              <textarea className={input}  type='text' placeholder='body' />
            </div>
        </div>
      )
    } else {
      return null
    }

  }
  render() {
    console.log(this.props.showNewBlogPost);
    return (
      <div>
        <Helmet title='Blog' />
        <div className={box} >
          <div className={titleBox}>
            <h2 className={title}>Halifax Events Blog</h2>
            <div className={buttonBox}>{this.createEvents()}</div>
          </div>
          {this.postInputs()}
          <div className={postBox}>
            <div className={authorBox}>
              <img className={circle} src={'https://scontent.fyhz1-1.fna.fbcdn.net/v/t1.0-9/19990422_10208619428517573_6740874714998660039_n.jpg?oh=cf6f0dca3b3afe7cacfa1e584d49cad9&oe=5AAE4E26'} />
              <div className={authorinfo}>
                <div className={author} >
                  Andreas
                </div>
                <div className={tagline} >
                  surfs up
                </div>
                <div className={date} >
                  {(new Date).toString().slice(0,15)}
                </div>
              </div>
            </div>
            <div className={title}>
              First Ever post
            </div>
            <div className={subtitle}>
              sickest blog there is
            </div>
            <div className={body}>
              This guide walks you through the process of running an example Go application on a Kubernetes
              cluster. It uses a simple API for a "to-do list" application. The first step is to create the G
              o program binary, insert the binary into a minimal Dockerfile and use it as a star
              ting point for cre at ing a cus tom Helm chart to automate the applica
              tion deployment in a Kubernetes cluster. Once the application is dep
              oyed and working, it also explores how to m
              odify the source code for publishing a new appl
              ication release and how to perfo
              rm rolling updates in Kubern
              etes using the Helm CLI.
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default connect(store => ({
  loginOrSignUp: store.login.loginOrSignUp,
  loggedIn: store.user.loggedIn,
  showNewBlogPost: store.blog.showNewBlogPost
}),
{ getPosts, showNewPost })(Blog);
