package com.polytech.apishop.Controllers;

import com.polytech.apishop.Entities.commande;
import com.polytech.apishop.ServiceImpl.CommandeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/commande")
public class commandeController {

    private final CommandeService commandeService;


    public commandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @GetMapping("/{userid}")
    public ResponseEntity<commande> create(@PathVariable(value = "userid") int userid) {
        return new ResponseEntity<>(commandeService.createCommandFromUser(userid), HttpStatus.CREATED);
    }

    @GetMapping("/validate/{id}")
    public ResponseEntity<Boolean> create(@PathVariable(value = "id") Integer cmdid) {
        return new ResponseEntity<>(commandeService.validateCommande(cmdid), HttpStatus.OK);
    }
}
