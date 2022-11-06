package com.polytech.apishop.Services;

import java.util.Optional;

import com.polytech.apishop.Entities.lignePanier;
import com.polytech.apishop.Entities.panier;

public interface panierService {

    panier ajoutArticle(Optional<panier> testpanierpresent, lignePanier lignePanier);
   
}
