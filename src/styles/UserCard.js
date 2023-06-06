import styled from 'styled-components';

export const UserCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid grey;
  border-radius: 16px;
  margin: 20px;
  width: 200px;
  height: 300px;
  box-shadow: 6px 6px 20px;
`;

export const UserLink = styled.a`
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin: 20px 0;
`;

export const UserAvatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-bottom: 8px;
`;

export const UserDataString = styled.p`
  margin: 10px 0;
  font-size: 14px;
`;
