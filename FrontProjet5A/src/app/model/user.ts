import { getLocaleDateTimeFormat } from "@angular/common";
import { commande } from "./commande";
import { panier } from "./panier";
import { role } from "./role";

export class User {

    public  id: number;
    public  username: string;
    private  nom: string;
    private  prenom: string;
    private  email: string;
    private  date_creation_compte: Date;
    private  authorities! : role[];
    private  panier!: panier;
    private  commande! : commande;

    constructor () {
        this.id = 0;
        this.username = '';
        this.nom='';
        this.prenom='';
        this.email='';
        this.date_creation_compte = new Date();
         
    }


}