import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import withCoordinates from '../../Location/withCoordinates';
import SpotDot from '../../Discover/map/SpotDot';
// import MapGL from 'react-map-gl'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
// import { GeoJSONLayer } from "react-mapbox-gl";
// import DeckGL from 'deck.gl';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import { GeoJsonLayer } from '@deck.gl/layers';
import Geocoder from 'react-map-gl-geocoder';
import axios from 'axios';
import spots from '../../../services/spots-service';


const token = 'pk.eyJ1IjoicGllcm9iaiIsImEiOiJjanlpbjYxYXEwMDg3M21yeHhiYzZvbGh1In0.s4qwoXQLSGVCCH84CbKd_g';

const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px'
};

class SpotsMap extends Component {

  state = { 
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 13
    },
    countryCode: '',
    // searchResultLayer: null,
    style: 'mapbox://styles/mapbox/streets-v9',
    markers: []
  }

  getCurrentCountry = async () => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location[1]},${this.props.location[0]}.json?access_token=${token}`);
    this.setState({
      countryCode: response.data.features[5].properties.short_code.toUpperCase()
    })
  };

  getPlansLocations = async () => {
  const response = await spots.getSpots();
  return response;
  }

  componentDidMount(){
    this.getCurrentCountry();
    this.getPlansLocations().then((markers) =>{
      const {listOfSpots} = markers
      console.log(markers)

      this.setState({
        viewport:{
          latitude: this.props.location[0],
          longitude: this.props.location[1],
          zoom: 13
        },
        markers: listOfSpots
      })
    }
    )
    
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
      const { viewport, countryCode, style, markers} = this.state
      
      return (
          <ReactMapGL 
            ref={this.mapRef}
            {...viewport}
            mapStyle={style}
            width='100%'
            height='100%'
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={token}
            >

            {/* Print Markers */}
            {
            markers.length > 0 ? (markers.map((marker, i) => {return (<SpotDot key={marker._id} id={marker._id} latitude={marker.location.coordinates[0]} longitude={marker.location.coordinates[1]} />)})) : null
            }

            <Geocoder 
              mapRef={this.mapRef}
              onResult={this.handleOnResult}
              // onViewportChange={this.handleGeocoderViewportChange}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={token}
              position='top-left'
              limit={5}
              types={'poi, place'}
              // countries={countryCode}
              // proximity={[viewport.longitude,viewport.latitude]}
              trackProximity={true}
            />

            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
            />

            {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
            
          </ReactMapGL>
      )
    }
}

export default withCoordinates(SpotsMap);