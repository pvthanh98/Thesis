import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import serviceAuth from '../../service/sys_auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        serviceAuth.auth() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/sys/login',
            state: { from: props.location }
          }} />
    )} />
  )
export default PrivateRoute;