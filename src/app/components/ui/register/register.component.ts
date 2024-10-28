import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Register } from '@domain/user/register';
import { RegisterResponse } from '@domain/user/registerResponse';
import {InteractionDirective} from '@directives/EventListenerDirectives';

@Component({
  selector: 'tcc-register',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule, ReactiveFormsModule, InteractionDirective],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isPopupOpen = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cellphone: ['']
    });
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: Register = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response: RegisterResponse) => {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
          this.closePopup();

          location.reload();
        },
        error: (err) => {
          this.snackBar.open('Registration failed: ' + (err.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
        }
      });
    }
  }
}
