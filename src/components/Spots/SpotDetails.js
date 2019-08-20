import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service.js'
import Loading from '../Loading/Loading';
import AudioPlayer from '../../components/Audio/AudioPlayer'

class SpotDetails extends Component {
  
  state = {
    spot: {}
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


  render() {
    const { spot } = this.state;
    if(spot){
      const { name, img, city, description, audioFile} = this.state.spot;
        return (
        <section className='spot-container'>
          <img src={img} alt={name}/>
          <section className='pad-container'>
          <p>{description}</p>
          <AudioPlayer src={audioFile}/>
          </section>
        </section>
        )
      }else{
        return (
          <Loading/>
        )
      }
  }
}

export default withAuth(SpotDetails);