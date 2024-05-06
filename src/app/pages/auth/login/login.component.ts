import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../features/auth/store/auth.actions';
import * as AuthSelectors from '../../../features/auth/store/auth.selectors';
import { AppStateInterface } from '../../../core/models/app-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="login-inputs-container">
          <button class="back-button" (click)="backToHome()">&#8592;</button>
          <h1 class="logo">Aurora</h1>
          <h3 class="login-title">Login</h3>
          <p class="login-description">
            Login to access your Aurora account
          </p>
          <section class="input-container">
            <input type="email" placeholder="e-mail" formControlName="email" />
            <input
              type="password"
              placeholder="password"
              formControlName="password"
            />
            <span class="error-message">{{
              loginForm.get('errorMessage')?.value
            }}</span>
          </section>
          <section class="password-section">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <button class="forgot-password-button">Forgot Password</button>
          </section>
          <div class="button-container">
            <button class="login-button">Login</button>
            <p>
              Don't have an account?
              <a href="" routerLink="/sign-up" class="login-to-signup"
                >Sign up</a
              >
            </p>
            <app-social-buttons text="login"></app-social-buttons>
          </div>
        </div>
      </form>
      <div class="login-image"></div>
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: '',
    });
  }

  ngOnInit() {
    //After login, if the user is logged in, navigate to the home page
    this.store
      .select(AuthSelectors.loggedInUserSelector)
      .subscribe((loggedInUser) => {
        if (loggedInUser) {
          console.log('Login Successful');
          this.router.navigate(['/']);
        }
      });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    //Check user credentials
    this.store
      .select(AuthSelectors.loggedInUserSelector)
      .subscribe((loggedInUser) => {
        //If the user is not logged in, set the error message
        if (!loggedInUser) {
          this.loginForm
            .get('errorMessage')
            ?.setValue('Invalid Email or Password');
        } else {
          //If the user is logged in, set the error message to an empty string
          this.loginForm.get('errorMessage')?.setValue('');
        }
      });

    //Dispatch login action
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
