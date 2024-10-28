import { Routes } from '@angular/router';
import {HomeComponent} from '@components/pages/home/home.component';
import {VehiclesComponent} from '@components/pages/vehicles/vehicles.component';
import {VehicleDetailsComponent} from '@components/pages/vehicle-details/vehicle-details.component';
import {ModelsComponent} from '@components/pages/models/models.component';
import { ProfileComponent } from '@components/pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  { path: 'models/:brandId', component: ModelsComponent },
  {path: 'vehicle-details/:vehicleId', component: VehicleDetailsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];
