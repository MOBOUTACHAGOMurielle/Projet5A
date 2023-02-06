import { lignepanier } from "./lignepanier";

export interface panier {
    id_panier: number;
    lignePanier: lignepanier[]; 
    prix_total: number;
}