import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import withCoordinates from '../Location/withCoordinates';
import MapGL, {Marker} from 'react-map-gl';
import DraggablePin from '../Trips/DraggablePin';
import Geocoder from 'react-map-gl-geocoder';
// import axios from 'axios';


const token = 'pk.eyJ1IjoicGllcm9iaiIsImEiOiJjanlpbjYxYXEwMDg3M21yeHhiYzZvbGh1In0.s4qwoXQLSGVCCH84CbKd_g';

class TripMap extends Component {

  state = { 
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 13
    },
    marker: {
      latitude: 0,
      longitude: 0
    },
    events: {},
    showMarker: false,
    style: 'mapbox://styles/pierobj/cjzka0a4y088s1cnzqdw79v0g',
  }

  // getCurrentCountry = async () => {
  //   const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location[1]},${this.props.location[0]}.json?access_token=${token}`);
  //   this.setState({
  //     countryCode: response.data.features[5].properties.short_code.toUpperCase()
  //   })
  // };

  

  componentDidMount(){
    this.setState({
      viewport:{
        latitude: this.props.location[0],
        longitude: this.props.location[1],
        zoom: 13
      },
    })
    
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
    const newViewport = {...viewport};
    newViewport.zoom = 12;
    return this.handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides
    });
  };


  // logDragEvent(name, event) {
  //   this.setState({
  //     events: {
  //       ...this.state.events,
  //       [name]: event.lngLat
  //     }
  //   });
  // }

  // onMarkerDragStart = event => {
  //   this.logDragEvent('onDragStart', event);
  // };

  // onMarkerDrag = event => {
  //   this.logDragEvent('onDrag', event);
  // };

  // onMarkerDragEnd = event => {
  //   this.logDragEvent('onDragEnd', event);
  //   this.setState({
  //     marker: {
  //       longitude: event.lngLat[0],
  //       latitude: event.lngLat[1]
  //     }
  //   });
  // };
  
  handleOnResult = event => {
    const city = event.result.text_en;
    const country = event.result.context[(event.result.context.length-1)].text_en;
    const [...resultLocation] = event.result.center;
    const formDisabled = false;
    this.props.getLocationFromMap(city, country, resultLocation, formDisabled);
    // console.log(this.props)
    // this.props.getCoordsFromMap(resultLocation);
    // let viewportCopy = this.state.viewport;
    // viewportCopy.zoom = 19;
    this.setState({
      // viewport: viewportCopy,
      marker: {
        longitude: resultLocation[0],
        latitude: resultLocation[1]
      },
      showMarker:true,
    })
  }


    render(){
      const { viewport, marker, showMarker, style} = this.state
      
      return (
            <MapGL 
              ref={this.mapRef}
              {...viewport}
              mapStyle={style}
              width='100%'  
              height='100%'
              onViewportChange={this.handleViewportChange}
              mapboxApiAccessToken={token}
              >   



              <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
                limit={3}
                types={'place'}
                trackProximity={true}
                minLength={4}
                language='en'
                placeholder={'Where do you wanna go?'}
                />

          { showMarker && <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable={false}
          // onDragStart={this.onMarkerDragStart}
          // onDrag={this.onMarkerDrag}
          // onDragEnd={this.onMarkerDragEnd}
        >
          <DraggablePin size={20} />
        </Marker>}
            

            </MapGL>
      )
    }
}

export default withCoordinates(TripMap);