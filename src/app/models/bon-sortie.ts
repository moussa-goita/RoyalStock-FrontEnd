<<<<<<< HEAD
import { DetailSortie } from "./detail-sortie";
import { Entrepot } from "./entrepot";
import { Motif } from "./motif";
import { Utilisateur } from "./utilisateur";
=======
import {DetailSortie} from "./detail-sortie";
import {Utilisateur} from "./utilisateur";
import {Produit} from "./produit";
import {Motif} from "./motif";
>>>>>>> origin/master

export interface BonSortie {
  id: number;
  motif: Motif;
  dateSortie: Date;
  utilisateur: Utilisateur;
  detailsSorties: DetailSortie[];
<<<<<<< HEAD
  entrepot:Entrepot;
=======
>>>>>>> origin/master
}
