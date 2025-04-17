import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItemOption, IonItemOptions, IonItem, IonItemSliding, IonIcon, IonListHeader } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { heart,sunny,arrowBack,thermometer,cloud,rainy,thunderstorm,partlySunny } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../service/weather.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule,IonListHeader, IonIcon, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {
  favorites : any [] = [];
  
  constructor(private weatherService:WeatherService) {
    addIcons({ heart,sunny,arrowBack,thermometer,cloud,rainy,thunderstorm,partlySunny });
  }
  ngOnInit(): void {
    this.loadFavs();
  }
  ionViewWillEnter(){
    this.loadFavs();
  }
  loadFavs(){
    const favs = localStorage.getItem('favorilerim');
    const savedFavs = favs?JSON.parse(favs): [];
    const updatedFavs :any[] = [];
    savedFavs.forEach((fav:any) => {
      const cityKey = fav.name+","+fav.country;
      this.weatherService.getWeatherByCity(cityKey)
      .subscribe({
        next:(data)=>{
          updatedFavs.push({
            key:cityKey,
            name:data.name,
            country:data.sys.country,
            icon:data.weather[0].icon,
            temp: data.main.temp
          });
          this.favorites = [...updatedFavs];
          localStorage.setItem('favorilerim', JSON.stringify(this.favorites));
        }
      });
    });
  }
  removeFav(cityKey:string){
    this.favorites = this.favorites.filter((fav) => fav.key!==cityKey);
    localStorage.setItem('favorilerim',JSON.stringify(this.favorites));
  }

}
