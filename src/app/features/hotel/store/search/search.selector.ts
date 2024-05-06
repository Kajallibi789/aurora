import { createSelector } from '@ngrx/store';
import { SearchStateInterface } from 'src/app/core/models/search-state.model';

export const selectSearchState = (state: any) => state.search;

export const selectSearchResult = createSelector(
  selectSearchState,
  (state: SearchStateInterface) => state.searchResult
);
