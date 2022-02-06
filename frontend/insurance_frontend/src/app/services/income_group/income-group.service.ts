import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeGroupService {

  constructor(private http: HttpClient, @Inject('environment') private environment: any) { }


  //Get List of Income Group Range
  getListOfIncomeGroups(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.environment.apiURL + '/income-group');
  }
}

