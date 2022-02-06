import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private http: HttpClient, @Inject('environment') private environment: any) { }

  //Get List of Fuels
  getListOfFuels(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.environment.apiURL + '/fuel');
  }
}
