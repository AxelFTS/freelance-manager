import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { DatePipe, CurrencyPipe, NgClass } from '@angular/common';
import { FactureService } from '../../../../core/services/facture.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { Facture, StatutFacture } from '../../models/facture.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-facture-list-page',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgClass,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './facture-list-page.html',
  styleUrl: './facture-list-page.scss',
})
export class FactureListPage implements AfterViewInit, OnInit {
  private factureService = inject(FactureService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  factures = signal<Facture[]>([]);

  dataSource = new MatTableDataSource<Facture>([]);

  displayedColumns: string[] = [
    'numero',
    'client',
    'date',
    'echeance',
    'montantTTC',
    'statut',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadFactures();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFactures() {
    this.factureService.getAllFactures().subscribe({
      next: (factures) => {
        this.factures.set(factures);
        this.dataSource.data = factures; // Important pour le tableau
      },
      error: (err) => {
        console.error('Erreur', err);
      },
    });
  }

  filterByStatut(statut: StatutFacture | '') {
    if (!statut) {
      this.dataSource.data = this.factures();
    } else {
      this.dataSource.data = this.factures().filter((f) => f.statut === statut);
    }
  }

  newFacture() {
    this.router.navigate(['/factures/new']);
  }

  viewFacture(id: number) {
    this.router.navigate(['/factures/' + id]);
  }

  editFacture(id: number) {
    this.router.navigate(['/factures/' + id + '/edit']);
  }

  deleteFacture(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      this.factureService.deleteFacture(id).subscribe({
        next: () => {
          this.loadFactures();
          this.notification.success('La facture a été supprimée avec succès');
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
