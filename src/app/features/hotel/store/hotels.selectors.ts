import { AppStateInterface } from '../../../core/models/app-state.model';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppStateInterface) => {
  return state.hotels;
};

export const isLoadingSelector = createSelector(
  selectFeature,
  (state: any) => state.isLoading
);
export const hotelsSelector = createSelector(
  selectFeature,
  (state: any) => state.hotels
);
export const errorSelector = createSelector(
  selectFeature,
  (state: any) => state.error
);
