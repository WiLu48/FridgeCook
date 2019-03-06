import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../Components/Auth/Auth';


const AuthRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={
            props =>
              !isAuth 
              ? <Component {...props} /> 
              : <Redirect to="/" />
          }
          {...rest}
        />
      )}
    </AuthConsumer>
  )
export default AuthRoute;