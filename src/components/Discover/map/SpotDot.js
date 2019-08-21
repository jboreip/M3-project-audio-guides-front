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
          <Pin size={25} color={isSaved ? '#ff6767':'#6d7bfa'}/>
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
                <img src='/images/heart-circle-full.svg' alt='Spot saved'/>
                :
                <img src='/images/heart-circle-empty.svg' alt='Spot empty'/>
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