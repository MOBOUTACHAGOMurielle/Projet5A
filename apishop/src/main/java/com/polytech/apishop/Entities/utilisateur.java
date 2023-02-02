package com.polytech.apishop.Entities;

import lombok.*;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable=false)
    private String username;
    @Column(nullable=false)
    private String password;
    private String nom;
    private String prenom;
    private String email;
    private Date date_creation_compte;
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Collection<role> authorities = new ArrayList<>();
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private panier panier;
    @OneToMany(mappedBy = "utilisateur")
    private List<commande> commande;

    private boolean isActive;
    private boolean isNotLocked;

    public utilisateur(String username, String password, String nom, String prenom, String email, Date date_creation_compte, Collection<role> authorities, com.polytech.apishop.Entities.panier panier, List<com.polytech.apishop.Entities.commande> commande) {
        this.username = username;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.date_creation_compte = date_creation_compte;
        this.authorities = authorities;
        this.panier = panier;
        this.commande = commande;
    }

    public utilisateur(Integer integer, String username, String password, String borne, String christine, String mail, Object dateCreationCompte, ArrayList<role> authorities, Object panier, Object commande) {
    }
}
