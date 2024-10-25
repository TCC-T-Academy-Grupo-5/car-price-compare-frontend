import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { UserProfile } from '@domain/user/userProfile';
import { Rating } from '@domain/user/rating';
import { Favorites } from '@domain/user/favorite';

@Component({
  selector: 'tcc-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  userForm: FormGroup;
  ratings: Rating[] = [];
  favorites: Favorites[] = [];
  user: UserProfile | undefined;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      cellphone: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
        this.favorites = data.favorites as unknown as Favorites[];
        this.ratings = data.rating;
        console.log(this.user);
        this.userForm.patchValue(data);
      },
      (error) => {
        console.error('Failed to load user info', error);
      }
    );
  }

  editUserInfo() {
    this.isEditing = !this.isEditing;
  }

  // TODO: Update user profile
  updateUserProfile() {
    const updatedUser = this.userForm.value;
    
  }
}
