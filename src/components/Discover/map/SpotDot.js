import React, { Component } from 'react'
import {Marker, Popup} from 'react-map-gl'

class SpotsDot extends Component {
  state = { 
    showPopup: false,
  }

togglePopup = () =>{
  this.setState({
    showPopup: true
  })
}

render(){
  const { id, latitude, longitude} = this.props;
  const { showPopup } = this.state;
  return (
    <React.Fragment>
      <Marker key={`marker-${id}`} onClick={this.togglePopup} latitude={latitude} longitude={longitude} offsetLeft={-40} offsetTop={-10} ><img src={'/images/marker.png'} width={50} alt={'marker'}/></Marker>
      {showPopup ? (<Popup key={`popup-${id}`} latitude={latitude} longitude={longitude} offsetLeft={-15} offsetTop={-15}><h1>test</h1></Popup>) : null}
    </React.Fragment>
  )
}
}

export default SpotsDot;