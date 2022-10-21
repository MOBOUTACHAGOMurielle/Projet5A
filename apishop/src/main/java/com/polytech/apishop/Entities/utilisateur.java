package com.polytech.apishop.Entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class utilisateur {
    @Id
    public int Id;
    private String login;
    private String password;
    public String nom;
    public String prenom;
    public String mail;
    public Date date_creation;





}
