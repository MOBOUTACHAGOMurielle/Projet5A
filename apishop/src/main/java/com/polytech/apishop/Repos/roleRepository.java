package com.polytech.apishop.Repos;

import com.polytech.apishop.Entities.ERole;
import com.polytech.apishop.Entities.role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface roleRepository extends JpaRepository<role, Long> {
    Optional<role> findByNom(ERole nom);
}
