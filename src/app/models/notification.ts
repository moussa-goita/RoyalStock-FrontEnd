import { Produit } from "./produit";

export interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  produit?: Produit;
  createDay: Date;
  utilisateurId: number;
  entrepotId?: number;
}
