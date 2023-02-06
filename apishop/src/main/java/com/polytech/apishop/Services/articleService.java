package com.polytech.apishop.Services;


import com.polytech.apishop.Entities.article;

import java.util.List;
import java.util.Optional;

public interface articleService {
     List<article> voirListeArticles();

     String voirDescriptionArticle(Integer id_article);
     void supprimerArticle(Integer id_article);
     void addArticle(String name, String description, float  prix, String taille, int stock, String img);
     article modifierArticle(Optional<article> articleModifier, article modif);
     List<article> voirListeArticlesParNom(String name);
}


