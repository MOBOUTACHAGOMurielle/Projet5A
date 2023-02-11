package com.polytech.apishop.ServiceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import com.polytech.apishop.Controllers.NotAnImageFileException;
import com.polytech.apishop.Controllers.UploadFileException;
import com.polytech.apishop.Controllers.articleForm;
import com.polytech.apishop.Repos.categoriesRepository;
import com.polytech.apishop.Services.articleService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polytech.apishop.Entities.article;
import com.polytech.apishop.Entities.categories;
import com.polytech.apishop.Repos.articleRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import static org.springframework.http.MediaType.*;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import javax.persistence.EntityNotFoundException;

import javax.transaction.Transactional;

@Service
@Transactional
public class articleServiceImpl implements articleService {

    public static final String JPG_EXTENSION = "jpg";
    public static final String ARTICLE_FOLDER = System.getProperty("user.home") + "/com/apishop/article/";
    public static final String ARTICLE_IMAGE_PATH = "/article/image/";
    public static final String FORWARD_SLASH = "/";
    public static final String DOT = ".";
    
    @Autowired
    private articleRepository articleRep;

    @Autowired
    private categoriesRepository categorieRep;

    public List<article> voirListeArticles(){
        List<article> listeArticle = articleRep.findAll();
        return listeArticle;
    }

    public List<article> voirListeArticlesParNom(String name){
        List<article> article = articleRep.findAllByNameStartingWithIgnoreCase(name);
        return article;
    }

    public List<article> voirArticlesParCategories(String name) {
        categories c = categorieRep.findByNom(name);
        List<article> articles = articleRep.findAllByCategories(c);
        return articles;
    }

    public String voirDescriptionArticle(Integer id_article){
        String description = articleRep.findDescription(id_article);
        return description;
    }
/*
    public void supprimerArticle(Integer id_article){
        articleRep.deleteById(id_article);
    }*/

    public article addArticleToCategorie(article article, MultipartFile f) throws IOException, NotAnImageFileException{

        article _article = new article();
        _article.setName(article.getName());
        _article.setNote(article.getNote());
        _article.setDescription(article.getDescription());
        //_article.setImage(article.getImage());
        _article.setTaille(article.getTaille());
        _article.setCategories(article.getCategories());
        _article.setPrix(article.getPrix());
        saveProfileImage(_article, f);
        return articleRep.save(_article);
    }

    public article addArticle(String name, String description, float  prix, String taille, int stock,int note, String img,categories c){

        article _article = new article(name,description,prix,taille,stock,note,img,c,null);
        articleRep.save(_article);
        return _article;
    }

    public article modifierArticle(articleForm form, int id){
        article _articleModifier = articleRep.getReferenceById(id);

        if(_articleModifier == null) {
            throw new EntityNotFoundException();
        }
        else {
            _articleModifier.setName(form.getName());
            _articleModifier.setDescription(form.getDescription());
            _articleModifier.setPrix(form.getPrix());
            _articleModifier.setTaille(form.getTaille());
            _articleModifier.setQuantite_stock(form.getQuantite_stock());
            //_articleModifier.setImage(form.getImage());
            _articleModifier.setNote(form.getNote());
            _articleModifier.setCategories(categorieRep.findByNom(form.getCategories()));
            return articleRep.save(_articleModifier);
        }
    }


    public void saveProfileImage(article a, MultipartFile f) throws IOException, NotAnImageFileException {
        if (f != null) {
            if(!Arrays.asList(IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE, IMAGE_GIF_VALUE).contains(f.getContentType())) {
                throw new NotAnImageFileException(f.getOriginalFilename());
            }
            Path coursFolder = Paths.get(ARTICLE_FOLDER + a.getName()).toAbsolutePath().normalize();
            if(!Files.exists(coursFolder)) {
                Files.createDirectories(coursFolder);
            }
            Files.deleteIfExists(Paths.get(coursFolder + a.getName() + DOT + JPG_EXTENSION));
            Files.copy(f.getInputStream(), coursFolder.resolve(a.getName() + DOT + JPG_EXTENSION), REPLACE_EXISTING);
            a.setImage(setProfileImageUrl(a.getName()));
            articleRep.save(a);
        }
    }

    public String setProfileImageUrl(String username) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(ARTICLE_IMAGE_PATH + username + FORWARD_SLASH
                + username + DOT + JPG_EXTENSION).toUriString();
    }

}
