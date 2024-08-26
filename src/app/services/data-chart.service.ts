import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataChartService {
  
  private apiUrl = 'https://192.168.1.37:8443/api/stats';

  constructor(private http: HttpClient) { }

  getTrends(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trends`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getSalesByCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/salesByCategory`);
  }
}