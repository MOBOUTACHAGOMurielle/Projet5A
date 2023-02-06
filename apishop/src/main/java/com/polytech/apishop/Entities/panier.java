package com.polytech.apishop.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
public class panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_panier;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<lignePanier> lignePanier = new ArrayList<lignePanier>();
    
    private float prix_total=0;

    public panier(){

    }

    public panier(float prix_total, List<lignePanier> lignePanier){
        this.prix_total = prix_total;
        this.lignePanier = lignePanier;
    }

    public Integer getId_panier() {
        return this.id_panier;
    }

    public void setId_panier(Integer id_panier) {
        this.id_panier = id_panier;
    }

    public float getPrix_total() {
        return this.prix_total;
    }

    public void setPrix_total(float prix_total) {
        this.prix_total = prix_total;
    }

    public List<lignePanier> getLignePanier() {
        return this.lignePanier;
    }

    public void setLignePanier(List<lignePanier> lignePanier) {
        this.lignePanier = lignePanier;
    }
}
