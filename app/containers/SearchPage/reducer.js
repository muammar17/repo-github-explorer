/*
 *
 * SearchPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as constants from './constants';

export const initialState = {
  error: 0,
  error_msg: '',
  show_alert: false,
  loading_users: false,
  loading_repos: false,
  data_empty: true,
  users: [],
  error_users: null,
  error_repos: null,
  repos: [],
  user: {
    query: null,
    repos_url: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const searchPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case constants.UPDATE_INPUT:
        draft.user = {
          ...draft.user,
          [action.name]: action.value,
        };
        break;
      case constants.GET_USERS_LOADING:
        draft.loading_users = true;
        break;
      case constants.GET_USERS:
        draft.loading_users = true;
        draft.users = [];
        draft.data_empty = true;
        break;
      case constants.GET_USERS_SUCCESS:
        draft.users = action.results;
        draft.data_empty = false;
        draft.error = 0;
        draft.loading_users = false;
        break;
    case constants.GET_USERS_FAIL:
        draft.error_users = action.error;
        draft.users = [];
        draft.data_empty = true;
        draft.error = 1;
        draft.loading_users = false;
        break;
      case constants.GET_REPOS_LOADING:
        draft.loading_repos = true;
        break;
      case constants.GET_REPOS:
        draft.loading_repos = true;
        draft.repos = [];
        draft.data_empty = true;
        break;
      case constants.GET_REPOS_SUCCESS:
        draft.repos = action.results;
        draft.data_empty = false;
        draft.error = 0;
        draft.loading_repos = false;
        break;
      case constants.GET_REPOS_FAIL:
        draft.error_repos = action.error;
        draft.repos = [];
        draft.data_empty = true;
        draft.error = 1;
        draft.loading_repos = false;
        break;
    }
  });

export default searchPageReducer;
