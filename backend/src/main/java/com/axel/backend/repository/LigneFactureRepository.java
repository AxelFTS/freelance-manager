package com.axel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axel.backend.entity.LigneFacture;

public interface LigneFactureRepository extends JpaRepository<LigneFacture, Long> {
    public void deleteByFactureId(Long factureId);
}
