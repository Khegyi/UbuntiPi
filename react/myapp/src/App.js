import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


async function getUser() {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://192.168.0.111:4000/api/test',
      headers: {
        /* withCredentials: false, */
        "Access-Control-Allow-Origin": "*"
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


function App() {

useEffect(() => {
  getUser();

}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
