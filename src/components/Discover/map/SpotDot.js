import React, { Component } from 'react'
import {Marker, Popup} from 'react-map-gl'
import { Link } from 'react-router-dom';
// import CloseLayer from '../../Discover/map/CloseLayer'
import Pin from '../map/Pin'
// import withAuth from '../../../components/Auth/withAuth';
import userService from '../../../services/user-service';



class SpotsDot extends Component {
  state = { 
    showPopup: false,
    isSaved: this.props.isSaved,
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

saveSpot = () => {
userService.saveSpot(this.props.id)
.then(() => {
this.props.me();
})
if (this.state.isSaved) {
  this.setState({
    isSaved: false,
  })
} else {
  this.setState({
    isSaved: true,
  })
}

}


// handleDeleteClick = async (id) => {
//     const response = await spots.getSpots();
//     return response;
// }

render(){
  const { id, latitude, longitude, spotName, img, popupsStatus} = this.props;
  const { showPopup, isSaved} = this.state;
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
          {/* <img src={'/images/marker.png'}
          // width={20*((24-zoom)/24)}
          width={50}
          alt={'marker'}/> */}
          <Pin size={25} color={isSaved ? 'red':'#6d7bfa'}/>
        </Marker>
      </div>    
      {
         (popupsStatus && showPopup) ? (
          
            <Popup
            className='spot-popup-container'
            key={`popup-${id}`}
            latitude={latitude} 
            longitude={longitude}
            offsetLeft={10}
            offsetTop={0}
            closeOnClick={false}
            onClose={this.closePopup}
            closeButton={false} >
              <Link to={`/spots/${id}`}>
              <div className='spot-popup-image'>
                <img src={img} alt={spotName}/>
              </div>
              <div className='spot-popup-title'>
                <p>{spotName}</p>
              </div>
              </Link>
              <span className={isSaved ? 'heart-icon true' : 'heart-icon false'} onClick={this.saveSpot}>
                {isSaved ?
                <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
                :
                <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>
                }
                </span>
          {/* <button onClick={() => {this.handleDeleteClick(id)}}>X</button> */}
          </Popup>
        
          ) : null
        }
    </React.Fragment>
  )
}
}

export default SpotsDot;