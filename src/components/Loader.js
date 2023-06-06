import React from 'react';

import logo from '../assets/logo.svg';
import { SpinningLoader } from '../styles/Loader';

function Loader({ gitHubUser }) {
  return (
    // This is the spinning React logo from the create-react-app
    // package that I'm using to indicate loading
    <SpinningLoader src={logo} className="App-logo" alt="logo" />
  );
}

export default Loader;
