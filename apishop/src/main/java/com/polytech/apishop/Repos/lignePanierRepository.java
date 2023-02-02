package com.polytech.apishop.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.polytech.apishop.Entities.lignePanier;

@Repository
public interface lignePanierRepository extends JpaRepository<lignePanier,Integer>{
//    lignePanier findByI
}
