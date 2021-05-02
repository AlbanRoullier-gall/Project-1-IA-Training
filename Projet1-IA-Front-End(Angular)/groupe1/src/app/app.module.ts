import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbCardModule, NbInputModule, NbCheckboxModule, NbButtonModule, NbRadioModule, NbIconModule, NbStepperModule, NbSelectModule, NbActionsModule, NbDialogService, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './pages/home/home.component';
import { AvcComponent } from './pages/avc/avc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AvctheorieComponent } from './pages/avctheorie/avctheorie.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarstheorieComponent } from './pages/carstheorie/carstheorie.component';
import { MaskComponent } from './pages/mask/mask.component';
import { MasktheorieComponent } from './pages/masktheorie/masktheorie.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AvcComponent,
    AvctheorieComponent,
    CarsComponent,
    CarstheorieComponent,
    MaskComponent,
    MasktheorieComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    HttpClientModule,
    NbRadioModule,
    NbIconModule,
    NbStepperModule,
    NbSelectModule,
    NbActionsModule,
    NbDialogModule.forRoot()
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
