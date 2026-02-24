import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture, StatutFacture } from '../../models/facture.model';
import { FactureService } from '../../../../core/services/facture.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-facture-detail-page',
  imports: [MatButtonModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './facture-detail-page.html',
  styleUrl: './facture-detail-page.scss',
})
export class FactureDetailPage implements OnInit {
  private factureService = inject(FactureService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  facture: Facture | null = null;
  factureid: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.factureid = +id;
    this.factureService.getById(id).subscribe({
      next: (facture) => {
        this.facture = facture;
      },
    });
  }

  goBack() {
    this.router.navigate(['/factures']);
  }

  goToEdit() {
    this.router.navigate([`/factures/${this.factureid}/edit`]);
  }

  changeStatut(statut: StatutFacture) {
    this.factureService.updateStatut(this.factureid!, statut).subscribe({
      next: (facture) => {
        this.facture = facture;
        this.notification.success(`Statut mis à jour : ${facture.statut}`);
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
