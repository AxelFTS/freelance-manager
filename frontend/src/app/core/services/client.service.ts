import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Client, ClientForm } from '../../features/clients/models/client.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private clients = signal<Client[]>([]);
  private client = signal<Client | null>(null);
  readonly url = '/api/';

  getAllClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.url + 'clients')
      .pipe(tap((client) => this.clients.set(client)));
  }

  getById(id: number): Observable<Client> {
    return this.http
      .get<Client>(this.url + 'clients/' + id)
      .pipe(tap((client) => this.client.set(client)));
  }

  createClient(client: ClientForm): Observable<Client> {
    return this.http.post<Client>(this.url + 'clients', client);
  }

  updateClient(id: number, client: ClientForm): Observable<Client> {
    return this.http.put<Client>(this.url + 'clients/' + id, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'clients/' + id);
  }
}
