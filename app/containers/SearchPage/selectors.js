import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchPage state domain
 */

const selectSearchPageDomain = state => state.searchPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchPage
 */

const makeSelectSearchPage = () =>
  createSelector(
    selectSearchPageDomain,
    substate => substate,
  );

export default makeSelectSearchPage;
export { selectSearchPageDomain };
