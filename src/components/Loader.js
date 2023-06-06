import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from '../assets/logo.svg';

const breatheAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(4500deg);
  }
`;

const SpinningLoader = styled.img`
  height: 40px;
  pointer-events: none;
  animation: ${breatheAnimation} 40s linear infinite;
`;

function Loader({ gitHubUser }) {
  return (
    // This is the spinning React logo from the create-react-app
    // package that I'm using to indicate loading
    <SpinningLoader src={logo} className="App-logo" alt="logo" />
  );
}

export default Loader;
