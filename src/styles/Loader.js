import styled, { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(4500deg);
  }
`;

export const SpinningLoader = styled.img`
  height: 40px;
  pointer-events: none;
  animation: ${breatheAnimation} 40s linear infinite;
`;
