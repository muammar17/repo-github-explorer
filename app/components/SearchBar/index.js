/**
 *
 * SearchBar
 *
 */

import React, { memo, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
    

function SearchBar({ onSearch, loadingUsers }) {
    const toast = useRef(null);
    const [query, setQuery] = useState("");

  const handleSearch = () => {
      if (query.trim()) {
          onSearch(query);
      } else {
        toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail: "Please Input Github User!",
            life: 3000,
        }); 
      }
  };
  return (
    <React.Fragment>
        <Toast ref={toast} />
        <div className="row">
            <div className="col-12 mb-2">
                <InputText 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search GitHub users..."
                    className="w-100"
                />
            </div>
            <div className="col-12 mb-2">
                <Button 
                    label="Search" 
                    icon="pi pi-search" 
                    onClick={handleSearch} 
                    className="w-100"
                    loading={loadingUsers}
                />
            </div>
        </div>
    </React.Fragment>
  );
}

SearchBar.propTypes = {};

export default memo(SearchBar);
