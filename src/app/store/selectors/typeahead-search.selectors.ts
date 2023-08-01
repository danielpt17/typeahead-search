
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/typeahead-search.reducers';

const getSearchState = createFeatureSelector<SearchState>('search');


export const selectSearchState = (state: SearchState) => state;

export const selectResults = createSelector(
    getSearchState,
  (searchState: SearchState) => searchState.results
);

export const selectSuggestions = createSelector(
    getSearchState,
  (searchState: SearchState) => searchState.suggestions
);