import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Loader from './Loader';

const UserCardWrapper = styled.div`
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

const UserLink = styled.a`
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin: 20px 0;
`;

const UserAvatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-bottom: 8px;
`;

const UserDataString = styled.p`
  margin: 10px 0;
  font-size: 14px;
`;

function UserCard({ gitHubUser }) {
  const [gitHubUserDetails, setGitHubUserDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const getGitHubUserList = useCallback(async () => {
    setIsLoadingDetails(true);
  
    const response = await fetch(`https://api.github.com/users/${gitHubUser.login}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    });

    const json = await response.json();    
    setGitHubUserDetails(json);

    setIsLoadingDetails(false);
  }, [gitHubUser.login]);

  useEffect(() => {
    getGitHubUserList();
  }, [getGitHubUserList])

  return (
    <UserCardWrapper>
      <UserLink href={gitHubUser.html_url}>{gitHubUser.login}</UserLink>
      <UserAvatar src={gitHubUser.avatar_url} alt={`${gitHubUser.login}'s avatar`} width="80" height="80" />
      {isLoadingDetails || gitHubUserDetails == null ? (
        <Loader />
      ) : (
        <>
          <UserDataString>{gitHubUserDetails.name ?? 'No name'}</UserDataString>
          <UserDataString>{gitHubUserDetails.location ?? 'No location'}</UserDataString>
          <UserDataString>{gitHubUserDetails.email ?? 'No email'}</UserDataString>
          <UserDataString>{`Public Repos: ${gitHubUserDetails.public_repos ?? '0'}`}</UserDataString>
        </>
      )}
    </UserCardWrapper>
  );
}

export default UserCard;
