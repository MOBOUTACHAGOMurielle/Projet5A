package com.polytech.apishop.ServiceImpl;

import java.util.List;
import java.util.Optional;

import com.polytech.apishop.Entities.article;
import com.polytech.apishop.Repos.articleRepository;
import com.polytech.apishop.Repos.panierRepository;
import com.polytech.apishop.Repos.utilisateurRepository;
import org.springframework.stereotype.Service;

import com.polytech.apishop.Entities.lignePanier;
import com.polytech.apishop.Entities.panier;
import com.polytech.apishop.Services.panierService;
import com.polytech.apishop.Repos.lignePanierRepository;

@Service
public class panierServiceImpl implements panierService{

    private final lignePanierRepository lignePanierRepository;
    private final articleRepository articleRepos;

    private final utilisateurRepository userRepos;
    private final com.polytech.apishop.Repos.panierRepository panierRepository;

    public panierServiceImpl(com.polytech.apishop.Repos.lignePanierRepository lignePanierRepository, articleRepository articleRepository, articleRepository articleRepos, utilisateurRepository userRepos,
                             panierRepository panierRepository) {
        this.lignePanierRepository = lignePanierRepository;
        this.articleRepos = articleRepos;
        this.userRepos = userRepos;
        this.panierRepository = panierRepository;
    }


    public lignePanier updatePanier (Integer lpanier_id, int quantite) {
        lignePanier lpanier= lignePanierRepository.findById(lpanier_id).get();
        lpanier.setQuantite(quantite);
        return lignePanierRepository.save(lpanier);
    }

    public List<panier> getAll() {
        return panierRepository.findAll();
    }


    public panier addarticleToPanier(Integer article_id, int quantite, Integer panier_id) {
        lignePanier line = create_ligne_panier(article_id, quantite);
        return addlineToPanier(line.getId_lignePanier(),panier_id);
    }

    public lignePanier create_ligne_panier(Integer article_id, int quantite) {
        if (articleRepos.existsById(article_id)) {
            article artcl = articleRepos.findById_article(article_id);
            lignePanier lcmd = new lignePanier();
            lcmd.setQuantite(quantite);
            lcmd.setArticle(artcl);
            lcmd.setPrix(artcl.getPrix() * quantite);
            lignePanier savedlpnr = lignePanierRepository.save(lcmd);
            return savedlpnr;
        }
        else {
            throw new IllegalArgumentException("Article with id " + article_id + " doesn't exist" );
        }
    }

    public panier addlineToPanier(Integer lpanier_id, Integer panier_id) {
        panier panier = panierRepository.findById(panier_id).get();
        lignePanier lpanier= lignePanierRepository.findById(lpanier_id).get();
        List<lignePanier> newlist =  panier.getLignePanier();
        newlist.add(lpanier);
        panier.setLignePanier(newlist);
        panier.setPrix_total(panier.getPrix_total() + lpanier.getPrix());
        return panierRepository.save(panier);
    }





    @Override
    public panier create(Integer panier_id, List<Integer> ligne_panier_id) {
        return null;
    }

    //    private final
    public panier ajoutArticle(Optional<panier> testpanierpresent, lignePanier lignePanier){
        panier _panierajouter = testpanierpresent.get(); 
        List<lignePanier> ligneaddarticle = _panierajouter.getLignePanier(); // recup la liste des lignes du panier existant
        ligneaddarticle.add(ligneaddarticle.size(),lignePanier);// ajoute à cette liste la nouvelle ligne
        _panierajouter.setLignePanier(ligneaddarticle); // applique la nouvelle liste
        _panierajouter.setPrix_total(_panierajouter.getPrix_total()+lignePanier.getPrix());
        return _panierajouter;
    }

}
