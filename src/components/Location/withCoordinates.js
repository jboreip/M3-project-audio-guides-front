import React, { Component } from 'react'

const withCoordinates = (Comp) => class Coordinates extends Component {

  state ={
    location: [],
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      let newLocation = [];
      newLocation.push(location.coords.latitude, location.coords.longitude)
      this.setState({
        location: newLocation
      })
      console.log('Current user location:\nLat: ' + this.state.location[0] + ' | Lon: ' + this.state.location[1])
    })
  }

  render() {
    return (
      <>
        <Comp location={this.state.location}/>
      </>
    )
  }
}


export default withCoordinates;