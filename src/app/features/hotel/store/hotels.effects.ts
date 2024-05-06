import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../../core/services/data.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HotelDataModel } from './hotel.model';
import * as HotelsActions from './hotels.actions';

@Injectable()
export class HotelsEffects {
  getHotels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelsActions.loadHotels),
      switchMap(() => {
        return this.dataService.getHotels().pipe(
          map((hotels: HotelDataModel[]) =>
            HotelsActions.loadHotelsSuccess({ hotels })
          ),
          catchError((error: any) =>
            of(HotelsActions.loadHotelsFailure({ error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
