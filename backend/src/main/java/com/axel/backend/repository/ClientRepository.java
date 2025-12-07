package com.axel.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axel.backend.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    public Optional<Client> findByEmail(String email);
    public boolean existsByEmail(String email);
}
