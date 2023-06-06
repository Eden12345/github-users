import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import ManualPaginator from './ManualPaginator';
import Loader from './Loader';

const AppWrapper = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px;
`;

const ErrorText = styled.p`
  margin: 10px;
`;

function App() {
  const [gitHubUserList, setGitHubUserList] = useState([]);
  const [nextGetUrl, setNextGetUrl] = useState(
    'https://api.github.com/users?per_page=10',
  );
  const [error, setError] = useState(null);

  const getGitHubUserList = useCallback(async () => {
    const response = await fetch(nextGetUrl, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      }
    });

    if (response.ok) {
      const json = await response.json();
      setGitHubUserList(gitHubUserList.concat(json || []));

      const linkString = response.headers.get('link');
      const linkArray = linkString.match(/(?<=<)(.*?)(?=>)/);
      setNextGetUrl(linkArray[0]);

      setError(null);
    } else {
      setError(response.status);
    }
  }, [gitHubUserList, nextGetUrl]);

  useEffect(() => {
    getGitHubUserList();
  }, [])

  return (
    <AppWrapper>
      <AppHeader>
        <p>Yay — look! It's the GitHub people!</p>
      </AppHeader>

      {error == null ? (
        <ManualPaginator
          getGitHubUserList={getGitHubUserList}
          gitHubUserList={gitHubUserList}
        />
      ) : (
        <ErrorWrapper>
          <Loader />
          <ErrorText />
          <ErrorText>{`Error with request code: ${error}`}</ErrorText>
          <ErrorText>This may be due to rate limiting</ErrorText>
        </ErrorWrapper>
      )}
      
    </AppWrapper>
  );
}

export default App;
