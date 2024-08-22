import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = `${environment.apiUrl}/notifications`;

   constructor(private http: HttpClient) { } 

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}`);
  }

  getNotificationsByUtilisateur(utilisateurId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  getNotificationsByEntrepot(entrepotId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/entrepot/${entrepotId}`);
  }

  countNotificationsByType(type: string,entrepotId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count?type=${type}&entrepotId=${entrepotId}`);
  }
  
  filterNotificationsByType(type: string, entrepotId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/filter?type=${type}&entrepotId=${entrepotId}`);
  } 
  
}
