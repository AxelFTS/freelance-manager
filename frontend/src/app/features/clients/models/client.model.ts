export interface Client {
  id: number;
  nom: string;
  email: string;
  adresse: string | null;
  telephone: string | null;
  createdAt: string;
}

export interface ClientForm {
  nom: string;
  email: string;
  adresse: string | null;
  telephone: string | null;
}
