import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = 'http://localhost:8080/api/fournisseurs';

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}`);
  }

  mettreFournisseurPublic(fournisseurId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${fournisseurId}/public`, {});
  }

  getFournisseursForCurrentUser(email: string): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/current?email=${email}`);
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.baseUrl}/${id}`);
  }

  createFournisseur(fournisseur: Fournisseur, email: string): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.baseUrl}/create?email=${email}`, fournisseur);
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.baseUrl}/${id}`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
    // Méthode pour noter un fournisseur
    noterFournisseur(id: number, note: number, commentaire: string): Observable<Fournisseur> {
      const url = `${this.baseUrl}/${id}/noter`;
      return this.http.post<Fournisseur>(url, { note, commentaire });
    }
}
