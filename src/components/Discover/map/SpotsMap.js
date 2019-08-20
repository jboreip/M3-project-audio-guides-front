import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import withCoordinates from '../../Location/withCoordinates';
import withAuth from '../../../components/Auth/withAuth';
import SpotDot from '../../Discover/map/SpotDot';
// import MapGL from 'react-map-gl'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
// import { GeoJSONLayer } from "react-mapbox-gl";
import Geocoder from 'react-map-gl-geocoder';
// import axios from 'axios';
import spotsService from '../../../services/spots-service';
import CloseLayer from '../../Discover/map/CloseLayer'


const token = 'pk.eyJ1IjoicGllcm9iaiIsImEiOiJjanlpbjYxYXEwMDg3M21yeHhiYzZvbGh1In0.s4qwoXQLSGVCCH84CbKd_g';

const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px',
  boxShadow: '0 0 10px 2px rgba(0,0,0,.1)'
};

class SpotsMap extends Component {

  state = { 
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 13
    },
    countryCode: '',
    style: 'mapbox://styles/pierobj/cjzka0a4y088s1cnzqdw79v0g',
    spots: [],
    popupsStatus:false,
    closeLayer: false,
    userSavedSpots: []
  }

  // getCurrentCountry = async () => {
  //   const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location[1]},${this.props.location[0]}.json?access_token=${token}`);
  //   this.setState({
  //     countryCode: response.data.features[5].properties.short_code.toUpperCase()
  //   })
  // };

  getSpots = async () => {
  const response = await spotsService.getSpots();
  return response;
  }


  componentDidMount(){
    // this.getCurrentCountry();
    const userSavedSpots = this.props.user.spots
    this.getSpots().then((spots) =>{
      this.props.me();
      const {listOfSpots} = spots
      this.setState({
        viewport:{
          latitude: this.props.location[0],
          longitude: this.props.location[1],
          zoom: 13
        },
        spots: listOfSpots,
        userSavedSpots: userSavedSpots
      })
    })
  }





  closeLayerToggle = () => {
    const {closeLayer} = this.state;
    // close layer activada
    if (!closeLayer){
      console.log('close layer activada')
      this.setState({
        closeLayer: true
      })
    }
  }

  popupsToggle = () => {
    const {popupsStatus} = this.state;
    if (popupsStatus) {
      // hay popups abiertos
    console.log('no hay popups abiertos + close layer desactivada')
    this.setState({
      popupsStatus: false,
      closeLayer: false,
    })
    } else {
      // no hay popups abiertos
    console.log('hay popups abiertos')
    this.setState({
      popupsStatus: true
    })
    }
  }


  closeAllPopups = () => {
    console.log('clicked close layer')
    const { popupsStatus } = this.state;
    if(popupsStatus){
      console.log('close all popups executed')
      this.setState({
        popupsStatus: false,
        closeLayer: false,
      })
    }
  }







  
  mapRef = React.createRef()

  handleViewportChange = viewport => {
      this.setState({
        viewport: { ...this.state.viewport, ...viewport }
      })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };


  // handleOnResult = event => {
  //   console.log('handleOnResult executed')
  //   this.setState({
  //     searchResultLayer: new ScatterplotLayer({
  //       id: 'search-result',
  //       data: event.result.geometry,
  //       getFillColor: [255, 0, 0, 128],
  //       getRadius: 1000,
  //       pointRadiusMinPixels: 20,
  //       pointRadiusMaxPixels: 20
  //     })
  //   })
  // }


    render(){
      const { viewport, style, spots, popupsStatus, closeLayer, userSavedSpots } = this.state
      
      return (
            <ReactMapGL 
              ref={this.mapRef}
              {...viewport}
              mapStyle={style}
              width='100%'  
              height='100%'
              onViewportChange={this.handleViewportChange}
              mapboxApiAccessToken={token}
              // onClick={this.closePopups}
              // onClick={(e) => {
              //   this.setState({
              //     closePopups:true
              //   })
              // }}
              >   


              <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                // onViewportChange={this.handleGeocoderViewportChange}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
                limit={5}
                types={'place'}
                // countries={countryCode}
                language='en'
                proximity={{longitude: viewport.longitude, latitude: viewport.latitude}}
                trackProximity={true}
                collapsed={true}
                />

              <GeolocateControl
                style={geolocateStyle}
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
                />
                

              {spots.length > 0 ? (spots.map((spot, i) => {
                let isSaved = false;
                if(userSavedSpots.includes(spot._id)){
                  isSaved = true;
                }
                return (
                <SpotDot
                key={spot._id}
                id={spot._id}
                latitude={spot.location.coordinates[0]}
                longitude={spot.location.coordinates[1]}
                spotName={spot.name}
                img={spot.img}
                popupsStatus={popupsStatus}
                popupsToggle={this.popupsToggle}
                zoom={viewport.zoom}
                closeLayerToggle={this.closeLayerToggle}
                isSaved={isSaved}
                {...this.props}
                // closeAllPopups={this.closeAllPopups}
                >
                 </SpotDot> )
              })
              ) : null
            }

            { closeLayer && <CloseLayer closeAllPopups={this.closeAllPopups}/>}

            </ReactMapGL>
      )
    }
}

export default withCoordinates(withAuth(SpotsMap));