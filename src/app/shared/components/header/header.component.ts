import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <!-- Template Start -->
    <div class="header-container">
      <app-navbar></app-navbar>
      <div class="header-content-container">
        <p>{{ HeaderTitle }}</p>
        <p>{{ HeaderSubTitle }}</p>
        <p>{{ HeaderDescription }}</p>
      </div>
    </div>
    <!-- Template End -->
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  HeaderTitle: string = 'Swipe On To Your Next Destination';
  HeaderSubTitle: string = 'LIVE & TRAVEL';
  HeaderDescription: string = 'Special offers to suit your plan';
}
