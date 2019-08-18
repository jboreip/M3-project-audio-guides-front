import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import withCoordinates from '../../Location/withCoordinates';
import SpotDotV2 from '../../Discover/map/SpotDotV2';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Geocoder from "react-map-gl-geocoder";
import axios from 'axios';
import spots from '../../../services/spots-service';


const token = 'pk.eyJ1IjoicGllcm9iaiIsImEiOiJjanlpbjYxYXEwMDg3M21yeHhiYzZvbGh1In0.s4qwoXQLSGVCCH84CbKd_g'
const Map = ReactMapboxGl({
  accessToken: token,
});

const mapAccess = {
  mapboxApiAccessToken: token,
}

class SpotsMap extends Component {

  state = { 
      viewport: {}

  }


    render(){

      const {viewport} = this.state

      return (

        
        <Map
        style='mapbox://styles/mapbox/streets-v9'
        containerStyle={{
          height: '92vh',
          width: '100vw'
        }}
      >
   
      <Geocoder
      {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
      />


              <Layer
              type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}
              >
                
              </Layer>

      </Map>
      )
    }
}

export default SpotsMap;