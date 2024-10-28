import { Routes } from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {VehiclesComponent} from '@pages/vehicle/vehicles/vehicles.component';
import {VehicleDetailsComponent} from '@pages/vehicle/vehicle-details/vehicle-details.component';
import {ModelsComponent} from '@pages/vehicle/models/models.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  { path: 'models/:brandId', component: ModelsComponent },
  {path: 'vehicle-details/:vehicleId', component: VehicleDetailsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];
