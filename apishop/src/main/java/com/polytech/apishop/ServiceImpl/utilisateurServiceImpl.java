package com.polytech.apishop.ServiceImpl;

import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import com.polytech.apishop.Entities.ERole;
import com.polytech.apishop.Entities.role;
import com.polytech.apishop.Entities.utilisateur;
import com.polytech.apishop.Repos.roleRepository;
import com.polytech.apishop.Repos.utilisateurRepository;
import com.polytech.apishop.Services.utilisateurService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Slf4j
@Service
@Transactional
public class utilisateurServiceImpl implements utilisateurService, UserDetailsService {

    private final utilisateurRepository iuser;
    private final roleRepository irole;
    private final PasswordEncoder passwordEncoder;

    public utilisateurServiceImpl(utilisateurRepository iuser, roleRepository irole, PasswordEncoder passwordEncoder) {
        this.iuser = iuser;
        this.irole = irole;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public utilisateur save(utilisateur user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        role rl = irole.findByNom(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Default Role USER Not Found !")) ;
        user.getAuthorities().add(rl);
        return iuser.save(user);
    }

    @Override
    public role saveRole(role role) {
        return irole.save(role);
    }

    @Override
    public void addRoleToUSer(String username, String rolename) {
        utilisateur user = iuser.findByUsername(username);
        role rl = irole.findByNom(ERole.valueOf(rolename)).orElseThrow(() -> new RuntimeException("Error: Default Role USER Not Found !")) ;
        user.getAuthorities().add(rl);
    }

    @Override
    public utilisateur getUser(String username) {
        return iuser.findByUsername(username);
    }

    @Override
    public List<utilisateur> getUsers() {
        return iuser.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        utilisateur user = iuser.findByUsername(username);
        if (user == null) {
            log.error("user not found in the database");
            throw new UsernameNotFoundException("user not found in the database");
        }else{
            log.info("user found in the database : {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getAuthorities().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getNom()));
        });

        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }
}
