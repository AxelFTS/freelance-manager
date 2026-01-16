package com.axel.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axel.backend.entity.Facture;
import com.axel.backend.entity.StatutFacture; 

public interface FactureRepository extends JpaRepository<Facture, Long> {
    public List<Facture> findByClientId(Long clientId);
    public List<Facture> findByStatut(StatutFacture statut);

    public Optional<Facture> findByNumero(String numero);

    public Long countByNumeroStartingWith(String prefix);
    
}
