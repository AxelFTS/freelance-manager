import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { ClientListPage } from './features/clients/pages/client-list-page/client-list-page';
import { ClientFormPage } from './features/clients/pages/client-form-page/client-form-page';
import { MainLayout } from './layout/components/main-layout/main-layout';
import { FactureListPage } from './features/factures/pages/facture-list-page/facture-list-page';
import { FactureFormPage } from './features/factures/pages/facture-form-page/facture-form-page';
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: DashboardPage },
      { path: 'clients', component: ClientListPage },
      { path: 'clients/new', component: ClientFormPage },
      { path: 'clients/:id/edit', component: ClientFormPage },
      { path: 'factures', component: FactureListPage },
      { path: 'factures/new', component: FactureFormPage },
      { path: 'factures/:id/edit', component: FactureFormPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
