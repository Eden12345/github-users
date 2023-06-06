import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Loader from './Loader';
import UserCard from './UserCard';

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 32px 32px 0 32px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 40px;
`;

const Button = styled.button`
  border: 2px solid grey;
  background: none;
  box-shadow: 6px 6px 20px;
  margin: 32px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const PageNumber = styled.span`
  font-size: 24px;
`;

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
