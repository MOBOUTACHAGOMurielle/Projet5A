package com.polytech.apishop.Entities;

import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
public class categories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_categories;

    private String nom;

    private String description;

    private String image;

    public categories(){

    }

    public categories(String nom, String description, String image){
        this.nom = nom;
        this.description = description;
        this.image = image;
    }
    
    public Integer getId_categories() {
        return this.id_categories;
    }

    public void setId_categories(Integer id_categories) {
        this.id_categories = id_categories;
    }

    public String getNom() {
        return this.nom;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
