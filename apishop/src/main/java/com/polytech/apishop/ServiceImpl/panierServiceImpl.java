package com.polytech.apishop.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.polytech.apishop.Entities.lignePanier;
import com.polytech.apishop.Entities.panier;
import com.polytech.apishop.Services.panierService;

@Service
public class panierServiceImpl implements panierService{

    public panier ajoutArticle(Optional<panier> testpanierpresent, lignePanier lignePanier){
        panier _panierajouter = testpanierpresent.get(); 
        List<lignePanier> ligneaddarticle = _panierajouter.getLignePanier(); // recup la liste des lignes du panier existant
        ligneaddarticle.add(ligneaddarticle.size(),lignePanier);// ajoute à cette liste la nouvelle ligne
        _panierajouter.setLignePanier(ligneaddarticle); // applique la nouvelle liste
        _panierajouter.setPrix_total(_panierajouter.getPrix_total()+lignePanier.getPrix());
        return _panierajouter;
    }

}
