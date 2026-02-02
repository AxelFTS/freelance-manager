import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  signal,
  OnInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../models/client.model';
import { ClientService } from '../../../../core/services/client.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-client-list-page',
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './client-list-page.html',
  styleUrl: './client-list-page.scss',
})
export class ClientListPage implements AfterViewInit, OnInit {
  private clientService = inject(ClientService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  clients = signal<Client[]>([]);

  dataSource = new MatTableDataSource<Client>([]);

  displayedColumns: string[] = [
    'nom',
    'email',
    'telephone',
    'createdAt',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.dataSource.data = clients;
      },
      error: (err) => {
        console.error('Erreur', err);
      },
    });
  }

  newClient() {
    this.router.navigate(['/clients/new']);
  }

  editClient(id: number) {
    this.router.navigate(['/clients/' + id + '/edit']);
  }

  deleteClient(id: number) {
    if (confirm('Êtes-vous sûr ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
          this.notification.success(`Le client a été supprimé avec succès`);
        },
        error: (err) => {
          console.error(err);
          this.notification.error(
            err.error?.message || 'Une erreur est survenue'
          );
        },
      });
    }
  }
}
