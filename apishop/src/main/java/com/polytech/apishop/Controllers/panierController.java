package com.polytech.apishop.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
