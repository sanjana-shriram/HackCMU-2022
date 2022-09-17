import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const submitFunction = () => {
  console.log("submit button clicked");
}



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
          Enter details about the free food you'd like to submit to our platform using the form below.
        </p>

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
              <MenuItem value={"AH"}>Alumni House</MenuItem>
              <MenuItem value={"AN"}>ANSYS Hall</MenuItem>
              <MenuItem value={"BH"}>Baker Hall</MenuItem>
              <MenuItem value={"BR"}>Bramer House</MenuItem>
              <MenuItem value={"CUC"}>Cohon University Center</MenuItem>
              <MenuItem value={"CFA"}>College of Fine Arts</MenuItem>
              <MenuItem value={"CYH"}>Cyert Hall</MenuItem>
              <MenuItem value={"DH"}>Doherty Hall</MenuItem>
              <MenuItem value={"FM"}>Facilities Management Services Bldg</MenuItem>
              <MenuItem value={"GHC"}>Gates Center for Computer Science</MenuItem>
              <MenuItem value={"HOA"}>Hall of the Arts</MenuItem>
              <MenuItem value={"HBH"}>Hamburg Hall</MenuItem>
              <MenuItem value={"HH"}>Hamerschlag Hall</MenuItem>
              <MenuItem value={"HL"}>Hunt Library</MenuItem>
              <MenuItem value={"III"}>Integrated Innovation Institute</MenuItem>
              <MenuItem value={"MM"}>Margaret Morrison Carnegie Hall</MenuItem>
              <MenuItem value={"CIC"}>Mehrabian Collaborative Innovation Center</MenuItem>
              <MenuItem value={"MI"}>Mellon Institute</MenuItem>
              <MenuItem value={"M19"}>Mill 19</MenuItem>
              <MenuItem value={"NR"}>National Robotics Engineering Center</MenuItem>
              <MenuItem value={"NSH"}>Newell-Simon Hall</MenuItem>
              <MenuItem value={"PTC"}>Pittsburgh Technology Center</MenuItem>
              <MenuItem value={"PH"}>Porter Hall</MenuItem>
              <MenuItem value={"PC"}>Posner Center</MenuItem>
              <MenuItem value={"POS"}>Posner Hall</MenuItem>
              <MenuItem value={"PCA"}>Purnell Center for the Arts</MenuItem>
              <MenuItem value={"RA"}>Rand Building</MenuItem>
              <MenuItem value={"REH"}>Roberts Engineering Hall</MenuItem>
              <MenuItem value={"SH"}>Scaife Hall</MenuItem>
              <MenuItem value={"SC"}>Scott Hall</MenuItem>
              <MenuItem value={"GYM"}>Skibo Gymnasium</MenuItem>
              <MenuItem value={"EDS"}>Smith Hall</MenuItem>
              <MenuItem value={"SEI"}>Software Engineering Institute</MenuItem>
              <MenuItem value={"TCS"}>TCS Hall</MenuItem>
              <MenuItem value={"TEP"}>Tepper Building</MenuItem>
              <MenuItem value={"WH"}>Warner Hall</MenuItem>
              <MenuItem value={"WEH"}>Wean Hall</MenuItem>
              <MenuItem value={"WWG"}>West Wing</MenuItem>
              <MenuItem value={"WF"}>Whitfield Hall</MenuItem>
              <MenuItem value={"WQ"}>WQED Building</MenuItem>
            </Select>
            <FormHelperText>Building where free food can be picked up</FormHelperText>
          </FormControl>
        </div>
        {/* 
        <div id="form">
          <form>
            <label>
              <div id="name_block">
                Name:
                <input type="text" name="name" onChange={handleChange} />
              </div>
              <div id="building_block">
                Building:
                <input type="text" name="building" onChange={handleChange} />
              </div>
              <div id="room_number_block">
                Room Number:
                <input type="text" name="Room Number" onChange={handleChange} />
              </div>
            </label>
            <input type="submit" value="Submit" onClick={submitFunction()} />
          </form>

        </div> */}

      </header >
    </div >
  );
}

export default App;
