import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading';
import Cookies from 'universal-cookie';

const locationCookie = new Cookies();

const withCoordinates = (Comp) => (props) => {

  const [location, setLocation ] = useState([]);
  
  useEffect(() => {
    const currentLocation = locationCookie.get('userLocation')
    if(currentLocation){
      setLocation(currentLocation);
    } else {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((location) => {
          const {latitude, longitude} = location.coords;
          let newLocation = [];
          newLocation.push(latitude, longitude)
            setLocation(newLocation);
            locationCookie.set('userLocation', newLocation, { path: '/', maxAge: (60*60*1) });
        })
      }, 1500);
    }
  }, []) 
  
  
  if(location.length === 0){
    return (
      <Loading {...props}/>
    )
  }else{
    return (
      <React.Fragment>
        <Comp location={location} {...props}/>
      </React.Fragment>
    )
  }

}


export default withCoordinates;