import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import { WEATHER_COLORS } from '../constants/constants';
declare var Skycons:any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "km/h";
    currentTempUnit = "celcius";
    currentLocation: string;
    icons=new Skycons();
    dataReceived =false;

    constructor(private service: WeatherService) {

    }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    }
    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.icon = weather["currently"]["icon"];
                this.weatherData.summary = weather["currently"]["summary"];
                this.setIcon();
                this.dataReceived=true;
                console.log("Weather", this.weatherData);//TODO REMOVE
            },
            err => console.error(err));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location)//TODO REMOVE
                this.currentLocation = location.results[1].address_components["0"].long_name + ", " + location.results[2].address_components[3].short_name;
                console.log(this.currentLocation)//TODO REMOVE
            })
    }

    toggleTempUnits() {
        if (this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celcius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }
    toggleSpeedUnits() {
        if (this.currentSpeedUnit == "km/h") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "km/h";
        }
    }

    setIcon(){
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object {
        if(this.weatherData.icon){
            this.icons.color=WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color=WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
}