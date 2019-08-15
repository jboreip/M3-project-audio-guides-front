import React, { useState, useEffect } from 'react'

const withCoordinates = (Comp) => () => {

const [location, setLocation ] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      let newLocation = [];
      newLocation.push(location.coords.latitude, location.coords.longitude)
      setLocation(newLocation)
    })
  }, []) 

  console.log('Current user location:\nLat: ' + location[0] + ' | Lon: ' + location[1])

    return (
      <>
        <Comp location={location}/>
      </>
    )

}


export default withCoordinates;