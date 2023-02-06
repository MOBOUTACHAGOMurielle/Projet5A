import { lignecommande } from "./lignecommande";

export interface commande {
    
    id_commande: number;
    date_commande: Date;
    etat_commande: boolean;
    prix_commande : number;
    ligneCommandes : lignecommande[];
}