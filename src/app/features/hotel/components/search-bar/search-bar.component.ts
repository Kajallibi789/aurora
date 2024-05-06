import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/core/models/app-state.model';
import { HotelDataModel } from '../../store/hotel.model';
import { hotelsSelector } from '../../store/hotels.selectors';
import { Router } from '@angular/router';
import slugify from 'slugify';
import { updateSearchBar } from '../../store/search/search.action';

@Component({
  selector: 'app-search-bar',
  template: `
    <!-- Template Start -->
    <div class="search-bar-container">
      <div
        class="section-content"
        [ngClass]="{ 'invalid-form': formSubmitted && form.invalid }"
      >
        <section class="section-title">
          <p>Find your stay!</p>
        </section>
        
        <!-- <section class="name-container">
          <h5 id= "dest">Destination</h5>
          <h5 id= "check-in">Check-In</h5>
          <h5 id= "check-out">Check-Out</h5>
          <h5 id= "room">Rooms & Guests</h5>
          
        </section>
         -->
        <form [formGroup]="form" (ngSubmit)="submit()">
          <section class="inputs-container">
            <section class="inputs-container-dest">
            <h5 class="name-container">Destination</h5>
            <input
              type="text"
              placeholder="Enter Destination"
              formControlName="destination"
              (keyup)="searchHotels($event)"
              (focus)="destinationInputFocused = true"
              value=""
            />
            <ul class="search-results" *ngIf="destinationInputFocused">
              <li
                class="search-result-item"
                *ngFor="let city of this.hotelCountry"
                (click)="selectDestination(city)"
              >
                {{ city }}
              </li>
            </ul>
            </section>
            <section class="inputs-container-dest">
            <h5 class="name-container">Check-In</h5>
            <input
              type="date"
              placeholder="Check In"
              formControlName="checkIn"
              [min]="today"
            />
            </section>
            <section class="inputs-container-dest">
            <h5 class="name-container">Check-Out</h5>
            <input
              type="date"
              placeholder="Check Out"
              formControlName="checkOut"
              [min]="today"
              [ngClass]="{ error: checkOutControl?.invalid }"
            />
            </section>
            <section class="inputs-container-dest">
            <h5 class="name-container">Rooms & Guests</h5>
            <input
              type="text"
              id="rooms-guests-input"
              placeholder="Rooms & Guests"
              formControlName="roomsGuests"
              (click)="openModal(content); updateRoomsGuests()"
            />
            </section>
            <ng-template #content let-modal>
              <div class="modal-header">
                <h4 class="modal-title">Select Rooms and Guests</h4>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  (click)="modal.dismiss('Cross click')"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div *ngFor="let item of ['rooms', 'adults', 'children']">
                  <p>{{ item }}</p>
                  <section>
                    <button (click)="updateGuestsData(item, -1)">
                      <img src="assets/icons/minus.svg" alt="minus_icon" />
                    </button>
                    <label>{{ guestsData[item] }}</label>
                    <button (click)="updateGuestsData(item, +1)">
                      <img src="assets/icons/plus.svg" alt="plus_icon" />
                    </button>
                  </section>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  (click)="modal.close('Close click')"
                >
                  Done
                </button>
              </div>
            </ng-template>
          </section>
          <section class="buttons-container">
            <button type="button" class="button-promo">+ Add Promo Code</button>
            <button type="submit" class="button-show-place">Show Places</button>
          </section>
        </form>
      </div>
    </div>

    <!-- Template End -->
  `,
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  // Define a property 'today' as the current date in ISO format
  today = new Date().toISOString().split('T')[0];
  form: FormGroup;
  hotels$: Observable<HotelDataModel[]>;
  hotelCountry: string[] = [];
  destinationInputFocused = false;
  filteredHotels: HotelDataModel[] = [];
  formSubmitted = false;

  guestsData: GuestsData = {
    rooms: 1,
    adults: 1,
    children: 0,
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    // Initialize the form property using the FormBuilder dependency
    this.form = this.fb.group({
      destination: '',
      checkIn: ['', Validators.required],
      checkOut: ['', [Validators.required]],
      roomsGuests: [
        '',
        [Validators.required, this.roomsGuestsValidator.bind(this)],
      ],
    });
    // Get the checkOut control from the form
    const checkOutControl = this.form.get('checkOut');
    if (checkOutControl) {
      // Set the validator for the checkOut control using the checkOutValidator method
      checkOutControl.setValidators(this.checkOutValidator.bind(this));
    }

    this.hotels$ = this.store.pipe(select(hotelsSelector));
    this.hotels$.pipe(filter((hotels) => !!hotels)).subscribe((hotels) => {
    const uniqueCityNames = new Set<string>(); // Create a Set to store unique city names
    hotels.forEach((hotel) => {
        // Check if the city name already exists in the set before adding it
        if (!uniqueCityNames.has(hotel.address.city)) {
            uniqueCityNames.add(hotel.address.city); // Add the city name to the set
        }
    });
    this.hotelCountry = Array.from(uniqueCityNames); // Convert Set to array and assign it to hotelCountry
    this.filteredHotels = hotels;
    });

    
  }

  get checkOutControl() {
    return this.form.get('checkOut');
  }

  // Define a method 'openModal' that takes content as an argument
  openModal(content: any) {
    this.modalService.open(content);
  }

  roomsGuestsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value) {
      const [rooms, adults, children] = value
        .split(',')
        .map((val: any) => parseInt(val));
      if (rooms > 0 && adults > 0 && children >= 0) {
        return null;
      }
    }
    return { invalidRoomsGuests: true };
  }

  checkOutValidator(control: AbstractControl): ValidationErrors | null {
    const checkInControl = this.form.get('checkIn');
    if (checkInControl) {
      const checkInDate = new Date(checkInControl.value);
      const checkOutDate = new Date(control.value);
      if (checkOutDate <= checkInDate) {
        console.log('Invalid check-out date');
        return { invalidCheckOutDate: true };
      }
    }
    return null;
  }

  updateGuestsData(key: string, value: number) {
    if (key === 'rooms' || key === 'adults') {
      if (this.guestsData[key] + value >= 1) {
        this.guestsData[key] += value;
      }
    } else if (key === 'children') {
      if (this.guestsData[key] + value >= 0) {
        this.guestsData[key] += value;
      }
    }
    this.updateRoomsGuests();
  }
  updateRoomsGuests() {
    this.form.patchValue({
      roomsGuests: `${this.guestsData['rooms']} Rooms, ${this.guestsData['adults']} Adults, ${this.guestsData['children']} Children`,
    });
  }
  submit() {
    if (this.form.valid) {
      const { destination, checkIn, checkOut, roomsGuests } = this.form.value;
      const city = destination;
      const citySlug = slugify(city, { lower: true });
      this.store.dispatch(
        updateSearchBar({
          searchResult: [
            {
              destination,
              checkIn,
              checkOut,
              roomsGuests,
            },
          ],
        })
      );

      this.router.navigate(['/hotel-listing'], {
        queryParams: { city: citySlug },
      });
    } else {
      console.log('Error: All form fields are required.');
    }
  }

  selectDestination(city: string) {
    this.form.patchValue({ destination: city });
    this.destinationInputFocused = false;
  }
  searchHotels(event: any) {
    const value = event.target.value;
    this.hotels$
      .pipe(
        map((hotels) =>
          hotels.filter((hotel) =>
            hotel.address.city.toLowerCase().includes(value.toLowerCase())
          )
        )
      )
      .subscribe((filteredHotels) => (this.filteredHotels = filteredHotels));
  }
}

interface GuestsData {
  [key: string]: number;
}
