import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading';
import ls from 'local-storage'

const withCoordinates = (Comp) => () => {

const [location, setLocation ] = useState([]);

  useEffect(() => {
    if(ls.get('userLocation')){
      setLocation(ls.get('userLocation'))
      console.log('got location from local storage');

    } else {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log('query to navigator')
        let newLocation = [];
        newLocation.push(location.coords.latitude, location.coords.longitude)
        console.log('Current user location:\nLat: ' + location[0] + ' | Lon: ' + location[1])
        setTimeout(() => {
          setLocation(newLocation);
          ls.set('userLocation', newLocation)
        }, 1500);
      })
    }
  }, []) 


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