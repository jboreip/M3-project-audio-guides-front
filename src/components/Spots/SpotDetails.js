import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service.js'
import Loading from '../Loading/Loading';
import Backbar from '../Navigation/Backbar'
import SpotPlayer from '../../components/Spots/SpotPlayer'
import userService from '../../services/user-service';


class SpotDetails extends Component {
  
  state = {
    spot: {},
    userSpots: this.props.user.spots,
  }
  
  componentDidMount(){
    const {id} = this.props.match.params;
    spotsService.getSpot(id)
    .then((spot) => {
      this.setState({
        spot,
      })
    })
    .catch((e) => {
      console.error(e) 
    })
  }

  saveSpot = (id) => {
    userService.saveSpot(id)
    .then(response => {
      this.props.me();
      this.setState({
        userSpots: response.updatedUser.spots
      })
    })
  }



  render() {
    const {spot, userSpots} = this.state;
    if(spot){
      const { name, img, city, description, audioFile, _id} = this.state.spot;
        return (
        <>
        <Backbar history={this.props.history}/>
        <section className='spot-container'>
          <header>
            <img src={`/city_images/${img}`} alt={name}/>
            <h3>{name}</h3>
            {userSpots.includes(_id)
            ?
            <span className='heart' onClick={() => {this.saveSpot(_id)}}>
              <img src='/images/heart-circle-full.svg' alt='Spot saved'/>
            </span>
            :
            <span className='heart' onClick={() => {this.saveSpot(_id)}}>
              <img src='/images/heart-circle-empty.svg' alt='Spot saved'/>
            </span>
            }
          </header>
          <section className='pad-container'>
          <p>{description}</p>
          <SpotPlayer src={audioFile}/>
          </section>
        </section>
        </>
        )
      }else{
        return (
          <Loading/>
        )
      }
  }
}

export default withAuth(SpotDetails);