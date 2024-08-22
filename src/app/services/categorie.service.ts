import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'https://192.168.1.14:8443/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  getCategoriesForCurrentUser(email: string): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/current?email=${email}`);
  }

  createCategorie(name: string, email: string): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/create?email=${email}`, { name });
  }
  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // createCategorie(categorie: Categorie): Observable<Categorie> {
  //   return this.http.post<Categorie>(this.apiUrl, categorie);
  // }

  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${id}`, categorie);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
