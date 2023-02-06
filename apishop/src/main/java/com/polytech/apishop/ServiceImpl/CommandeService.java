package com.polytech.apishop.ServiceImpl;

import com.polytech.apishop.Entities.*;
import com.polytech.apishop.Repos.commandeRepository;
import com.polytech.apishop.Repos.ligneCommandeRepository;
import com.polytech.apishop.Repos.panierRepository;
import com.polytech.apishop.Repos.utilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CommandeService {
    
    private final commandeRepository icommande;
    
    private final panierRepository ipanier;

    private final ligneCommandeRepository ilignecommande;

    private final utilisateurRepository iuser;


    public CommandeService(commandeRepository icommande, panierRepository ipanier, ligneCommandeRepository ilignecommande, utilisateurRepository iuser) {
        this.icommande = icommande;
        this.ipanier = ipanier;
        this.ilignecommande = ilignecommande;
        this.iuser = iuser;
    }
    
    public commande createCommandFromUser (int user_id) {
        //getting user and user_panier frm db
        utilisateur user = iuser.findById(user_id);
        panier current = ipanier.findById(user.getPanier().getId_panier()).get();

        //creating commande from panier
        commande newcommande = new commande();
        newcommande.setPrix_commande(0);
        for (lignePanier line: current.getLignePanier()
             ) {
            newcommande.addlineToComand(createligneCommandFromlignePanier(line));
        }

        //vidage panier
        current.setLignePanier(new ArrayList<lignePanier>());

        //persist command
        commande savedcmd = icommande.save(newcommande);

        //update user commands list
        user.addCommand(savedcmd);
        iuser.save(user);
        ipanier.save(current);
        return savedcmd;
    }

    public ligneCommande createligneCommandFromlignePanier (lignePanier line) {
        ligneCommande newline = new ligneCommande();
        newline.setArticle(line.getArticle());
        newline.setQuantite(line.getQuantite());
        newline.setPrix(line.getPrix());
        return ilignecommande.save(newline);
    }

    
    
}
