package com.polytech.apishop.config.filter;

import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {

    private String username;
    private List<String> roles;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.roles = new ArrayList<>();
        user.getAuthorities().forEach(role -> {
            roles.add(role.getAuthority());
        });
    }


}
