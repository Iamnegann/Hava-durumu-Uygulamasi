import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl ="https://api.openweathermap.org/data/2.5/";
  private apiKey = "bd9bfceae0862088910d521d18e6008b";

  constructor(private http: HttpClient) { }
  getWeatherByCity(city:string): Observable<any>{
    const url = this.baseUrl+'weather?q='+city+'&appid='+this.apiKey+'&units=metric&lang=tr';
    return this.http.get(url);  
  }
  getForecasts(lat:number,lon:number): Observable <any>{
    const url = this.baseUrl+'forecast?lat='+lat+'&lon='+lon+'&appid='+this.apiKey+'&units=metric&lang=tr';
    return this.http.get(url); 
  }
  getCurrentWeather(lat:number,lon:number): Observable<any>{
    const url = this.baseUrl+'weather?lat='+lat+'&lon='+lon+'&appid='+this.apiKey+'&units=metric&lang=tr';
    return this.http.get(url); 
  }
}
