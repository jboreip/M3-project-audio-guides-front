import React, { Component } from 'react'
import {Marker, Popup} from 'react-map-gl'
// import CloseLayer from '../../Discover/map/CloseLayer'

class SpotsDot extends Component {
  state = { 
    showPopup: false,
  }

// togglePopup = () => {
//   const { showPopup, popupOpen} = this.state;
//   const {popupStatus, popupChanger} = this.props;
//   if(showPopup && popupStatus){
//     this.closePopup();
//     this.setState({
//       showPopup: true,
//       closeLayer: true,
//     })
//   } else if (showPopup && !popupStatus){
//     this.setState({
//       showPopup: false,
//       closeLayer: false,
//     })
//   } else {
//     popupChanger();
//     this.setState({
//       showPopup: true,
//       closeLayer: true
//     })
//   }
// }






togglePopup = () => {
  const {showPopup} = this.state
  const { popupsToggle, closeLayerToggle } = this.props;
  // activa la close layer
  closeLayerToggle();
  // avisa a Map que hay popups abiertos
  popupsToggle();
  // muestra el popup del marker
  if (showPopup){
    this.setState({
      showPopup: false,
    })
  } else {
    this.setState({
      showPopup: true,
    })
  }
    
}

// cuando se cierra el popup
closePopup = () => {
  console.log('close popup executed')
  const { showPopup } = this.state;
  if(showPopup){
    this.setState({
      showPopup: false,
    })
  }
}








// handleDeleteClick = async (id) => {
//     const response = await spots.getSpots();
//     return response;
// }

render(){
  const { id, latitude, longitude, spotName, img, closePopup, popupChanger, zoom, popupsStatus} = this.props;
  const { showPopup} = this.state;
  return (
    <React.Fragment>

      {/* { closeLayer && <CloseLayer closePopup={this.closePopup}/>} */}

      <div onClick={this.togglePopup}>
        <Marker
        className={'spot-marker'}
        key={`marker-${id}`}
        latitude={latitude}
        longitude={longitude}
        offsetLeft={0}
        offsetTop={0} >
          <img src={'/images/marker.png'}
          // width={20*((24-zoom)/24)}
          width={50}
          alt={'marker'}/>
        </Marker>
      </div>    
      {
         (popupsStatus && showPopup) ? (
          <div >
            <Popup
            className='spot-popup-container'
            key={`popup-${id}`}
            latitude={latitude} 
            longitude={longitude}
            offsetLeft={25}
            offsetTop={5}
            closeOnClick={true}
            onClose={this.closePopup}
            closeButton={false} >
          <div className='spot-popup-image'>
            <img src={img} alt={spotName}/>
          </div>
          <div className='spot-popup-title'>
            <p>{spotName}</p>
          </div>
          <button onClick={() => {this.handleDeleteClick(id)}}>X</button>
          </Popup>
          </div>
          ) : null
        }
    </React.Fragment>
  )
}
}

export default SpotsDot;