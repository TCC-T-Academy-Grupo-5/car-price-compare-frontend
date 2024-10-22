import { Routes } from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {VehiclesComponent} from '@pages/vehicle/vehicles/vehicles.component';
import {VehicleDetailsComponent} from '@pages/vehicle-details/vehicle-details.component';
import {ModelsComponent} from '@pages/vehicle/models/models.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  { path: 'models', component: ModelsComponent },
  {path: 'vehicle-details/:vehicleId', component: VehicleDetailsComponent},
];
