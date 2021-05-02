import { LoaderComponent } from './../../loader/loader.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-avc',
  templateUrl: './avc.component.html',
  styleUrls: ['./avc.component.scss']
})


export class AvcComponent implements OnInit {

  

  fg: FormGroup;

  response: number;
  
  

  constructor(
    private httpClient: HttpClient,
    private dialog: NbDialogService
  ) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      age: new FormControl(null, [Validators.max(100), Validators.min(1), Validators.required]),
      sexe: new FormControl(null, [Validators.required]),
      hypertension: new FormControl(false , [Validators.required]),
      maladie_cardiaque: new FormControl(false , [Validators.required]),
      taux_glucose: new FormControl(null , [Validators.min(1), Validators.max(1000),Validators.required]),
      IMC: new FormControl(null , [ Validators.min(15), Validators.max(45),Validators.required]),
      fumeur_statut: new FormControl(4 , [Validators.required]),
      
    });

    
  }

  submit() {
    const values = this.fg.value;
    let params = new HttpParams();
    params = params.append('sexe', values.sexe);
    params = params.append('age', values.age);
    params = params.append('hypertension', values.hypertension)
    params = params.append('maladie_cardiaque', values.maladie_cardiaque)
    params = params.append('taux_glucose', values.taux_glucose)
    params = params.append('IMC', values.IMC)
    params = params.append('fumeur_statut', values.fumeur_statut)
    let ref = this.dialog.open(LoaderComponent);
    this.httpClient.get<number>('http://localhost:4000/calculate', {params}).subscribe(data => {
      this.response = data;
      ref.close();
    });
  }

  options = [
    { value: 1, label: 'Female' },
    { value: 2, label: 'Male' },
    { value: 3, label: 'Other' }, 
  ];
 

  optionsSmoke = [
    { value: 1, label: 'smokes' },
    { value: 2, label: 'never smokes' },
    { value: 3, label: 'formely smoke' }, 
    { value: 4, label: 'unknown' },
  ];
  
  

}
