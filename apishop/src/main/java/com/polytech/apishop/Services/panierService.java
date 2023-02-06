package com.polytech.apishop.Services;

import java.util.List;
import java.util.Optional;

import com.polytech.apishop.Entities.lignePanier;
import com.polytech.apishop.Entities.panier;

public interface panierService {

    panier create(Integer panier_id, List<Integer> ligne_panier_id);

    panier ajoutArticle(Optional<panier> testpanierpresent, lignePanier lignePanier);
     panier addarticleToPanier(Integer article_id, int quantite, Integer panier_id);

     lignePanier updatePanier (Integer lpanier_id, int quantite);

     List<panier> getAll();



}
