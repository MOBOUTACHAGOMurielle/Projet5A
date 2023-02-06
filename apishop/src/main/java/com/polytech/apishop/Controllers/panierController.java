package com.polytech.apishop.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.polytech.apishop.Entities.lignePanier;
import com.polytech.apishop.Entities.panier;
import com.polytech.apishop.Repos.articleRepository;
import com.polytech.apishop.Repos.panierRepository;
import com.polytech.apishop.Repos.utilisateurRepository;
import com.polytech.apishop.Services.panierService;

@RestController
@RequestMapping("/panier")
public class panierController {
    @Autowired
    private panierService panierServ;

    @Autowired
    private panierRepository panierResp;

    @Autowired
    private utilisateurRepository utilisateurResp;
    @Autowired
    private articleRepository articleResp;

    @PostMapping("/ajouter/{id}")
    public ResponseEntity<panier> ajouterArticlePanier(@PathVariable(value = "id") Integer id, @RequestBody lignePanier lignePanier){
        lignePanier.setPrix(lignePanier.getQuantite()*articleResp.findById(lignePanier.getArticle().getId_article()).get().getPrix()); //calcul le prix total de la ligne
        Optional<panier> testpanierpresent = utilisateurResp.findPanier(id); //cherche le panier associé à l'id de l'utilisateur connecté
        
        return new ResponseEntity<>(panierResp.save(panierServ.ajoutArticle(testpanierpresent,lignePanier)), HttpStatus.OK);
    }

    @GetMapping("/add/article/{article_id}/{quantite}/{panier_id}")
    public ResponseEntity<panier> addArticlePanier(@PathVariable(value = "article_id") Integer articleid, @PathVariable(value = "quantite") Integer qtite, @PathVariable(value = "panier_id") Integer panierid){
        return new ResponseEntity<>( panierServ.addarticleToPanier(articleid,qtite,panierid) , HttpStatus.OK);
  }

  @GetMapping("/list")
  public ResponseEntity<List<panier>> getAll() {
        return  new ResponseEntity<>(panierServ.getAll(), HttpStatus.OK);
  }

    @GetMapping("/update/line/{ligne_id}/{quantite}")
    public ResponseEntity<lignePanier> updateQtiteArticlePanier(@PathVariable(value = "ligne_id") Integer ligneid, @PathVariable(value = "quantite") Integer qtite) {
        return new ResponseEntity<>( panierServ.updatePanier(ligneid,qtite) , HttpStatus.OK);
    }



}
