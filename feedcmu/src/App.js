import './App.css';
import React, { useEffect, component, useState } from 'react';
import { Box, Button, Grid, Skeleton } from '@mui/material';
import { DirectionsService, DirectionsRenderer, GoogleMap, useJsApiLoader, MarkerF, InfoWIndowF, InfoWindowF } from '@react-google-maps/api'
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField } from '@mui/material';


const containerStyle = {
  width: '800px',
  height: '600px',
  justifyContent: 'center',
};

let centers = [
  {
    lat: 40.445167,
    lng: -79.945275
  },
  {
    lat: 40.443551,
    lng: -79.944519
  },
  {
    lat: 40.441534,
    lng: -79.942926
  }
];
let markers = []

let foodInfo = [
  { foodName: "Bagel", loc: "ne", room_num: 1, id: 0, distance: '1 mi', duration: '3 min' },
  { foodName: "Lunch Buffet", loc: "Gates Center for Computer Science", room_num: 1, id: 1, distance: '.1 mi', duration: '2 min' },
  { foodName: "Pizza", loc: "College of Fine Arts", room_num: 1, id: 2, distance: '.4 mi', duration: '8 min' },
]

const divStyle = {
  background: `white`,
  border: `none`,
  padding: 10
}


function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCev9HKXyfXSboGpzOOKuL6D6eBfejpcNI',
    libraries: ['places']
  })

  const [building, setBuilding] = useState("default")
  const [food, setFood] = useState("default")
  const [room, setRoom] = useState("default")
  const [name, setName] = useState('');
  const [map, setMap] = React.useState(/**@type google.map.Map */(null))
  const [duration, setDuration] = React.useState('')
  const [distance, setDistance] = React.useState('')
  const [directionsResponse, setDirectionsResponse] = React.useState(null)
  var [value, setValue] = React.useState(0);
  var [isVisible, setIsVisible] = React.useState([false, false, false]);
  const handleChange = event => {
    setName(event.target.value);
    console.log('value is:', event.target.value);
  };

  const updateBuilding = event => {
    setBuilding(event.target.value);
    console.log("Building selected:", event.target.value);
  }

  const updateFood = event => {
    setFood(event.target.value);
  }

  const updateRoom = event => {
    setRoom(event.target.value);
  }

  async function addFoodInfo(event) {
    console.log(building)
    const locArray = building.split(",");
    console.log("loc array", locArray);
    const lat = parseFloat(locArray[0]);
    const lng = parseFloat(locArray[1]);
    const bname = locArray[2];
    centers.push({ lat: lat, lng: lng });
    //eslint-disable-next-line no-undef
    const newDest = new google.maps.LatLng(lat, lng)
    //eslint-disable-next-line no-undef
    source = new google.maps.LatLng(centers[0].lat, centers[0].lng)
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: source,
      destination: newDest,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    foodInfo.push({ foodName: food, loc: bname, room_num: room, id: foodInfo.length, distance: results.routes[0].legs[0].distance.text, duration: results.routes[0].legs[0].duration.text })
    setRoom(null)
    setFood(null)
    console.log(centers);
  }


  // const [dest, setDest] = React.useState(null);
  let source = null

  function onMarkerClick(e) {
    //eslint-disable-next-line no-undef
    calculateRoute(e.latLng)
    console.log(distance, duration)
  }

  async function calculateRoute(dest) {
    //eslint-disable-next-line no-undef
    source = new google.maps.LatLng(centers[0].lat, centers[0].lng)
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

  const setTrue = index => {
    setIsVisible([
      ...isVisible.slice(0, index),
      true,
      ...isVisible.slice(index + 1),
    ])
  }

  const setFalse = index => {
    setIsVisible([
      ...isVisible.slice(0, index),
      false,
      ...isVisible.slice(index + 1),
    ])
  }

  function clearRoute() {
    setDirectionsResponse(null)
    // directionsResponse = null
    setDistance('')
    setDuration('')
    // setDest(null)
  }

  // const onLoad = infoWindow => {
  //   console.log('infoWindow: ', infoWindow)
  // }

  useEffect(() => {
  })

  // Just a rough check of whether the Google map API is loaded
  if (!isLoaded) {
    return <Skeleton animation="wave" variant="rectangle" width={40} height={40} />;
  }

  return (

    <div className="App">
      <header className="App-header">
        <div id="form">
          <h1>FeedCMU</h1>
        </div>
      </header>

      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '67vh' }}
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
              }}>
              {markers = []}
              {centers.forEach((coord, idx) => markers.push(
                <div>
                  <MarkerF position={coord} onClick={(e) => onMarkerClick(e)} onMouseOver={() => setTrue(idx)} onMouseOut={() => setFalse(idx)} />
                  {console.log(isVisible[idx])}
                  {isVisible[idx] ?
                    <InfoWindowF
                      position={coord}
                      options={{
                        //eslint-disable-next-line no-undef
                        pixelOffset: new google.maps.Size(0, -30)
                      }}

                    >
                      <div style={divStyle}>
                        {idx === 0 ?
                          <div>
                            <h3>You are here</h3>
                          </div>
                          :
                          <div>
                            <h3>{foodInfo[idx].foodName} @ {foodInfo[idx].loc}</h3>
                            <h3>Room #{foodInfo[idx].room_num}</h3>
                            <h3>Distance: {foodInfo[idx].distance}; Travel time: {foodInfo[idx].duration}</h3>
                          </div>}
                      </div>
                    </InfoWindowF> : null}
                </div>
              )

              )}
              <div>{markers}</div>
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
                  <MenuItem value={"40.444747, -79.942084, Alumni House"}>Alumni House</MenuItem>
                  <MenuItem value={"40.441967, -79.946668, ANSYS Hall"}>ANSYS Hall</MenuItem>
                  <MenuItem value={"40.441520, -79.945125, Baker Hall"}>Baker Hall</MenuItem>
                  <MenuItem value={"40.445978, -79.941064, Bramer House"}>Bramer House</MenuItem>
                  <MenuItem value={"40.443545, -79.941982, Cohon University Center"}>Cohon University Center</MenuItem>
                  <MenuItem value={"40.441534, -79.942926, College of Fine Arts"}>College of Fine Arts</MenuItem>
                  <MenuItem value={"40.444241, -79.943959, Cyert Hall"}>Cyert Hall</MenuItem>
                  <MenuItem value={"40.442508, -79.944632, Doherty Hall"}>Doherty Hall</MenuItem>
                  <MenuItem value={"40.443334, -79.946405, Facilities Management Services Bldg"}>Facilities Management Services Bldg</MenuItem>
                  <MenuItem value={"40.443551, -79.944519, Gates Center for Computer Science"}>Gates Center for Computer Science</MenuItem>
                  <MenuItem value={"40.440897, -79.942548, Hall of the Arts"}>Hall of the Arts</MenuItem>
                  <MenuItem value={"40.444208, -79.945552, Hamburg Hall"}>Hamburg Hall</MenuItem>
                  <MenuItem value={"40.442365, -79.946670, Hamerschlag Hall"}>Hamerschlag Hall</MenuItem>
                  <MenuItem value={"40.441103, -79.943757, Hunt Library"}>Hunt Library</MenuItem>
                  <MenuItem value={"40.442024, -79.941461, Margaret Morrison Carnegie Hall"}>Margaret Morrison Carnegie Hall</MenuItem>
                  <MenuItem value={"40.444020, -79.946512, Mehrabian Collaborative Innovation Center"}>Mehrabian Collaborative Innovation Center</MenuItem>
                  <MenuItem value={"40.446192, -79.951099, Mellon Institute"}>Mellon Institute</MenuItem>
                  <MenuItem value={"40.443385, -79.945608, Newell-Simon Hall"}>Newell-Simon Hall</MenuItem>
                  <MenuItem value={"40.441726, -79.946346, Porter Hall"}>Porter Hall</MenuItem>
                  <MenuItem value={"40.441366, -79.942119, Posner Hall"}>Posner Hall</MenuItem>
                  <MenuItem value={"40.443508, -79.943543, Purnell Center for the Arts"}>Purnell Center for the Arts</MenuItem>
                  <MenuItem value={"40.442465, -79.947255, Roberts Engineering Hall"}>Roberts Engineering Hall</MenuItem>
                  <MenuItem value={"40.443002, -79.946772, Scott Hall"}>Scott Hall</MenuItem>
                  <MenuItem value={"40.440687, -79.941389, Skibo Gymnasium"}>Skibo Gymnasium</MenuItem>
                  <MenuItem value={"40.443963, -79.945536, Smith Hall"}>Smith Hall</MenuItem>
                  <MenuItem value={"40.444902, -79.947220, TCS Hall"}>TCS Hall</MenuItem>
                  <MenuItem value={"40.445167, -79.945275, Tepper Building"}>Tepper Building</MenuItem>
                  <MenuItem value={"40.444163, -79.943382, Warner Hall"}>Warner Hall</MenuItem>
                  <MenuItem value={"40.442655, -79.945683, Wean Hall"}>Wean Hall</MenuItem>
                  <MenuItem value={"40.442687, -79.940901, West Wing"}>West Wing</MenuItem>
                  <MenuItem value={"40.446737, -79.944693, WQED Building"}>WQED Building</MenuItem>
                </Select>
                <FormHelperText>Building where free food can be picked up</FormHelperText>
              </FormControl>
            </div>
            <div id="food_select">
              <TextField id="filled-basic" label="Food" variant="filled" onChange={updateFood} />
            </div>
            <div id="room_select">
              <TextField id="filled-basic" label="Room #" variant="filled" onChange={updateRoom} />
            </div>


          </div>
          <div id="submit">
            <Button variant="contained" color="success" onClick={addFoodInfo}>Submit</Button>
          </div>

        </div>

      </header >
    </div >
  );
}

export default App;
