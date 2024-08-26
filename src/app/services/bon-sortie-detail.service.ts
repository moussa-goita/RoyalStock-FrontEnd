import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailSortie } from '../models/detail-sortie';

@Injectable({
  providedIn: 'root'
})
export class BonSortieDetailService {
  private apiUrl = "https://192.168.123.35:8443/api/details-sorties";

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
