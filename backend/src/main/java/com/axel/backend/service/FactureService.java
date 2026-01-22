package com.axel.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axel.backend.dto.CreateFactureDTO;
import com.axel.backend.dto.CreateLigneFactureDTO;
import com.axel.backend.dto.FactureDTO;
import com.axel.backend.entity.Client;
import com.axel.backend.entity.Facture;
import com.axel.backend.entity.LigneFacture;
import com.axel.backend.entity.StatutFacture;
import com.axel.backend.exception.ResourceNotFoundException;
import com.axel.backend.mapper.FactureMapper;
import com.axel.backend.repository.ClientRepository;
import com.axel.backend.repository.FactureRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FactureService {
    
    @Autowired
    private FactureRepository factureRepository;

    @Autowired
    private FactureMapper factureMapper;

    @Autowired
    private ClientRepository clientRepository;

    private static final Logger logger = LoggerFactory.getLogger(FactureService.class);

    public List<FactureDTO> findAll() {
        List<Facture> factures = factureRepository.findAll();
        return factureMapper.toDTOList(factures);
    }

    public FactureDTO findById(Long id) {
        Facture facture = factureRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Facture introuvable avec l'ID " + id));
        return factureMapper.toDTO(facture); 
    }

    public FactureDTO create(CreateFactureDTO dto) {
        logger.info("Tentative de création d'une facture pour le client ID: {}", dto.getClientId());

        Client client = clientRepository.findById(dto.getClientId())
            .orElseThrow(() -> new ResourceNotFoundException("Client introuvable avec l'ID " + dto.getClientId()));

        Facture facture = factureMapper.toEntity(dto, client);
        
        if (dto.getLignes() != null && !dto.getLignes().isEmpty()) {
            for(CreateLigneFactureDTO ligne: dto.getLignes()) {
                LigneFacture ligneEntity = factureMapper.toEntity(ligne, facture);
                facture.getLignes().add(ligneEntity);
            }
        }
        BigDecimal montantHT = BigDecimal.ZERO;

        for (LigneFacture ligne: facture.getLignes()) {
            BigDecimal montantLigne = ligne.getMontantLigne();
            montantHT = montantHT.add(montantLigne);
        }   
        facture.setMontantHT(montantHT);

        BigDecimal tauxTVA = facture.getTauxTVA();
        BigDecimal montantTVA = montantHT.multiply(tauxTVA).divide(BigDecimal.valueOf(100)); 
        facture.setMontantTVA(montantTVA);
        BigDecimal montantTTC = montantHT.add(montantTVA);
        facture.setMontantTTC(montantTTC);
        String numero = generateFactureNumero();
        facture.setNumero(numero);
        Facture savedFacture = factureRepository.save(facture);

        logger.info("Facture créée avec succès avec l'ID: {}", savedFacture.getId());
        return factureMapper.toDTO(savedFacture);
    }

    public FactureDTO update(Long id, CreateFactureDTO dto) {
        logger.info("Tentative de mise à jour de la facture ID: {}", id);

        Facture existingFacture = factureRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Facture introuvable avec l'ID " + id));

        Client client = clientRepository.findById(dto.getClientId())
            .orElseThrow(() -> new ResourceNotFoundException("Client introuvable avec l'ID " + dto.getClientId()));

        existingFacture.setDateFacture(dto.getDateFacture());
        existingFacture.setDateEcheance(dto.getDateEcheance());
        existingFacture.setTauxTVA(dto.getTauxTVA());
        existingFacture.setNotes(dto.getNotes());
        existingFacture.setClient(client);

        existingFacture.getLignes().clear();
        if (dto.getLignes() != null && !dto.getLignes().isEmpty()) {
            for(CreateLigneFactureDTO ligne: dto.getLignes()) {
                LigneFacture ligneEntity = factureMapper.toEntity(ligne, existingFacture);
                existingFacture.getLignes().add(ligneEntity);
            }
        }

        BigDecimal montantHT = BigDecimal.ZERO;
        for (LigneFacture ligne: existingFacture.getLignes()) {
            montantHT = montantHT.add(ligne.getMontantLigne());
        }   
        existingFacture.setMontantHT(montantHT);

        BigDecimal tauxTVA = existingFacture.getTauxTVA();
        BigDecimal montantTVA = montantHT.multiply(tauxTVA).divide(BigDecimal.valueOf(100)); 
        existingFacture.setMontantTVA(montantTVA);

        BigDecimal montantTTC = montantHT.add(montantTVA);
        existingFacture.setMontantTTC(montantTTC);

        Facture updatedFacture = factureRepository.save(existingFacture);

        logger.info("Facture mise à jour avec succès avec l'ID: {}", updatedFacture.getId());
        return factureMapper.toDTO(updatedFacture);
    }

    public void delete(Long id) {
        logger.info("Tentative de suppression de la facture ID: {}", id);

        Facture facture = factureRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Facture introuvable avec l'ID " + id));

        factureRepository.delete(facture);
        logger.info("Facture supprimée avec succès avec l'ID: {}", id);
    }

    public FactureDTO updateStatut(Long id, StatutFacture statut) {
        logger.info("Tentative de mise à jour du statut de la facture avec l'ID: {}", id);

        Facture facture = factureRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Facture introuvable avec l'ID " + id));
        
        facture.setStatut(statut);
        Facture updatedStatut = factureRepository.save(facture);
        logger.info("Statut de la facture mis à jour avec succès avec l'ID: {}", id);

        return factureMapper.toDTO(updatedStatut);
    }

    private String generateFactureNumero() {
        int year = LocalDateTime.now().getYear();

        String prefix = "FAC-" + year + "-";
        Long count = factureRepository.countByNumeroStartingWith(prefix);

        int numero = count.intValue() + 1;
        return String.format("FAC-%d-%04d", year, numero);
    }
}
