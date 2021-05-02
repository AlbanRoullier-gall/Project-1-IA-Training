import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements OnInit {

  image: any;

  objectURL: any;


  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

  }

  fileChange($event) {

    this.image = $event.target.files[0];

    console.log(this.image)
  }

  submit(){
    let formData = new FormData();

    formData.append("image", this.image, this.image.name);

    this.http.post('http://localhost:4000/mask', formData, { responseType: 'blob' }).subscribe(data => {
      this.objectURL = URL.createObjectURL(data);
      this.objectURL = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
    })
  }

}
