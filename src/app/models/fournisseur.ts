import { Entrepot } from "./entrepot";
import { Utilisateur } from "./utilisateur";


export interface Fournisseur {
isPublic: any;
  id: number;
  four_name: string;
  adresse?: string;
  telephone?: string;
  createdBy: Utilisateur;
  entrepot: Entrepot;
  statut: Statut;
  noteMoyenne?: number;
  nombreNotes?: number;
  email?: string;
  commentaire?: string;
  service?: string;
}

export enum Statut {
  PRIVE = 'PRIVE',
  PUBLIC = 'PUBLIC'
}
