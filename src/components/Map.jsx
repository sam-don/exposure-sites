import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import exposuresites from './exposuresites.json';

require('dotenv').config()

const containerStyle = {
  width: '90vw',
  height: '80vh'
};

const center = {
  lat: -37.8136,
  lng: 144.9631
};

console.log(exposuresites)

let markers = []

function fetchSites() {
  // const response = fetch(exposuresites,
  //   {
  //     headers: {
  //       'Content-Type': 'text/plain'
  //     }
  //   })
  //   .then(response => response.json())
    // .then(data => {
    //   for(let i = 0; i < data.length; i++) {
    //     markers.push(
    //       <Marker key={'marker_'+data[i]['_id']} title={data[i]['Site_title']} position={data[i]['location']} />
    //     )
    //   }
    // });

  for(let i = 0; i < exposuresites.length; i++) {
    markers.push(
      <Marker key={'marker_'+exposuresites[i]['_id']} title={exposuresites[i]['Site_title']} position={exposuresites[i]['location']} />
    )
  }
};

function MyComponent() {
  fetchSites()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {markers}
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)