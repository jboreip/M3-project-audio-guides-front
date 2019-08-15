import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';

const AnonRoute = (props) => {
  const {isLoggedIn, component: Component, ...rest} = props;
  return (
    <>
      {!isLoggedIn ? <Route render={(props) => {
      return <Component {...props}/>
      }} {...rest}/>
      : <Redirect to={'/discover'}/>}
    </>
  )
}

export default withAuth(AnonRoute);
