import { article } from "./article";

export interface lignepanier {
    id_lignePanier: number;
    prix: number;
    quantite: number;
    article : article;
    
}