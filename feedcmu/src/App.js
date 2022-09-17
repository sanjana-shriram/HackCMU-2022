import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';

const submitFunction = () => {
  console.log("submit button clicked");
}



function App() {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);
    console.log('value is:', event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter details about the free food you'd like to submit to our platform using the form below.
        </p>

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

        </div>

      </header >
    </div >
  );
}

export default App;
