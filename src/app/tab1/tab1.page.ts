import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonIcon, IonCol, IonLabel, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { heart, heartOutline} from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../service/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule,FormsModule,HttpClientModule,IonRow, IonLabel, IonCol, IonIcon, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  cityName:string = "";
  weatherData:any = "";
  isLiked :boolean = false;

  constructor(private weatherService:WeatherService) {
    addIcons({ heart,heartOutline});
  }
  search(){
    this.weatherService.getWeatherByCity(this.cityName)
    .subscribe({
      next: (data) => {
        this.weatherData = data;
        this.checkIfLike();
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.weatherData = null;
      }
    });
  }
  toggleLike(){
    const favorites = this.getFavs();
    const cityKey = this.weatherData.name+","+this.weatherData.sys.country;
    if(this.isLiked){
      const updated = favorites.filter((item:any)=> item.key!==cityKey);
      localStorage.setItem('favorilerim', JSON.stringify(updated));
      this.isLiked = false;
    }else {
      favorites.push({
        key: cityKey,
        name: this.weatherData.name,
        country: this.weatherData.sys.country,
        temp: this.weatherData.main.temp,
        icon: this.weatherData.weather[0].icon
      });
      localStorage.setItem('favorilerim', JSON.stringify(favorites));
      this.isLiked = true;
    }
  }
  getFavs():any []{
    return JSON.parse(localStorage.getItem('favorilerim')|| '[]');
  }
  checkIfLike(){
    const favorites = this.getFavs();
    const cityKey = this.weatherData.name+","+this.weatherData.sys.country;
    this.isLiked = favorites.some((item:any)=> item.key===cityKey)
  }
}

