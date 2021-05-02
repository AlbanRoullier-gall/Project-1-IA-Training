import { Component } from '@angular/core';
import { NbIconLibraries, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
  }

  state: string = 'compacted'
  items: NbMenuItem[] = [
    { title: 'Home', icon:  { icon: 'home' }, link: '/home' },
    { title: 'Project', icon: 'calendar', children: [
      {title: 'Stroke', icon:'activity-outline',children:[
        { title: 'Stroke test', link: '/avc' },
        { title: 'Stroke course', link: '/avctheorie' },
      ]},
      {title: 'Cars', icon:'car-outline', children:[
        { title:'Cars test', link: '/cars'},
        { title: 'Cars course', link: '/carstheorie'}
      ]},
      {title: 'Mask', icon:'smiling-face-outline', children:[
        { title:'Mask test', link: '/mask'},
        { title: 'Mask course', link: '/masktheorie'}
      ]} 
    ] }
  ];

  toggle(){
    if(this.state === 'compacted') {
      this.state = 'expanded';
    }
    else{
      this.state = 'compacted'
    }
  }
}
