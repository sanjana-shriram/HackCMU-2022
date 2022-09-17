import './App.css';
import React, { useEffect, component } from 'react';
import { Box, Button, Grid, Skeleton } from '@mui/material';
import { DirectionsService, DirectionsRenderer, GoogleMap, useJsApiLoader, MarkerF, InfoWIndowF, InfoWindowF } from '@react-google-maps/api'
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField } from '@mui/material';

function App() {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);
    console.log('value is:', event.target.value);
  };

  const updateBuilding = event => {
    setBuilding(event.target.value);
    console.log("Building selected:", event.target.value);
  }

  const [building, setBuilding] = useState("default")


  const containerStyle = {
    width: '800px',
    height: '800px',
    justifyContent: 'center',
  };

  const centers = [
    {
      lat: 40.443336,
      lng: -79.944023
    },
    {
      lat: 40.444,
      lng: -79.944023
    },
    {
      lat: 40.445,
      lng: -79.944023
    }
  ];


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCev9HKXyfXSboGpzOOKuL6D6eBfejpcNI',
    libraries: ['places']
  })

  console.log(isLoaded)

  const [map, setMap] = React.useState(/**@type google.map.Map */(null))
  const [duration, setDuration] = React.useState('')
  const [distance, setDistance] = React.useState('')
  const [directionsResponse, setDirectionsResponse] = React.useState(null)
  const [value, setValue] = React.useState(0);
  // const [dest, setDest] = React.useState(null);
  let source = null

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  function onMarkerClick(e) {
    //eslint-disable-next-line no-undef
    calculateRoute(e.latLng)
    console.log(distance, duration)
  }

  async function calculateRoute(dest) {
    //eslint-disable-next-line no-undef
    source = new google.maps.LatLng(centers[0].lat, centers[0].lng)
    // if (dest === null) {
    //   return
    // } else {
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: source,
      destination: dest,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function onMarkerOver(e) {
    console.log(e)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    // directionsResponse = null
    setDistance('')
    setDuration('')
    // setDest(null)
  }

  const divStyle = {
    background: `white`,
    border: `none`,
    padding: 10
  }

  const onLoad = infoWindow => {
    console.log('infoWindow: ', infoWindow)
  }

  // function renderRoute() {

  //   if (directionsResponse !== null)
  //     return <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: true, preserveViewport: true }} />
  //   else
  //     console.log("wow")
  //     return null
  // }

  // Just a rough check of whether the Google map API is loaded
  if (!isLoaded) {
    return <Skeleton animation="wave" variant="rectangle" width={40} height={40} />;
  }

  let foodName = "aa", loc = "ne", amount = 3

  return (
    <div className="App">
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '80vh' }}
        >

          <Grid item xs={3}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centers[0]}
              zoom={16.8}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
              }}
            // onClick={onMapClick}
            // onUnmount={onUnmount}
            >
              <MarkerF position={centers[0]} onClick={(e) => onMarkerClick(e)} onMouseOver={(e) => onMarkerOver(e)} />
              <MarkerF position={centers[1]} onClick={(e) => onMarkerClick(e)} onMouseOver={(e) => onMarkerOver(e)} />
              <MarkerF position={centers[2]} onClick={(e) => onMarkerClick(e)} onMouseOver={(e) => onMarkerOver(e)} />

              <InfoWindowF
                onLoad={onLoad}
                position={centers[0]}
              >
                <div style={divStyle}>
                  <h3>{foodName} at {loc}</h3>
                  <h3>Amount: {amount}</h3>
                  <h3>Travel time: {duration}</h3>
                </div>
              </InfoWindowF>
              {console.log(directionsResponse)}
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: true, preserveViewport: true, suppressInfoWindow: true }} />}
            </GoogleMap>
            {/* <Button onClick={clearRoute}> del</Button> */}
          </Grid>
        </Grid>
      </div>
      <header className="App-header">

        <div id="after_map">
          <p>
            Enter details about the free food at CMU you'd like to submit to our platform using the form below.
          </p>
          <div id="form">
            <div id="building_select">
              <FormControl sx={{ m: 1, minHeight: 10, minWidth: 60 }}>
                <InputLabel id="demo-simple-select-helper-label">Building</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={building}
                  label="Building"
                  onChange={updateBuilding}
                >
                  {/* TODO add building namesss */}
                  {/* <MenuItem value=""><em>Select Building</em></MenuItem> */}
                  <MenuItem value={"(40.444747, -79.942084)"}>Alumni House</MenuItem>
                  <MenuItem value={"(40.441967, -79.946668)"}>ANSYS Hall</MenuItem>
                  <MenuItem value={"(40.441520, -79.945125)"}>Baker Hall</MenuItem>
                  <MenuItem value={"(40.445978, -79.941064)"}>Bramer House</MenuItem>
                  <MenuItem value={"(40.443545, -79.941982)"}>Cohon University Center</MenuItem>
                  <MenuItem value={"(40.441534, -79.942926)"}>College of Fine Arts</MenuItem>
                  <MenuItem value={"(40.444241, -79.943959)"}>Cyert Hall</MenuItem>
                  <MenuItem value={"(40.442508, -79.944632)"}>Doherty Hall</MenuItem>
                  <MenuItem value={"(40.443334, -79.946405)"}>Facilities Management Services Bldg</MenuItem>
                  <MenuItem value={"(40.443551, -79.944519)"}>Gates Center for Computer Science</MenuItem>
                  <MenuItem value={"(40.440897, -79.942548)"}>Hall of the Arts</MenuItem>
                  <MenuItem value={"(40.444208, -79.945552)"}>Hamburg Hall</MenuItem>
                  <MenuItem value={"(40.442365, -79.946670)"}>Hamerschlag Hall</MenuItem>
                  <MenuItem value={"(40.441103, -79.943757)"}>Hunt Library</MenuItem>
                  <MenuItem value={"(40.442024, -79.941461)"}>Margaret Morrison Carnegie Hall</MenuItem>
                  <MenuItem value={"(40.444020, -79.946512)"}>Mehrabian Collaborative Innovation Center</MenuItem>
                  <MenuItem value={"(40.446192, -79.951099)"}>Mellon Institute</MenuItem>
                  <MenuItem value={"(40.443385, -79.945608)"}>Newell-Simon Hall</MenuItem>
                  <MenuItem value={"(40.441726, -79.946346)"}>Porter Hall</MenuItem>
                  <MenuItem value={"(40.441366, -79.942119)"}>Posner Hall</MenuItem>
                  <MenuItem value={"(40.443508, -79.943543)"}>Purnell Center for the Arts</MenuItem>
                  <MenuItem value={"(40.442465, -79.947255)"}>Roberts Engineering Hall</MenuItem>
                  <MenuItem value={"(40.443002, -79.946772)"}>Scott Hall</MenuItem>
                  <MenuItem value={"(40.440687, -79.941389)"}>Skibo Gymnasium</MenuItem>
                  <MenuItem value={"(40.443963, -79.945536)"}>Smith Hall</MenuItem>
                  <MenuItem value={"(40.444902, -79.947220)"}>TCS Hall</MenuItem>
                  <MenuItem value={"(40.445167, -79.945275)"}>Tepper Building</MenuItem>
                  <MenuItem value={"(40.444163, -79.943382)"}>Warner Hall</MenuItem>
                  <MenuItem value={"(40.442655, -79.945683)"}>Wean Hall</MenuItem>
                  <MenuItem value={"(40.442687, -79.940901)"}>West Wing</MenuItem>
                  <MenuItem value={"(40.446737, -79.944693)"}>WQED Building</MenuItem>
                </Select>
                <FormHelperText>Building where free food can be picked up</FormHelperText>
              </FormControl>
            </div>
            <div id="food_select">
              <TextField id="filled-basic" label="Food" variant="filled" />
            </div>
            <div id="room_select">
              <TextField id="filled-basic" label="Room #" variant="filled" />
            </div>


          </div>
          <div id="submit">
            <Button variant="contained" color="success">Submit</Button>
          </div>

        </div>

      </header >
    </div >
  );
}

export default App;
