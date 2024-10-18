import { Routes } from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {VehiclesComponent} from '@pages/vehicles/vehicles.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent}
];
