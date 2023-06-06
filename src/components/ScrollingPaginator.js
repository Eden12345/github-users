import React, { useCallback } from 'react';
import styled from 'styled-components';

import Loader from './Loader';
import UserCard from './UserCard';

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 32px 32px 0 32px;
  height: 80vh;
  overflow: scroll;
`;

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