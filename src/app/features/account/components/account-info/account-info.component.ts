import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-info',
  template: `
    <!-- Template Start -->
    <div class="edit-account-info">
      <p class="edit-account-info-title">Account</p>
      <div class="edit-user">
        <div
          class="edit-user-name-container"
          *ngFor="let userInfo of userInfoContainers"
        >
          <div class="label-and-value">
            <p class="user-label">{{ userInfo.label }}</p>
            <p class="user-label-value">{{ userInfo.value }}</p>
          </div>
          <div class="edit-button-container">
            <img
              alt=""
              class="edit-icon"
              src="https://static.overlay-tech.com/assets/8f50f45c-4be1-4196-8697-bf5c906f92b6.svg"
            />
            <span class="button">{{ userInfo.button }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Template End -->
  `,
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  @Input() loggedInUser: any;

  userInfoContainers = [
    {
      label: 'Name',
      value: '',
      button: 'Change',
    },
    {
      label: 'Email',
      value: '',
      button: 'Change',
    },
    {
      label: 'Password',
      value: '**********',
      button: 'Change',
    },
    {
      label: 'Phone number',
      value: '',
      button: 'Change',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.userInfoContainers[0].value = this.loggedInUser[0].user.firstName;
      this.userInfoContainers[1].value = this.loggedInUser[0].user.email;
      this.userInfoContainers[3].value = this.loggedInUser[0].user.phoneNumber;
    } else {
      console.log(new Error('Logged in user not found'));
    }
  }
}
