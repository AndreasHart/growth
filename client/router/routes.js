import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '#app/components/app';
import Homepage from '#app/components/homepage';
import Login from '#app/components/Login';
import SignUp from '#app/components/signUp';
import About from '#app/components/about';
import Team from '#app/components/team';
import Events from '#app/components/events';
import SplitContact from '#app/components/choosecontact';
import Contact from '#app/components/contact';
import Contribute from '#app/components/contribute';
import Advertising from '#app/components/advertising';
import Usage from '#app/components/usage';
import Video from '#app/components/video';
import NotFound from '#app/components/not-found';
import Blog from '#app/components/blog';
import Admin from '#app/components/admin';


/**
 * Returns configured routes for different
 * environments. `w` - wrapper that helps skip
 * data fetching with onEnter hook at first time.
 * @param {Object} - any data for static loaders and first-time-loading marker
 * @returns {Object} - configured routes
 */
export default ({store, first}) => {

  // Make a closure to skip first request
  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }
      return loader ? loader({store, nextState, replaceState, callback}) : callback();
    };
  }

  const Authorization = (WrappedComponent, allowedRoles) => {
    return class WithAuthorization extends React.Component {
      constructor(props) {
        super(props)

        // In this case the user is hardcoded, but it could be loaded from anywhere.
        // Redux, MobX, RxJS, Backbone...
        this.state = {
          user: {
            name: 'vcarl',
            role: 'admin'
          }
        }
      }
      componentDidMount() {
        debugger;
      }
      render() {
        const { role } = this.state.user
        if (allowedRoles.includes(role)) {
          return <WrappedComponent {...this.props} />
        } else {
          return <h1>No page for you!</h1>
        }
      }
    }
  }

  return <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
    <Route path="/usage" component={Authorization(Usage, ['user', 'admin'])}/>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/about" component={About} />
    <Route path="/events" component={Events} />
    <Route path="/split" component={SplitContact} />
    <Route path="/contact" component={Contact} />
    <Route path="/contribute" component={Contribute} />
    <Route path="/adcontact" component={Advertising} />
    <Route path="/team" component={Team} />
    <Route path="/blog" component={Blog} />
    <Route path="/admin" component={Admin} />
    {/* Server redirect in action */}
    <Route path="*" component={NotFound} />
  </Route>;
};
