import {
  call,
  put,
  select,
  takeLatest,
  takeEvery,
  all,
  delay,
} from 'redux-saga/effects';
import api from 'utils/api';
import history from 'utils/history';
import { 
  getUsersFail, 
  getUsersLoading, 
  getUsersSuccess,
  getReposFail, 
  getReposLoading, 
  getReposSuccess,
} from './actions';
import * as constants from './constants';
import makeSelectSearchPage from './selectors';

export function* getUsers() {
  const usersData = yield select(makeSelectSearchPage());
  yield put(getUsersLoading());
  try {
    const response = yield call(
      api.searchUsers,
      usersData.user.query
    );
    yield put(
      getUsersSuccess({
        results: response.data.items,
      }),
    );
  } catch (err) {
    let error = 'Sorry, there is a system error!';
    if (err && err.response && err.response.data) {
      if (err.response.data.message) {
        error = err.response.data.message;
      }
    }
    yield put(getUsersFail(error));
  }
}

export function* getRepos() {
  const reposData = yield select(makeSelectSearchPage());
  yield put(getReposLoading());
  try {
    const response = yield call(
      api.getRepos,
      reposData.user.repos_url
    );
    yield put(
      getReposSuccess({
        results: response.data,
      }),
    );
  } catch (err) {
    let error = 'Sorry, there is a system error!';
    if (err && err.response && err.response.data) {
      if (err.response.data.message) {
        error = err.response.data.message;
      }
    }
    yield put(getUsersFail(error));
  }
}

// Individual exports for testing
export default function* searchPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(constants.GET_USERS, getUsers),
    takeLatest(constants.GET_REPOS, getRepos),
  ]);
}
