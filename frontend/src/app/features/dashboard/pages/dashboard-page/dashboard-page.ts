import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { StatsService } from '../../../../core/services/stats.services';
import { FactureService } from '../../../../core/services/facture.service';
import { StatsOverview, CaMensuel } from '../../models/stats.model';
import { Facture } from '../../../factures/models/facture.model';

const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

@Component({
  selector: 'app-dashboard-page',
  imports: [NgxChartsModule, CurrencyPipe, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private statsService = inject(StatsService);
  private factureService = inject(FactureService);
  private router = inject(Router);

  overview: StatsOverview | null = null;
  caMensuel: CaMensuel[] = [];
  dernieresFactures: Facture[] = [];

  // Format attendu par ngx-charts
  chartData: { name: string; series: { name: string; value: number }[] }[] = [];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3fb4ff', '#d2a8ff'],
  };

  ngOnInit(): void {
    const annee = new Date().getFullYear();

    this.statsService.getOverview().subscribe({
      next: (data) => (this.overview = data),
    });

    this.statsService.getCaMensuel(annee).subscribe({
      next: (data) => {
        this.caMensuel = data;
        this.chartData = [{
          name: 'CA Mensuel',
          series: data.map(item => ({
            name: MONTH_NAMES[item.mois - 1],
            value: Number(item.montant),
          })),
        }];
      },
    });

    this.factureService.getAllFactures().subscribe({
      next: (data) => (this.dernieresFactures = data.slice(0, 5)),
    });
  }

  goToFacture(id: number): void {
    this.router.navigate(['/factures', id]);
  }
}
