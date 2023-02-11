package com.polytech.apishop.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.apishop.Entities.categories;
import com.polytech.apishop.Repos.categoriesRepository;
import com.polytech.apishop.Services.categorieService;


@Service
public class categorieServiceImpl implements categorieService{
    
    @Autowired
    private categoriesRepository categorieRep;

    public List<categories> voirListeCategories(){
        List<categories> listeArticle = categorieRep.findAll();
        return listeArticle;
    }

    public void addCategorie(String nom, String description, String image){
        
        categories _categorie = new categories(nom,description, image);
        categorieRep.save(_categorie);

    }

    public categories getCategorie(String nom) {
        categories _categorie = categorieRep.findByNom(nom);
        return _categorie;
    }
}
