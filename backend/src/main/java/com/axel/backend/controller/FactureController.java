package com.axel.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axel.backend.dto.CreateFactureDTO;
import com.axel.backend.dto.FactureDTO;
import com.axel.backend.entity.StatutFacture;
import com.axel.backend.service.FactureService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/factures")
public class FactureController {

    @Autowired
    private FactureService factureService;

    @GetMapping
    public List<FactureDTO> getAllFactures() {
        return factureService.findAll();
    }

    @GetMapping("/{id}")
    public FactureDTO getFacture(@PathVariable Long id) {
        return factureService.findById(id);
    }

    @PostMapping
    public ResponseEntity<FactureDTO> createFacture(@Valid @RequestBody CreateFactureDTO facture) {
        FactureDTO factureDTO = factureService.create(facture);
        return ResponseEntity.status(201).body(factureDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FactureDTO> updateFacture(@Valid @RequestBody CreateFactureDTO facture, @PathVariable Long id) {
        FactureDTO factureDTO = factureService.update(id, facture);
        return ResponseEntity.status(200).body(factureDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        factureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<FactureDTO> updateStatut(@PathVariable Long id, @RequestBody StatutFacture statut) {
        FactureDTO factureDTO = factureService.updateStatut(id, statut);
        return ResponseEntity.status(200).body(factureDTO);
    }
}
