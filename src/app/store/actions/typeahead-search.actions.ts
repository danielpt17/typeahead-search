import { createAction, props } from '@ngrx/store';

export const addSuggestion = createAction(
  '[Search] Add Suggestion',
  props<{ suggestion: string }>()
);

export const setResults = createAction(
  '[Search] Set Results',
  props<{ results: string[] }>()
);
