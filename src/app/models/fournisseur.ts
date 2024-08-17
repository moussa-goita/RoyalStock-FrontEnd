import {Utilisateur} from "./utilisateur";
import {Entrepot} from "./entrepot";


export interface Fournisseur {
  id: number;
  fournName: string;
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
