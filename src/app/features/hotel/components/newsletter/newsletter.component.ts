import { Component } from '@angular/core';
@Component({
  selector: 'app-newsletter',
  template: `
    <!-- Template Start -->
    <div class="newsletter-container">
      <div class="newsletter-content">
        <h2>
          Subscribe
          <br />
          Newsletter
        </h2>
        <p>
          <span> The Travel </span>
          <br />
          Get inspire! Recieve travel discounts, tips and behind the scenes
          stories.
        </p>
        <section class="newsletter-submit-container">
          <input type="text" name="" id="" placeholder="Your e-mail adresss" />
          <button>Subscribe</button>
        </section>
      </div>
      <div class="newsletter-svg-container"></div>
    </div>
    <!-- Template End -->
  `,
  styleUrls: ['./newsletter.component.css'],
})
export class NewsletterComponent {}
