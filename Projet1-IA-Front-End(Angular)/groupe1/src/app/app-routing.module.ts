import { AvctheorieComponent } from './pages/avctheorie/avctheorie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvcComponent } from './pages/avc/avc.component';
import { HomeComponent } from './pages/home/home.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarstheorieComponent } from './pages/carstheorie/carstheorie.component';
import { MaskComponent } from './pages/mask/mask.component';
import { MasktheorieComponent } from './pages/masktheorie/masktheorie.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'avc', component: AvcComponent },
  { path: 'avctheorie', component: AvctheorieComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'carstheorie', component: CarstheorieComponent },
  { path: 'mask', component: MaskComponent },
  { path: 'masktheorie', component: MasktheorieComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
