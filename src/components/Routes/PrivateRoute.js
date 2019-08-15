import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';

const PrivateRoute = (props) => {
  // Ponemos mayúscula al component para que React lo interprete como componente
  const {isLoggedIn, component: Component, ...rest} = props;
  return (
    <>
      {isLoggedIn ? <Route render={(props) => {
      // Para que react interprete esto como un componente tiene que estar con mayúscula, además hacemos spread de props para que se propaguen al Component
      return <Component {...props}/>
      // el ...rest hará spread de todas las otras props y las pasará como props individualmente al Component
      }} {...rest}/>
      : <Redirect to={'/login'}/>}
    </>
  )
}

export default withAuth(PrivateRoute);
