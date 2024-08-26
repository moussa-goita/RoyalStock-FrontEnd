import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = "https://192.168.1.37:8443/api/utilisateurs";;
  constructor(private http: HttpClient) { }

  getStockInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stock-info`);
  }
}
