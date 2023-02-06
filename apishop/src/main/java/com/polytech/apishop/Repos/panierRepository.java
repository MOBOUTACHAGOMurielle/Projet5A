package com.polytech.apishop.Repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.polytech.apishop.Entities.panier;

@Repository
public interface panierRepository extends JpaRepository<panier,Integer> {

    //panier findById_panier(Integer id);

    
}