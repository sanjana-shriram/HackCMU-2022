import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField, Button} from '@mui/material';

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

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter details about the free food at CMU you'd like to submit to our platform using the form below.
        </p>
        <div id="form">
          <div id="building_select">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
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

      </header >
    </div >
  );
}

export default App;
