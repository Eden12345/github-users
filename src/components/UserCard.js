import React, { useCallback, useEffect, useState } from 'react';

import Loader from './Loader';

import { UserCardWrapper, UserLink, UserAvatar, UserDataString } from '../styles/UserCard';

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
