import { Component, Input, OnInit } from '@angular/core';
import { HotelDataModel } from '../../store/hotel.model';
import { Router, ActivatedRoute } from '@angular/router';
import slugify from 'slugify';

@Component({
  selector: 'app-filters-card',
  template: `
    <div class="filters-card-container">
      <div *ngIf="data.isLoading$ | async">Loading...</div>
      <!-- Filter -->
      <div class="accommodation-list">
        <section class="hotel section-container">
          <h6>Hotels</h6>
          <p>{{ data.hotelCount }} places</p>
        </section>
        <section class="motel section-container">
          <h6>Motels</h6>
          <p>{{ data.motelCount }} places</p>
        </section>
        <section class="resort section-container">
          <h6>Resorts</h6>
          <p>{{ data.resortCount }} places</p>
        </section>
      </div>
      <!--Showing Places-->
      <div class="show-places-container">
        <p>
          Showing {{hotels.length}} of <span>{{ data.totalCount }} places</span>
        </p>
        <p>Sort by <span>Recommended</span></p>
      </div>

      <!--Carts-->
      <div class="card-container" *ngFor="let hotel of hotels ">
        <div class="card-photo">
          <img [src]="hotel?.cardBackground" alt="" />
        </div>
        <div class="card-items-container">
          <section class="card-title-price-container">
            <h4 class="card-title">{{ hotel.name }}</h4>
            <p class="card-price">
              Starting from
              <span class="card-price-amount">{{
                hotel.nightlyPrice | currency:'INR'
              }}</span
              ><span class="card-price-unit"> /night</span>
            </p>
          </section>
          <section class="card-address">
            <img src="assets/icons/location.svg" alt="location_icon" />
            <p>{{ hotel.address.streetAddress }},{{ hotel.address.city }}</p>
          </section>
          <section class="card-rating">
            <p class="card-rating-value">{{ hotel.rating }}</p>
            <p class="card-rating-label"><span>Very Good</span> 371 reviews</p>
          </section>
          <br />
          <section class="card-buttons">
            <button class="card-button-icon">
              <img src="assets/icons/heart.svg" alt="heart_icon" />
            </button>
            <button class="card-button-view" (click)="viewPlace(hotel.name)">
              View Place
            </button>
          </section>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./filters-card.component.css'],
})
export class FiltersCardComponent implements OnInit {
  @Input() data: any;
  hotels: HotelDataModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.data.hotels$.subscribe((hotels: HotelDataModel[]) => {
      this.hotels = hotels;
    });

    // Subscribe to the queryParams observable from the route dependency
    this.route.queryParams.subscribe((params) => {
      // Get the 'country' query parameter
      const city = params['city'];
      // If the 'country' query parameter exists
      if (city) {
        // Filter the hotels property to only include hotels from the specified country
        this.hotels = this.hotels.filter(
          (hotel) => slugify(hotel.address.city, { lower: true }) === city
        );
      }
    });
  }
  // Define a method 'viewPlace' that takes a hotel name as an argument
  viewPlace(hotelName: string) {
    // Generate a slug from the hotel name
    const slug = slugify(hotelName);
    // Navigate to the 'hotel-listing' route with the generated slug as a parameter
    this.router.navigate(['hotel-listing', slug]);
  }
}
