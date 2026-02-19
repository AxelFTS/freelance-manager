import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { FactureService } from '../../../../core/services/facture.service';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { Client } from '../../../clients/models/client.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-facture-form-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
  ],
  templateUrl: './facture-form-page.html',
  styleUrl: './facture-form-page.scss',
})
export class FactureFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private factureService = inject(FactureService);
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);

  factureForm!: FormGroup;
  isEditMode = false;
  factureId: number | null = null;
  clients: Client[] = [];

  ngOnInit() {
    this.createForm();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.factureId = +id;
      this.loadFacture(this.factureId);
      this.factureForm.get('clientId')?.disable();
    }

    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
    });
  }

  loadFacture(id: number) {
    this.factureService.getById(id).subscribe({
      next: (facture) => {
        this.factureForm.patchValue({
          ...facture,
          dateFacture: new Date(facture.dateFacture),
          dateEcheance: new Date(facture.dateEcheance),
        });
        this.lignes.clear();
        facture.lignes.forEach((ligne) => {
          this.lignes.push(
            this.fb.group({
              description: [ligne.description],
              quantite: [ligne.quantite],
              prixUnitaire: [ligne.prixUnitaire],
              montantLigne: [{ value: ligne.montantLigne, disabled: true }],
            })
          );
        });
      },
    });
  }

  createForm() {
    this.factureForm = this.fb.group({
      clientId: ['', Validators.required],
      dateFacture: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      tauxTVA: [20, Validators.required],
      notes: [''],
      lignes: this.fb.array([]),
    });
    this.addLigne();
  }

  createLigne(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      montantLigne: [{ value: 0, disabled: true }],
    });
  }

  get lignes(): FormArray {
    return this.factureForm.get('lignes') as FormArray;
  }

  addLigne() {
    this.lignes.push(this.createLigne());
  }

  removeLigne(index: number) {
    if (this.lignes.length > 1) {
      this.lignes.removeAt(index);
    }
  }

  updateMontantLigne(index: number) {
    const ligne = this.lignes.at(index) as FormGroup;
    const quantite = ligne.get('quantite')?.value;
    const prixUnitaire = ligne.get('prixUnitaire')?.value;
    ligne.get('montantLigne')?.setValue(quantite * prixUnitaire);
  }

  onCancel() {
    this.router.navigate(['/factures/']);
  }

  onSubmit() {
    if (this.factureForm.valid) {
      const raw = this.factureForm.getRawValue();
      const factureData = {
        ...raw,
        dateFacture: new Date(raw.dateFacture).toISOString().split('T')[0],
        dateEcheance: new Date(raw.dateEcheance).toISOString().split('T')[0],
      };
      if (this.isEditMode) {
        this.factureService
          .updateFacture(this.factureId!, factureData)
          .subscribe({
            next: (facture) => {
              this.router.navigate(['/factures']);
              this.notification.success(
                `La facture '${facture.numero} lié au client : '${facture.clientNom} a été modifié avec succès'`
              );
            },
            error: (err) => {
              console.error(err);
              this.notification.error(
                err.error?.message || 'Une erreur est survenue'
              );
            },
          });
      } else {
        this.factureService.createFacture(factureData).subscribe({
          next: (facture) => {
            this.router.navigate(['/factures']);
            this.notification.success(
              `La facture '${facture.numero} lié au client : '${facture.clientNom} a été créée avec succès'`
            );
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

  get totalHT(): number {
    return this.lignes.controls.reduce((sum, ctrl) => {
      return sum + (ctrl.get('montantLigne')?.value || 0);
    }, 0);
  }

  get montantTVA(): number {
    return (this.totalHT * this.factureForm.get('tauxTVA')?.value) / 100;
  }

  get totalTTC(): number {
    return this.montantTVA + this.totalHT;
  }
}
