import styled from 'styled-components';

export const AppWrapper = styled.div`
  text-align: center;
`;

export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px;
`;

export const ErrorText = styled.p`
  margin: 10px;
`;
