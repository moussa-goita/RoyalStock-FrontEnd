import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailSortie } from '../models/detail-sortie';

@Injectable({
  providedIn: 'root'
})
export class BonSortieDetailService {
  private apiUrl = `${environment.apiUrl}/details-sorties`;

  constructor(private http: HttpClient) { }

  getDetailSorties(): Observable<DetailSortie[]> {
    return this.http.get<DetailSortie[]>(this.apiUrl);
  }

  getDetailSortieById(id: number): Observable<DetailSortie> {
    return this.http.get<DetailSortie>(`${this.apiUrl}/${id}`);
  }

  createDetailSortie(detailSortie: DetailSortie): Observable<DetailSortie> {
    return this.http.post<DetailSortie>(this.apiUrl, detailSortie);
  }

  updateDetailSortie(id: number, detailSortie: DetailSortie): Observable<DetailSortie> {
    return this.http.put<DetailSortie>(`${this.apiUrl}/${id}`, detailSortie);
  }

  deleteDetailSortie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
