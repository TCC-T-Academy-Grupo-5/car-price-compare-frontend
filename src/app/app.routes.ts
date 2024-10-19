import { Routes } from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {VehiclesComponent} from '@pages/vehicle/vehicles/vehicles.component';
import {ModelsComponent} from '@pages/vehicle/models/models.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  { path: 'models', component: ModelsComponent }
];
