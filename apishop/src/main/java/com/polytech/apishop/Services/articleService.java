package com.polytech.apishop.Services;


import com.polytech.apishop.Controllers.NotAnImageFileException;
import com.polytech.apishop.Controllers.UploadFileException;
import com.polytech.apishop.Controllers.articleForm;
import com.polytech.apishop.Entities.article;
import com.polytech.apishop.Entities.categories;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface articleService {
     List<article> voirListeArticles();

     String voirDescriptionArticle(Integer id_article);
     //void supprimerArticle(int id_article);
     List<article> voirArticlesParCategories(String name);
     article addArticle(String name, String description, float  prix, String taille, int stock, int note,String img, categories categorie);
     article addArticleToCategorie(article article, MultipartFile f) throws IOException, NotAnImageFileException;
     article modifierArticle(articleForm form, int id);
     List<article> voirListeArticlesParNom(String name);
     void saveProfileImage(article a, MultipartFile f) throws IOException, NotAnImageFileException;
}


