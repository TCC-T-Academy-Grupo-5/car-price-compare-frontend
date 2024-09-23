import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { LikedComponent } from './pages/liked/liked.component';
import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';
import { VehicleAnalysisComponent } from './pages/vehicle-analysis/vehicle-analysis.component';
import { AlertComponent } from './pages/alert/alert.component';
import { VehicleCompareComponent } from './pages/vehicle-compare/vehicle-compare.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'liked', component: LikedComponent },
  { path: 'vehicle-detail', component: VehicleDetailComponent },
  { path: 'vehicle-analysis', component: VehicleAnalysisComponent },
  { path: 'alert', component: AlertComponent },
  { path: 'vehicle-compare', component: VehicleCompareComponent },
  { path: '**', redirectTo: '' },
];
