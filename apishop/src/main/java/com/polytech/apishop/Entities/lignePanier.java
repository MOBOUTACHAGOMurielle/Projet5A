package com.polytech.apishop.Entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
public class lignePanier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_lignePanier;
    private int quantite;
    private float prix;

    @OneToOne
    private article article;
    

    public lignePanier(){

    }

    public lignePanier(int quantite, float prix, article article){
        this.quantite = quantite;
        this.article = article;
        this.prix = prix;
    }

    public Integer getId_lignePanier() {
        return this.id_lignePanier;
    }

    public void setId_lignePanier(Integer id_lignePanier) {
        this.id_lignePanier = id_lignePanier;
    }

    public int getQuantite() {
        return this.quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public float getPrix() {
        return this.prix;
    }

    public void setPrix(float prix) {
        this.prix = prix;
    }

    public article getArticle() {
        return this.article;
    }

    public void setArticle(article article) {
        this.article = article;
    }
}
