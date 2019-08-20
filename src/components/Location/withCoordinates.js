import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading';
// import ls from 'local-storage'
import Cookies from 'universal-cookie';

const locationCookie = new Cookies();

const withCoordinates = (Comp) => (props) => {

  const [location, setLocation ] = useState([]);
  
  useEffect(() => {
    const currentLocation = locationCookie.get('userLocation')
    // if(ls.get('userLocation')){
    if(currentLocation){
      // setLocation(ls.get('userLocation'))
      setLocation(currentLocation);
      // console.log('got location from cookie');
      console.log('Got location from cookie:\nLat: ' + currentLocation[0] + ' | Lon: ' + currentLocation[1])
      // console.log('got location from local storage');
    } else {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((location) => {
          console.log('Query to navigator done')
          const {latitude, longitude} = location.coords;
          let newLocation = [];
          newLocation.push(latitude, longitude)
          console.log('Got location from user:\nLat: ' + latitude + ' | Lon: ' + longitude)
            setLocation(newLocation);
            locationCookie.set('userLocation', newLocation, { path: '/', maxAge: (60*60*1) });
            // ls.set('userLocation', newLocation)
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