package com.polytech.apishop.Entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public role(ERole nom) {
        this.nom = nom;
    }
    @Enumerated(EnumType.STRING)
    private ERole nom;

    public String getNom() {
        return nom.name();
    }
}
