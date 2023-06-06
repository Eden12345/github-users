import React, { useCallback } from 'react';

import Loader from './Loader';
import UserCard from './UserCard';

import { UserList } from '../styles/ScrollingPaginator';

function ManualPaginator({ getGitHubUserList, gitHubUserList }) {
  const onScrollUserList = useCallback((event) => {
      const { target } = event;
      if (
        target.scrollTop === (target.scrollHeight - target.offsetHeight)
      ) {
        getGitHubUserList();
      }
  }, [getGitHubUserList]);

  return (
      <UserList onScroll={onScrollUserList}>
        {gitHubUserList.length === 0 ? (
          <Loader />
        ) : (
          gitHubUserList.map((gitHubUser) => (
            <UserCard gitHubUser={gitHubUser} />
          ))
        )}
      </UserList>
  );
}

export default ManualPaginator;