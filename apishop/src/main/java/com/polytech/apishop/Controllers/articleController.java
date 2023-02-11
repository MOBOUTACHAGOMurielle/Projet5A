package com.polytech.apishop.Controllers;
import com.polytech.apishop.Services.articleService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.polytech.apishop.Entities.article;
import com.polytech.apishop.Entities.categories;
import com.polytech.apishop.Repos.articleRepository;
import com.polytech.apishop.Services.articleService;
import com.polytech.apishop.Services.categorieService;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "http://localhost:4200/")
public class articleController {
    

    @Autowired
    private articleService articleServ;

    @Autowired
    private articleRepository articleResp;

    @Autowired
    private categorieService categorieServ;

    public static final String ARTICLE_FOLDER = System.getProperty("user.home") + "/com/apishop/article/";
    public static final String FORWARD_SLASH = "/";

    @GetMapping("/liste")
    public List<article> voirListeArticles() {
        return articleServ.voirListeArticles();
    }

    @GetMapping(path = "/liste/{name}")
    public List<article> voirListeArticlesParNom(@PathVariable(value = "name") String name) {
        return articleServ.voirListeArticlesParNom(name);
    }

    @GetMapping(path = "/description/{id}")
    public String voirDescriptionArticle(@PathVariable(value = "id") Integer id_article) {
        return articleServ.voirDescriptionArticle(id_article);
    }
/*
    @PostMapping(path="newArticle/categorie/image")
    public ResponseEntity<article> ajouterArticleToCategorie(@RequestBody article form,  @RequestParam(value = "fileImage") MultipartFile f) throws IOException, NotAnImageFileException {
        article a = articleServ.addArticleToCategorie(form, f);
        return new ResponseEntity<>(a, HttpStatus.OK);
    }*/



    /*
    @PostMapping(path="newArticle/categorie")
    public ResponseEntity<article> ajouterArticleToCategorie(@RequestBody articleForm form){
        article a = articleServ.addArticleToCategorie(form);
        return new ResponseEntity<>(a, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<article> ajouterArticle(@RequestBody article article){
        article a = articleServ.addArticle(article.getName(), article.getDescription(), article.getPrix(), article.getTaille(), article.getQuantite_stock(), article.getNote(), article.getImage(), article.getCategories());
        return new ResponseEntity<>(articleResp.save(a), HttpStatus.OK);
    }*/

    @PostMapping("/ajouter")
    public ResponseEntity<article> ajouterArticle (
            @RequestParam("name") String name,
            @RequestParam("prix") int prix,
            @RequestParam("taille") String taille,
            @RequestParam("quantite_stock") int q,
            @RequestParam("categorie") String categorie,
            @RequestParam("note") int note,
            @RequestParam("description") String description,
            @RequestParam(value = "profileImage") MultipartFile articleImage) throws IOException, NotAnImageFileException {
        article a = new article(name, description, prix, taille, q, note, categorieServ.getCategorie(categorie), null);
        article b = articleServ.addArticleToCategorie(a, articleImage);
        return new ResponseEntity<>(b, HttpStatus.OK);
    }

    @GetMapping(path = "/categories/{nom}")
    public ResponseEntity<List<article>> getArticlesParCategories(@PathVariable("nom") String nom) {
        List<article> articles = articleServ.voirArticlesParCategories(nom);
        return new ResponseEntity<>(articles, OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public void supprimerArticle(@PathVariable(value = "id") Integer id_article) {
        try {
            articleResp.deleteById(id_article);
        } catch (Exception e){}
    }

    // /article/categorie/liste
    @GetMapping("/categorie/liste")
    public List<categories> voirListeCategories() {
        return categorieServ.voirListeCategories();
    }
    // /article/categorie/liste

    /*@PostMapping(path="/modifier/{id}")
    public ResponseEntity<article> modifierArticle(@PathVariable(value = "id") Integer id_article,@RequestBody article modif){
        Optional<article> articleModifier = articleResp.findById(id_article);
        if (articleModifier.isPresent()) {
            return new ResponseEntity<>(articleResp.save(articleServ.modifierArticle(articleModifier, modif)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

    @PostMapping(path="modify/{id}")
    public ResponseEntity<article> modifyArticle(@RequestBody articleForm form, @PathVariable("id") int id) {
        article updatedArticle = articleServ.modifierArticle(form, id);
        return new ResponseEntity<>(updatedArticle, OK);
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FileInformation> uploadFile(
            @RequestParam("data") MultipartFile multipartFile
    ) throws UploadFileException {
        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new UploadFileException();
        }
        return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
    }

    @GetMapping(path = "/image/{articleName}/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable("articleName") String articleName, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(ARTICLE_FOLDER + articleName + FORWARD_SLASH + fileName));
    }

}
