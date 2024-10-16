import { Routes } from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {VehicleComponent} from '@pages/vehicle/vehicle.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, children: [
      { path: 'vehicles', component: VehicleComponent }
    ]}
];
