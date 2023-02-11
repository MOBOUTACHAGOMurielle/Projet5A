package com.polytech.apishop.Services;

import java.util.List;

import com.polytech.apishop.Entities.categories;

public interface categorieService {
    
    List<categories> voirListeCategories();
    void addCategorie(String nom, String description, String image);
    categories getCategorie(String nom);
}
