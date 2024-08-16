import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrepot } from '../models/entrepot';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
  private apiUrl = 'http://localhost:8080/api/entrepots'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer les entrepôts à proximité d'une localisation donnée
  getNearbyEntrepots(latitude: number, longitude: number, distance: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/nearby?latitude=${latitude}&longitude=${longitude}&distance=${distance}`);
  }

  // Récupérer tous les entrepôts avec leurs localisations
  getAllEntrepots(): Observable<Entrepot[]> {
    return this.http.get<Entrepot[]>(`${this.apiUrl}/location`);
  }
  
}
