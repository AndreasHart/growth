import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '#app/components/app';
import Homepage from '#app/components/homepage';
import LoginSignUp from '#app/components/LoginSignUp';
import About from '#app/components/about';
import Team from '#app/components/team';
import Eats from '#app/components/eats';
import Usage from '#app/components/usage';
import Video from '#app/components/video';
import NotFound from '#app/components/not-found';

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
    <Route path="/login" component={LoginSignUp} />
    <Route path="/about" component={About} />
    <Route path="/eats" component={Eats} />
    <Route path="/team" component={Team} />
    <Route path="/video" component={Video} />
    {/* Server redirect in action */}
    <Redirect from="/docs" to="/usage" />
    <Route path="*" component={NotFound} />
  </Route>;
};
