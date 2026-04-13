export interface StatsOverview {
  totalClients: number;
  totalFactures: number;
  totalFacturePayees: number;
  chiffreAffaireMois: number;
  chiffreAffairesAnnee: number;
  facturesEnAttente: number;
  montantEnAttente: number;
}

export interface CaMensuel {
  mois: number;
  montant: number;
}
