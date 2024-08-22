import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { AuthService } from './auth.service';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUtilisateursByUserOrEntrepot(email: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/current?email=${email}` );
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl);
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }

  createAdmin(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/admin`, utilisateur);
  }
  createManager(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/manager`, utilisateur);
  }
  createVendeur(utilisateur: Utilisateur, managerId: number): Observable<Utilisateur> {
    const payload = { ...utilisateur, managerId };
    return this.http.post<Utilisateur>(`${this.baseUrl}/vendeur`, payload);
  }

  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${id}`, utilisateur)
      .pipe(catchError(this.handleError));
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error(error.error?.message || 'An error occurred'));
  }
}
