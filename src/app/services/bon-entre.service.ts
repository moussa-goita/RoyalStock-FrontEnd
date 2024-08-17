import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonEntree } from '../models/bon-entree';

@Injectable({
  providedIn: 'root'
})
export class BonEntreeService {
  private baseUrl = 'http://localhost:8080/api/bon-entrees';

  constructor(private http: HttpClient) {}

  createBonEntree(bonEntree: BonEntree, email: string): Observable<BonEntree> {
    const url = `${this.baseUrl}?email=${email}`;
    return this.http.post<BonEntree>(url, bonEntree);
  }

  getBonEntreesByEntrepots(entrepotId: number): Observable<BonEntree[]> {
    return this.http.get<BonEntree[]>(`${this.baseUrl}/entrepot/${entrepotId}`);
  }

  getBonEntreeById(id: number): Observable<BonEntree> { // Implémentation de la méthode
    return this.http.get<BonEntree>(`${this.baseUrl}/${id}`);
  }

  deleteBonEntree(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
