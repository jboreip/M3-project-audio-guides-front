import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service.js'
import Loading from '../Loading/Loading';
import Backbar from '../Navigation/Backbar'
import SpotPlayer from '../../components/Spots/SpotPlayer'

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
        <>
        <Backbar history={this.props.history}/>
        <section className='spot-container'>
          <header>
            <img src={img} alt={name}/>
            <h3>{name}</h3>
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