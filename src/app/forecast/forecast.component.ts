import { Component, OnInit } from '@angular/core';

import { CityWeatherInfo } from '../shared/interfaces/city-weather-info.interfaces';
import { ForecastService } from 'src/core/api/forecast/forecast.service';
import { BreadcrumbLink } from '../shared/interfaces/breadcrumbs-links.interfaces';
import { forecastTypes } from './forecast-types.constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  city: string;
  forecast: CityWeatherInfo[] = [];
  forecastHistory: CityWeatherInfo[] = [];
  forecastBreadcrumbLinks: BreadcrumbLink[] = [];
  forecastDays: number;
  weatherInfo: CityWeatherInfo;
  isForecastHistoryEnabled: boolean=true;

  constructor(
    private activateRoute: ActivatedRoute,
    private forecastService: ForecastService
  ) {
    this.city = activateRoute.snapshot.params['city'];

    this.weatherInfo = {
      city: this.city,
      date: '',
      temp: '',
      isFavorite: false,
    };

    this.forecastDays = this.getForecastDays(
      activateRoute.snapshot.params['forecast']
    );

    this.forecastBreadcrumbLinks = [
      { link: '/', name: 'Home', isActive: false },
      { link: `/${this.city}/details`, name: 'Details', isActive: false },
      { link: `/${this.city}/details`, name: 'Forecast', isActive: true },
    ];
  }

  ngOnInit() {
    this.forecastService
      .getCurrentWeatherForecast(this.city, this.forecastDays)
      .subscribe((forecast) => (this.forecast = forecast));
  }

  openForecastHistory() {
    if (this.forecastHistory.length > 0) {
      return;
    }

    const periodDays = 7;

    this.forecastService.getHistoryWeatherForecast(this.city, this.getDatesRange(periodDays))
      .subscribe(forecastHistory => {
        this.isForecastHistoryEnabled = false;
        forecastHistory.forEach(historyItem => this.forecastHistory.push(historyItem));
      });
  }

  getForecastDays(type: string): number {
    return forecastTypes[type] ? forecastTypes[type] : forecastTypes.default;
  }

  private getDatesRange(periodDays : number) {
    const dayMilliseconds = 24*60*60*1000;

    return Array.from(Array(periodDays).keys())
      .map(x => x + 1)
      .map(days => {
        const now = new Date();
        now.setTime(now.getTime() - days * dayMilliseconds);
        return now;
      });
  }
}
