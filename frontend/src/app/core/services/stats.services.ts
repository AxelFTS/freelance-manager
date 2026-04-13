import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CaMensuel,
  StatsOverview,
} from '../../features/dashboard/models/stats.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private http = inject(HttpClient);
  private url = '/api/stats/';

  getOverview(): Observable<StatsOverview> {
    return this.http.get<StatsOverview>(this.url + 'overview');
  }

  getCaMensuel(annee: number): Observable<CaMensuel[]> {
    return this.http.get<CaMensuel[]>(this.url + 'ca-mensuel', {
      params: { annee },
    });
  }
}
