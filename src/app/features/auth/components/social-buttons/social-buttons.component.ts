import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-buttons',
  template: `
    <div class="or-container">
      <label>Or {{ text }} with</label>
    </div>
    <div class="social-buttons">
      <button>
        <img src="assets/icons/facebook.svg" alt="facebook_icon" />
      </button>
      <button>
        <img src="assets/icons/google.svg" alt="" />
      </button>
      <button>
        <img src="assets/icons/apple.svg" alt="" />
      </button>
    </div>
  `,
  styleUrls: ['./social-buttons.component.css'],
})
export class SocialButtonsComponent {
  @Input() text: string = '';
}
