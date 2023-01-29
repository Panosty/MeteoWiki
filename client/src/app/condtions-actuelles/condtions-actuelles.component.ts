import { Component, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-condtions-actuelles',
  templateUrl: './condtions-actuelles.component.html',
  styleUrls: ['./condtions-actuelles.component.css']
})
export class CondtionsActuellesComponent implements OnInit {

  constructor(private _weatherService: WeatherService) { }
  public weathers: WttrObject[]=[];

  ngOnInit(): void {
    this._weatherService.data.subscribe({
      next: doneesMeteos => {
        console.log('conditions-actuelles component - data:', doneesMeteos)
        this.weathers=doneesMeteos
      }
    })

  }

}
