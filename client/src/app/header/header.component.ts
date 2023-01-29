import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public location: string= '';

  constructor(private _getWeathers: WeatherService, private _authentification:AuthService) { }
  updateLocation(){
    this._getWeathers.getWeathers(this.location).subscribe();
  }

  logout(){
    this._authentification.logout();
  }

  ngOnInit(): void {
  }

}


  