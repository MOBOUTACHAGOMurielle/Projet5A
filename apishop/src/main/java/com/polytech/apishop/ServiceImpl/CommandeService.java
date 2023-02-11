package com.polytech.apishop.ServiceImpl;

import com.polytech.apishop.Entities.*;
import com.polytech.apishop.Repos.commandeRepository;
import com.polytech.apishop.Repos.ligneCommandeRepository;
import com.polytech.apishop.Repos.panierRepository;
import com.polytech.apishop.Repos.utilisateurRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
@Slf4j
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

    public boolean validateCommande(Integer id) {
        commande current = icommande.findById(id).get();
        current.setEtat_commande(true);
        return icommande.save(current).isEtat_commande();
    }
    
    public commande createCommandFromUser (int user_id) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        //getting user and user_panier frm db
        utilisateur user = iuser.findById(user_id);
        panier current = ipanier.findById(user.getPanier().getId_panier()).get();

        //creating commande from panier
        commande newcommande = new commande();
        newcommande.setPrix_commande(0);
        newcommande.setDate_commande(dtf.format(now));

        for (lignePanier line: current.getLignePanier()
             ) {
            ligneCommande newlinecmd = createligneCommandFromlignePanier(line);
            newcommande.addlineToComand(newlinecmd);
            log.info(newlinecmd.getArticle().getName());
        }

        //vidage panier
        current.setLignePanier(new ArrayList<lignePanier>());
        current.setPrix_total(0);

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
