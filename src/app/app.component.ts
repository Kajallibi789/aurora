import { Component, OnInit } from '@angular/core';
import * as HotelsActions from './features/hotel/store/hotels.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(HotelsActions.loadHotels());
  }
}
