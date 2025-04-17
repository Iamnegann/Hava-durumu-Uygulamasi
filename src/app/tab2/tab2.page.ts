import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonLabel, IonIcon, IonList, IonButton, IonListHeader, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { sunny,arrowBack,thermometer,cloud,rainy,thunderstorm,partlySunny } from 'ionicons/icons';
import { WeatherService } from '../service/weather.service';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule,IonItem, IonListHeader, IonButton, IonList, IonIcon, IonLabel, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  city:string = '';
  country:string = '';
  temp:number = 0;
  description:string = '';
  windSpeed : number = 0;
  windDeg : number = 0;
  icon : string = '';
  humidity: number = 0;
  forecasts : any[] = [];

  constructor(private weatherService:WeatherService) {
    addIcons({ sunny,arrowBack,thermometer,cloud,rainy,thunderstorm,partlySunny });
  }
  async ngOnInit() {
   try{
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;
    this.getCurrentWeather(lat,lon);
    this.getForeCasts(lat,lon);
   }catch(error){
    console.log('Konum Erişlemedi:'+error);
   }
    
  }
  updateCurrentWeatherData(data:any){
    this.city = data.name;
    this.country = data.sys.country;
    this.temp = data.main.temp;
    this.humidity = data.main.humidity;
    this.windSpeed = data.wind.speed;
    this.windDeg = data.wind.deg;
    this.description = data.weather[0].description;
    this.icon = data.weather[0].icon;
  }
  updateForecastData(data:any){
    this.forecasts = data.list.filter((item:any)=> 
    item.dt_txt.includes('12:00:00'));
    console.log(this.forecasts);
  }
  getCurrentWeather(lat:number,lon:number){
    this.weatherService.getCurrentWeather(lat,lon)
    .subscribe(
      {
        next: (data) => this.updateCurrentWeatherData(data),
        error:(error) => console.error(error)
      });
  }
  getForeCasts(lat:number,lon:number){
    this.weatherService.getForecasts(lat,lon)
    .subscribe({
      next: (data) => this.updateForecastData(data),
      error: (error) => console.log(error)  
    })
  }

  getCurrentDayName():string{
    return new Date()
    .toLocaleDateString('tr-TR', {weekday:'long'});
  }

}
