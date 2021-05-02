import { UpperCasePipe } from '@angular/common';
import { LoaderComponent } from './../../loader/loader.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  fg: FormGroup;

  response: number;

  carModels: Object;
  


 
  constructor(
    private httpClient: HttpClient,
    private dialog: NbDialogService
  ) { }

  ngOnInit(): void {
    this.carModels = {
      'Audi':['A1', 'A2', 'A3', 'A4',' A5','Q3', ' Q5',' S4', ' Q2',
              ' A7', ' TT', ' Q7', ' RS6', ' RS3', ' A8', ' Q8', ' RS4', ' RS5',
              ' R8', ' SQ5', ' S8', ' SQ7', ' S3', ' S5',' RS7'],
      'BMW': [ '5 Series', ' 6 Series', ' 1 Series', ' 7 Series', ' 2 Series',
              ' 4 Series', ' X3', ' 3 Series', ' X5', ' X4', ' i3', ' X1', ' M4',
               ' X2', ' X6', ' 8 Series', ' Z4', ' X7', ' M5', ' i8', ' M2',
               ' M3', ' M6', ' Z3'],
      'Mercedes': [' SLK', ' S Class', ' SL CLASS', ' G Class',
                    ' GLE Class', ' GLA Class', ' A Class', ' B Class', ' GLC Class',
                    ' C Class', ' E Class', ' GL Class', ' CLS Class', ' CLC Class',
                  ' CLA Class', ' V Class', ' M Class', ' CL Class', ' GLS Class',
                  ' GLB Class', ' X-CLASS', '180', ' CLK', ' R Class', '230', '220',
                  '200'],
     'Ford':    [' Focus', ' Fiesta', ' Puma', ' Kuga', ' EcoSport',
                ' C-MAX', ' Mondeo', ' Ka+', ' Tourneo Custom', ' S-MAX', ' B-MAX',
                ' Edge', ' Tourneo Connect', ' Grand C-MAX', ' KA', ' Galaxy',
                ' Mustang', ' Grand Tourneo Connect', ' Fusion', ' Ranger',
                ' Streetka', ' Escort', ' Transit Tourneo'] ,
     'Hyundai': [ ' I20', ' Tucson',
                ' I10', ' IX35', ' I30', ' I40', ' Ioniq', ' Kona', ' Veloster',
                ' I800', ' IX20', ' Santa Fe', ' Accent', ' Terracan', ' Getz',
                 ' Amica'],
     'Skoda':   [' Octavia', ' Citigo', ' Yeti Outdoor', ' Superb',
                ' Kodiaq', ' Rapid', ' Karoq', ' Fabia', ' Yeti', ' Scala',
                ' Roomster', ' Kamiq'],
     'Toyota':  [' GT86', ' Corolla', ' RAV4', ' Yaris',
                ' Auris', ' Aygo', ' C-HR', ' Prius', ' Avensis', ' Verso',
                ' Hilux', ' PROACE VERSO', ' Land Cruiser', ' Supra', ' Camry',
                ' Verso-S', ' IQ', ' Urban Cruiser'],    
      'Opel':   [ ' Corsa', ' Astra', ' Viva',
                ' Mokka', ' Mokka X', ' Crossland X', ' Zafira', ' Meriva',
                ' Zafira Tourer', ' Adam', ' Grandland X', ' Antara', ' Insignia',
                ' Ampera', ' GTC', ' Combo Life', ' Vivaro', ' Cascada', ' Kadjar',
                ' Agila', ' Tigra', ' Vectra'] ,  
    'Volkswagen': [' T-Roc', ' Golf', ' Passat',' T-Cross', ' Polo', ' Tiguan', ' Sharan', ' Up', ' Scirocco',
                  ' Beetle', ' Caddy Maxi Life', ' Caravelle', ' Touareg', ' Arteon',
                  ' Touran', ' Golf SV', ' Amarok', ' Tiguan Allspace', ' Shuttle',
                  ' Jetta', ' CC', ' California', ' Caddy Life', ' Caddy',
                  ' Caddy Maxi', ' Eos', ' Fox'],  

    }





    this.fg= new FormGroup({
      year: new FormControl(null),
      kilometers: new FormControl(null),
      tax: new FormControl(null),
      l_100km: new FormControl(null),
      engineSize: new FormControl(null),
      marque: new FormControl(null),
      model: new FormControl(null),
      gasoil: new FormControl(null,[Validators.required]),
      transmission: new FormControl(null),
    });

    this.fg.get('marque').valueChanges.subscribe(() => {
      this.fg.get('model').setValue(null);
    });

  }


  submit() {
    const values = this.fg.value;
    let params = new HttpParams();
    params = params.append('year', values.year);
    params = params.append('kilometers', values.kilometers);
    params = params.append('tax', values.tax);
    params = params.append('l_100km', values.l_100km);
    params = params.append('engineSize', values.engineSize);
    params = params.append('model', values.model.trim());
    params = params.append('gasoil', values.gasoil);
    params = params.append('transmission', values.transmission);
    let ref = this.dialog.open(LoaderComponent);
    this.httpClient.get<number>('http://localhost:4000/estimatecar', {params}).subscribe(data => {
      this.response = data;
      ref.close();
    });
  }

 
  

  options = [
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Other', label: 'Other' },

  ];

  transmissions = [
    { value: 'Manual', label: 'Manual' },
    { value: 'Automatic', label: 'Automatic' },
    { value: 'Semi-Auto', label: 'Semi-Auto' },
    { value: 'Other', label: 'Other' },

  ];




}
