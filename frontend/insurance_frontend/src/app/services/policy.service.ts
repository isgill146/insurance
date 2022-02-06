import { Inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient, @Inject('environment') private environment: any) { }

  getAllpolicies(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.environment.apiURL+'/api/v1/policy');
  }

}
