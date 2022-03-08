import { Component, OnInit } from '@angular/core';

import { ForecastInfo } from '../shared/interfaces/forecast-info.interfaces';
import { ICityWeatherInfo } from '../shared/interfaces/city-weather-info.interfaces';
import { ForecastService } from 'src/core/api/forecast/forecast.service';
import { CurrentWeatherData } from '../../core/api/weather/current-weather.type';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  weatherInfo: ICityWeatherInfo = {
    city: 'Kiev, Ukraine',
    date: '',
    temp: '',
    isFavorite: false,
  };

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.forecastService
      .getCurrentWeatherForecast()
      .subscribe(({ city }: CurrentWeatherData) => {
        this.weatherInfo.city = city;
      });
  }

  forecast: ForecastInfo[] = [
    {
      date: 'Feb 7th, 2022',
      weatherIcon: 'string',
      minTemp: '0 °С',
      maxTemp: '4 °С',
      weatherLabel: 'Light snow',
      wind: '2 km/h',
      humidity: '70%',
    },
    {
      date: 'Feb 7th, 2022',
      weatherIcon: 'string',
      minTemp: '0 °С',
      maxTemp: '4 °С',
      weatherLabel: 'Light snow',
      wind: '2 km/h',
      humidity: '70%',
    },
    {
      date: 'Feb 7th, 2022',
      weatherIcon: 'string',
      minTemp: '0 °С',
      maxTemp: '4 °С',
      weatherLabel: 'Light snow',
      wind: '2 km/h',
      humidity: '70%',
    },
  ];
}
