import { createReducer, on } from '@ngrx/store';
import { addSuggestion, setResults } from '../actions/typeahead-search.actions';



export interface SearchState {
  suggestions:string[];
  results: string[];
}

export const initialState: SearchState = {
  suggestions:[],
  results:[]
};

export const searchReducer = createReducer(
  initialState,
  on(addSuggestion, (state, { suggestion }) => ({
    ...state,
    suggestions : [...state.suggestions, suggestion]
  })),
  on(setResults, (state, { results }) => ({
    ...state,
    results
  }))
);