import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/models/app-state.model';
import { loggedInUserSelector } from 'src/app/features/auth/store/auth.selectors';

@Component({
  selector: 'app-user-profile',
  template: `
    <!-- Template Start -->
    <div class="user-profile-container">
      <div class="user-info-container">
        <div class="user-info">
          <div class="user-image-and-name">
            <div class="user-image-container">
              <span class="username-logo">{{ firstName | logo }}</span>
              <div class="pen">
                <img src="/assets/icons/pencil.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="user-name-and-email">
            <p class="username">{{ firstName }} {{ lastName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
        </div>
      </div>
      <div class="account-sections">
        <section class="account-section-title" (click)="activeTab = 'account'">
          Account
        </section>
        <hr />
        <section class="account-section-title" (click)="activeTab = 'booking'">
          Bookings
        </section>
        <hr />
        <section class="account-section-title" (click)="activeTab = 'payment'">
          Payment methods
        </section>
        <hr />
      </div>

      <app-account-info
        [loggedInUser]="loggedInUser$ | async"
        *ngIf="activeTab === 'account'"
      ></app-account-info>

      <app-bookings-info *ngIf="activeTab === 'booking'"></app-bookings-info>
      <app-payment-info *ngIf="activeTab === 'payment'"></app-payment-info>
      <div class="logout-button-container">
        <button (click)="logout()">LOG OUT</button>
      </div>
    </div>
    <!-- Template End -->
  `,
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser$ = this.store.select(loggedInUserSelector);
  activeTab: string = 'account';
  firstName: string = '';
  lastName: string = '';
  userEmail: string = '';

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$.subscribe((loggedInUser) => {
      if (loggedInUser) {
        this.firstName = loggedInUser[0].user.firstName;
        this.lastName = loggedInUser[0].user.lastName;
        this.userEmail = loggedInUser[0].user.email;
      } else {
        console.log(Error);
      }
    });
  }
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}
