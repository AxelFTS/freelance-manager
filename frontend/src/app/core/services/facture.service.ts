import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  CreateFacture,
  Facture,
  StatutFacture,
} from '../../features/factures/models/facture.model';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private http = inject(HttpClient);
  private factures = signal<Facture[]>([]);
  private facture = signal<Facture | null>(null);
  private url = '/api/';

  getAllFactures(): Observable<Facture[]> {
    return this.http
      .get<Facture[]>(this.url + 'factures')
      .pipe(tap((facture) => this.factures.set(facture)));
  }

  getById(id: number): Observable<Facture> {
    return this.http
      .get<Facture>(this.url + 'factures/' + id)
      .pipe(tap((facture) => this.facture.set(facture)));
  }

  createFacture(facture: CreateFacture): Observable<Facture> {
    return this.http.post<Facture>(this.url + 'factures', facture);
  }

  updateFacture(id: number, facture: CreateFacture): Observable<Facture> {
    return this.http.put<Facture>(this.url + 'factures/' + id, facture);
  }

  deleteFacture(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'factures/' + id);
  }

  updateStatut(id: number, statut: StatutFacture): Observable<Facture> {
    return this.http.patch<Facture>(
      `${this.url}factures/${id}/statut?statut=${statut}`,
      null
    );
  }
}
