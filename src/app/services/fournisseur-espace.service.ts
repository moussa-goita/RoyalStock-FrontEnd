import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fournisseur} from "../models/fournisseur";

@Injectable({
  providedIn: 'root'
})
export class FournisseurEspaceService {

  private baseUrl = 'http://localhost:8080/api/fournisseurs';

  constructor(private http: HttpClient) { }

  getFournisseurPublic(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/public`);

  }

  /*
  getFournisseursByNoteMoyenne(noteMoyenne: number): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/by-note?noteMoyenne=${noteMoyenne}`);
  }

  getFournisseursByNombreNotes(nombreNotes: number): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/by-nombre-notes?nombreNotes=${nombreNotes}`);
  }

*/

}
