import { article } from "./article";


export interface lignecommande {
    id_ligneCommande : number;
    quantite : number;
    prix : number;
    article : article;
}