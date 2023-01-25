package com.polytech.apishop.Repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.polytech.apishop.Entities.panier;
import com.polytech.apishop.Entities.utilisateur;

@Repository
public interface utilisateurRepository extends JpaRepository<utilisateur,Integer> {
    @Query("SELECT u.panier FROM utilisateur u WHERE u.id = :id")
    Optional<panier> findPanier(@Param("id") Integer id);
    utilisateur findByUsername(String username);
    utilisateur findById(int id);


}