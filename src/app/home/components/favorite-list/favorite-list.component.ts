import { Component, OnInit } from '@angular/core';

import { CityWeatherInfo } from 'src/app/shared/interfaces/city-weather-info.interfaces';
import { FavoriteStateService } from 'src/core/favorites-state/favorite-state.service';
import { NotificationService } from 'src/core/api/notification/notification.service';
import { StorageService } from 'src/core/storage/storage.service';
import { FavoriteService } from 'src/core/favorite/favorite.service';
import { NotificationType } from 'src/app/shared/enums/notification.enum';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  providers: [FavoriteStateService, StorageService],
})
export class FavoriteListComponent implements OnInit  {

  favorites: CityWeatherInfo[] = [];
  constructor(private favoriteService: FavoriteService, private notificationService : NotificationService) {
  }

  ngOnInit(){
    this.favoriteService.favoritesNames.map( city => {
      this.favoriteService.getCurrentWeatherForecast(city, 1)
      .subscribe((city) => {
        this.favorites.push(city);
      });
    });
    console.log(this.favorites);
    if(this.favoriteService.checkAmountOfFavorites()){
      this.notificationService.show( NotificationType.Error ,'Your can add only 10 cities to your list of favorites')
    }
  }

}
