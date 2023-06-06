import React, { useCallback, useMemo, useState } from 'react';

import Loader from './Loader';
import UserCard from './UserCard';

import { UserList, ButtonWrapper, Button, PageNumber } from '../styles/ManualPaginator';

function ManualPaginator({ getGitHubUserList, gitHubUserList }) {
  const [currentPage, setCurrentPage] = useState(0);

  const currentPageList = useMemo(() => (
    gitHubUserList.slice(currentPage * 10, (currentPage + 1) * 10)
  ), [gitHubUserList.length, currentPage]);

  const goPageBack = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);
  
  const goPageForward = useCallback(() => {
    setCurrentPage(currentPage + 1);
    if (gitHubUserList.length < (currentPage + 2) * 10) {
      getGitHubUserList();
    }
  }, [currentPage, getGitHubUserList, gitHubUserList.length]);

  return (
    <div>
      <UserList>
        {currentPageList.length === 0 ? (
          <Loader />
        ) : (
          currentPageList.map((gitHubUser) => (
            <UserCard gitHubUser={gitHubUser} />
          ))
        )}
      </UserList>
      <ButtonWrapper>
        <Button onClick={goPageBack}>{'<'}</Button>
        <PageNumber>{currentPage + 1}</PageNumber>
        <Button onClick={goPageForward}>{'>'}</Button>
      </ButtonWrapper>
    </div>
  );
}

export default ManualPaginator;
