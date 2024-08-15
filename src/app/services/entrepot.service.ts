import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrepot } from '../models/entrepot';
>>>>>>> origin/master

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
<<<<<<< HEAD

  constructor() { }
=======
  private baseUrl = 'http://localhost:8080/api/entrepots';

  constructor(private http: HttpClient) { }

  getEntrepots(): Observable<Entrepot[]> {
    return this.http.get<Entrepot[]>(`${this.baseUrl}`);
  }

  getEntrepotById(id: number): Observable<Entrepot> {
    return this.http.get<Entrepot>(`${this.baseUrl}/${id}`);
  }

  createEntrepot(entrepot: Entrepot): Observable<Entrepot> {
    return this.http.post<Entrepot>(`${this.baseUrl}`, entrepot);
  }

  updateEntrepot(id: number, entrepot: Entrepot): Observable<Entrepot> {
    return this.http.put<Entrepot>(`${this.baseUrl}/${id}`, entrepot);
  }

  deleteEntrepot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
>>>>>>> origin/master
}
