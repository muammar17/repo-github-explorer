/*
 *
 * SearchPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as constants from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateInput({ name, value }) {
  return {
    type: constants.UPDATE_INPUT,
    name,
    value,
  };
}

export function getUsers() {
  return {
    type: constants.GET_USERS,
  };
}

export function getUsersLoading() {
  return {
    type: constants.GET_USERS_LOADING,
  };
}

export function getUsersSuccess({ results }) {
  return {
    type: constants.GET_USERS_SUCCESS,
    results,
  };
}

export function getUsersFail(error) {
  return {
    type: constants.GET_USERS_FAIL,
    error,
  };
}

export function getRepos() {
  return {
    type: constants.GET_REPOS,
  };
}

export function getReposLoading() {
  return {
    type: constants.GET_REPOS_LOADING,
  };
}

export function getReposSuccess({ results }) {
  return {
    type: constants.GET_REPOS_SUCCESS,
    results,
  };
}

export function getReposFail(error) {
  return {
    type: constants.GET_REPOS_FAIL,
    error,
  };
}