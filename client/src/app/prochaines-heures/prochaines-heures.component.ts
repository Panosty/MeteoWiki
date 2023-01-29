import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-prochaines-heures',
  templateUrl: './prochaines-heures.component.html',
  styleUrls: ['./prochaines-heures.component.css']
})
export class ProchainesHeuresComponent implements OnInit {

  constructor(private _weatherService: WeatherService) { }
  public weathers: WttrObject[]=[];


  ngOnInit(): void {
    this._weatherService.data.subscribe({
      next: doneesMeteos => {
        console.log('prochaines-heures component - data:', doneesMeteos)
        this.weathers=doneesMeteos
      }
    })

  }

}

