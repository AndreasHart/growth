import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { banner, eventName, eventFeature, eventBody, p, link , split, button, teamTitle, container, containerColumn,teamMember} from './styles';
import { updateName } from '../../actions.js'
class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.

    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */
  handleDomething = (e) => {
    this.props.doSomething();
  }
  render() {
    return <div>
      <Helmet
        title='Home page'
        meta={[
          {
            property: 'og:title',
            content: 'NewGrowth.io'
          }
        ]} />
      <div className={banner} >
        <h1 className={eventName} >
          Halifax Events Live Stream
        </h1>
        <h2 className={eventFeature} >
          Featuring
        </h2>
        <div className={eventBody} >
          Wet Paint
        </div>
        <div className={eventBody} >
          Siri
        </div>
        <div className={eventBody} >
          Drd
        </div>
        <button className={button}>
          See More
        </button>
      </div>
      <div className={split} >
        <div className={banner} >
          <h1 className={eventName} >
            Halifax Events Live Stream
          </h1>
          <h2 className={eventFeature} >
            Featuring
          </h2>
          <div className={eventBody} >
            Wet Paint
          </div>
          <div className={eventBody} >
            Siri
          </div>
          <div className={eventBody} >
            Drd
          </div>
          <button className={button}>
            See More
          </button>
        </div>
        <div className={banner} >
          <h1 className={eventName} >
            Halifax Events Live Stream
          </h1>
          <h2 className={eventFeature} >
            Featuring
          </h2>
          <div className={eventBody} >
            Wet Paint
          </div>
          <div className={eventBody} >
            Siri
          </div>
          <div className={eventBody} >
            Drd
          </div>
          <button className={button}>
            See More
          </button>
        </div>
      </div>
      <div>
        <div className={containerColumn}>
          <h1 className={teamTitle}>
            We are run by a team of talented content creators
          </h1>
          <p>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</p>
        </div>
        <div className={container}>
          <div className={teamMember}>
              <img src="images/circle1.jpg"/>
              <h3>Morbi in sem quis dui</h3>
              <p>Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
          </div>
          <div className={teamMember}>
              <img src="images/circle2.jpg"/>
              <h3>Nam nulla quam, gravida non</h3>
              <p>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices tem.</p>
          </div>
          <div className={teamMember}>
              <img src="images/circle3.jpg"/>
              <h3>Suspendisse commodo</h3>
              <p>Sed adipiscing ornare risus. Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit.</p>
          </div>
        </div>
      </div>
    </div>;
  }

}


export default connect(store => ({ user: store.user }), {doSomething:updateName})(Homepage);
