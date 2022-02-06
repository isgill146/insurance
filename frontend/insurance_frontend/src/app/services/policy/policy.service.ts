import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient, @Inject('environment') private environment: any) { }


  //Get Monthly Policy Count For Bar Chart, Query params -  region name
  getMonthlyPolicyCount(param: any): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.environment.apiURL + '/policy/count', { params: param });
  }

  //Get List of Policies, Query params - pageIndex, pageSize for pagination and search (based on customerID and policyID)
  getListOfPolicies(param: any): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.environment.apiURL + '/policy', { params: param });
  }


  //Update a policy 
  updatePolicy(body: any): Observable<any> {
    // @ts-ignore
    return this.http.put(this.environment.apiURL + '/policy', body)
  }
}
