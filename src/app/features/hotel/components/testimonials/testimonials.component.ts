import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  template: `
    <!-- Template Start -->

    <div class="testimonials-container">
      <h3>What our customers are saying</h3>
      <div class="photo-container">
        <!-- Left Photo -->
        <div class="left-container">
          <img
            src="https://images.unsplash.com/photo-1510133744874-096621a0e01e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            class="photo-left-1"
          />
          <span class="left-container-span"
            >I had a great experience booking through Aurora. The process
            was easy and the customer service was excellent.</span
          >
          <p>Alan Sam</p>
        </div>
        <!-- Left Photo -->
        <!-- Right Section -->
        <div class="right-container">
          <section class="photo-right-1">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
              alt=""
              class="photo-right-top"
            />
            <section class="right-content">
              <span class="photo-right-top-span"
                >I found the perfect hotel for my trip at a great price. Thank
                you Aurora</span
              >
              <p>Sandra Maria</p>
            </section>
          </section>
          <!-- Seconds Photo -->
          <section class="photo-right-2">
            <img
              src="https://images.unsplash.com/photo-1533973427779-4b8c2eb4c3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              class="photo-right-bottom"
            />
            <div class="bottom-span-container">
              <span class="photo-right-bottom-span"
                >Aurora made planning my trip a breeze. I highly
                recommend their services.</span
              >
              <p>Sejal R</p>
            </div>
          </section>
          <!-- Seconds Photo -->
        </div>
        <!-- Right Section -->
      </div>
    </div>
    <!-- Template End -->
  `,
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {}
