import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '@domain/user/login';
import { AuthService } from '@services/auth.service';
import { Token } from '@domain/user/token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tcc-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() close: EventEmitter<void> = new EventEmitter();

  loginForm: FormGroup;
  isPopupOpen: boolean = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response: Token) => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          this.closePopup();
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          this.snackBar.open('Login failed: ' + (err.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
        }
      });
    }
  }
}
