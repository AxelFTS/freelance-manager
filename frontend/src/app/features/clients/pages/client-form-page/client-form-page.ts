import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../../../core/services/client.service';
import { NotificationService } from '../../../../core/services/notification.service';
@Component({
  selector: 'app-client-form-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './client-form-page.html',
  styleUrl: './client-form-page.scss',
})
export class ClientFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);

  clientForm!: FormGroup;
  isEditMode = false;
  clientId: number | null = null;

  ngOnInit() {
    this.createForm();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.clientId = +id;
      this.loadClient(this.clientId);
    }
  }

  createForm() {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
    });
  }

  loadClient(id: number) {
    this.clientService.getById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/clients/']);
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;

      if (this.isEditMode) {
        this.clientService.updateClient(this.clientId!, clientData).subscribe({
          next: (client) => {
            this.router.navigate(['/clients']);
            this.notification.success(
              `Le client '${client.nom}' a été modifié avec succès`
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
        this.clientService.createClient(clientData).subscribe({
          next: (client) => {
            this.router.navigate(['/clients']);
            this.notification.success(
              `Le client '${client.nom}' a été créé avec succès`
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

  get nom() {
    return this.clientForm.get('nom');
  }

  get email() {
    return this.clientForm.get('email');
  }
}
