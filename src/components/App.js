import React, { useCallback, useEffect, useState } from 'react';

import ManualPaginator from './ManualPaginator';
// import ScrollingPaginator from './ScrollingPaginator';
import Loader from './Loader';

import { AppWrapper, AppHeader, ErrorWrapper, ErrorText } from '../styles/App';

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
          <ErrorText>{`Error fetching users (code ${error})`}</ErrorText>
          <ErrorText>This may be due to rate limiting</ErrorText>
        </ErrorWrapper>
      )}
      
    </AppWrapper>
  );
}

export default App;
