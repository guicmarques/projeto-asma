import { Fitbit } from './../models/fitbit.model';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private authService: AuthService) { }

  getSensorData(date: string, category: string) {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post<Fitbit>(this.env.API_URL + 'fitbit/', {'date': date, 'category': category}, { headers: header })
        .subscribe(data =>{
          console.log(data);
          resolve(data);
        }, error =>{
          console.log(error);
          reject(error);
        })
      })
    })
  }
  
}
