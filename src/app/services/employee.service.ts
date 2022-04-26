import { Employee } from './../model/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string;


  constructor(private http: HttpClient,) {
    this.baseUrl = environment.apiRoot;
  }

  getEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.baseUrl + "/getEmployees");
  }
}
