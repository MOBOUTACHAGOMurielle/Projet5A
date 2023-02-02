package com.polytech.apishop.Services;

import com.polytech.apishop.Entities.ERole;
import com.polytech.apishop.Entities.role;
import com.polytech.apishop.Entities.utilisateur;

import java.util.List;

public interface utilisateurService {
    utilisateur save(utilisateur user);
    role saveRole(role role);
    void addRoleToUSer(String username, String rolename);
    utilisateur getUser(String username);
    List<utilisateur> getUsers();

}
