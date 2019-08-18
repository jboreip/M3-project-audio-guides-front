import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading';

const withCoordinates = (Comp) => () => {

const [location, setLocation ] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      let newLocation = [];
      newLocation.push(location.coords.latitude, location.coords.longitude)
      setTimeout(() => {
        setLocation(newLocation)
      }, 1500);
    })
  }, []) 

  console.log('Current user location:\nLat: ' + location[0] + ' | Lon: ' + location[1])

  if(location.length === 0){
    return (
      <Loading/>
    )
  }else{
    return (
      <React.Fragment>
        <Comp location={location}/>
      </React.Fragment>
    )
  }

}


export default withCoordinates;