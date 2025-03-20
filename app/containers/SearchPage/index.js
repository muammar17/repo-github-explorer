/**
 *
 * SearchPage
 *
 */

import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

import SearchBar from "components/SearchBar";
import UserList from "components/UserList";

import { 
  updateInput, 
  getUsers, 
  getRepos,
} from './actions';

export function SearchPage({
  searchPage,
  onUpdateInput,
  onGetUsers,
  onGetRepos,
}) {

  const toast = useRef(null);

  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  useEffect(() => {
    if (searchPage.user.repos_url) {
      onGetRepos();
    }
  }, [searchPage.user.repos_url]);
  
  useEffect(() => {
    if (searchPage.user.query) {
      onGetUsers();
    }
  }, [searchPage.user.query]);

  useEffect(() => {
    if (searchPage.error_users) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: searchPage.error_users,
        life: 3000,
      }); 
    }
  }, [searchPage.error_users]);

  useEffect(() => {
    if (searchPage.error_repos) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: searchPage.error_repos,
        life: 3000,
      }); 
    }
  }, [searchPage.error_repos]);

  const handleSearch = (query) => {
    onUpdateInput('query', query)
  };

  const handleSelectUser = (repos_url) => {
    onUpdateInput('repos_url', repos_url) 
  };

  return (
    <div>
      <Toast ref={toast} />
      <Helmet>
        <title>Search Page</title>
        <meta name="description" content="Description of SearchPage" />
      </Helmet>
      <div className="container">
        <Card className="card-container shadow-3 p-4">
          <div className="card-content">
            <SearchBar onSearch={handleSearch} loadingUsers={searchPage.loading_users} />
            <div className="user-list-container">
              <UserList 
                users={searchPage.users} 
                onExpand={handleSelectUser} 
                loadingUsers={searchPage.loading_users}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchPage: PropTypes.object,
  onUpdateInput: PropTypes.func,
  onGetUsers: PropTypes.func,
  onGetRepos: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchPage: makeSelectSearchPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateInput: (name, value) => dispatch(updateInput({ name, value })),
    onGetUsers: () => dispatch(getUsers()),
    onGetRepos: () => dispatch(getRepos()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchPage);
