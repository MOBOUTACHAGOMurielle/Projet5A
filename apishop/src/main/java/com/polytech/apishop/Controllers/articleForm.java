package com.polytech.apishop.Controllers;

import lombok.Getter;

@Getter
public class articleForm {
    String name;
    int prix;
    String taille;
    String description;
    int note;
    int quantite_stock;
    //String image;
    String categories;
}
