/**
 *
 * UserList
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { Skeleton } from 'primereact/skeleton';

function UserList({ users, onExpand, loadingUsers }) {

  const [selectedRepoUrl, setSelectedRepoUrl] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  // Fetch repositories when selectedRepoUrl changes
  useEffect(() => {
    if (selectedRepoUrl) {
      setLoadingRepos(true);
      fetch(selectedRepoUrl)
        .then((response) => response.json())
        .then((data) => {
          setReposData(data);
          setLoadingRepos(false);
        })
        .catch(() => {
          setReposData([]);
          setLoadingRepos(false);
        });
    }
  }, [selectedRepoUrl]);

  return (
    <Accordion multiple>
      {loadingUsers ? (
        Array.from({ length: 5 }).map((_, index) => (
          <AccordionTab key={index} header={<Skeleton width="100%" height="1.7rem" />} />
        ))
      ) : users.length > 0 ? (
        users.map((user, index) => (
          <AccordionTab
            key={index}
            header={user.login}
            onClick={() => setSelectedRepoUrl(user.repos_url)} // Update selected repo URL
          >
            {loadingRepos ? (
              <div className="flex justify-content-center">
                <Skeleton width="100%" height="5rem" />
              </div>
            ) : reposData.length > 0 ? (
              reposData.map((repo, idx) => (
                <Card key={idx} className="mb-3 p-0 card-list">
                  <div className="row justify-content-between">
                    <div className="col col-md text-start">
                      <h5 className="font-bold">{repo.name}</h5>
                    </div>
                    <div className="col-3 col-md-3 ps-0">
                      <div className="flex items-center">
                        <span className="me-1 text-sm font-medium">{repo.stargazers_count}</span>
                        <i className="pi pi-star text-yellow-500 text-sm"></i>
                      </div>
                    </div>
                    <div className="row text-start">
                      <p className="text-xs text-gray-600">{repo.description || "No description available"}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="p-3">Repository Not Found</div>
            )}
          </AccordionTab>
        ))
      ) : (
        <div className="p-3 text-center text-gray-500">No Users Found</div>
      )}
    </Accordion>

  );
}

UserList.propTypes = {};

export default memo(UserList);
