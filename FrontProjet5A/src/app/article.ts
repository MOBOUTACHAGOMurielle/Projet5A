import { categorie } from "./categories";
export interface article {
    id_article: number;
    name: string;
    image: string;
    description: string;
    prix: number;
    taille: string;
    note: number;
    //commentaire: string;
    categories: categorie;
    quantite_stock: number;
}
