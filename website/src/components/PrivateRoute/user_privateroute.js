import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import serviceAuth from '../../service/user_serviceauth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        serviceAuth.auth() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
export default PrivateRoute;