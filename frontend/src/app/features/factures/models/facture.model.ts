// Enum pour le statut de la facture
export type StatutFacture = 'BROUILLON' | 'ENVOYEE' | 'PAYEE' | 'ANNULEE';

// Interface pour une ligne de facture (lecture)
export interface LigneFacture {
  id: number;
  description: string;
  quantite: number;
  prixUnitaire: number;
  montantLigne: number;
}

// Interface pour une facture complète (lecture)
export interface Facture {
  id: number;
  numero: string;
  dateFacture: string;
  dateEcheance: string;
  statut: StatutFacture;
  clientId: number;
  clientNom: string;
  lignes: LigneFacture[];
  montantHT: number;
  tauxTVA: number;
  montantTVA: number;
  montantTTC: number;
  notes: string | null;
  createdAt: string;
}

// Interface pour créer/modifier une ligne de facture
export interface CreateLigneFacture {
  description: string;
  quantite: number;
  prixUnitaire: number;
  montantLigne: number;
}

// Interface pour créer/modifier une facture
export interface CreateFacture {
  clientId: number;
  dateFacture: string;
  dateEcheance: string;
  tauxTVA: number;
  notes: string | null;
  lignes: CreateLigneFacture[];
}
