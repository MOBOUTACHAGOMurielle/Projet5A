package com.polytech.apishop.Entities;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_commande;

    @Column(nullable = false)
    private String date_commande;

    @Column(nullable = false)
    private boolean etat_commande;
    private float prix_commande;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "id", referencedColumnName = "id")
//    private utilisateur utilisateur;

    @OneToMany
    private List<ligneCommande> ligneCommandes = new ArrayList<ligneCommande>();

    public List<ligneCommande> getLigneCommandes() {
        return ligneCommandes;
    }

    public void setLigneCommandes(List<ligneCommande> ligneCommandes) {
        this.ligneCommandes = ligneCommandes;
    }

    public commande(){

    }

    public void addlineToComand (ligneCommande line) {
        List<ligneCommande> current = this.getLigneCommandes();
        current.add(line);
        this.setLigneCommandes(current);
        this.prix_commande += line.getPrix();
    }

    public commande(String date_commande, boolean etat_commande, float prix_commande){
        this.date_commande = date_commande;
        this.etat_commande = etat_commande;
        this.prix_commande = prix_commande;
    }

    public Integer getId_commande() {
        return this.id_commande;
    }

    public void setId_commande(Integer id_commande) {
        this.id_commande = id_commande;
    }


    public String getDate_commande() {
        return this.date_commande;
    }

    public void setDate_commande(String date_commande) {
        this.date_commande = date_commande;
    }

    public boolean isEtat_commande() {
        return this.etat_commande;
    }

    public void setEtat_commande(boolean etat_commande) {
        this.etat_commande = etat_commande;
    }

    public float getPrix_commande() {
        return this.prix_commande;
    }

    public void setPrix_commande(float prix_commande) {
        this.prix_commande = prix_commande;
    }

//    public utilisateur getUtilisateur() {
//        return this.utilisateur;
//    }
//
//    public void setUtilisateur(utilisateur utilisateur) {
//        this.utilisateur = utilisateur;
//    }
}
