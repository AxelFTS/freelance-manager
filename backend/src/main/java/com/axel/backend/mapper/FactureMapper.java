package com.axel.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.axel.backend.dto.CreateFactureDTO;
import com.axel.backend.dto.CreateLigneFactureDTO;
import com.axel.backend.dto.FactureDTO;
import com.axel.backend.dto.LigneFactureDTO;
import com.axel.backend.entity.Client;
import com.axel.backend.entity.Facture;
import com.axel.backend.entity.LigneFacture;

@Component
public class FactureMapper {

    // Facture Entity → FactureDTO
    public FactureDTO toDTO(Facture facture) {
        if (facture == null) {
            return null;
        }

        FactureDTO dto = new FactureDTO();
        dto.setId(facture.getId());
        dto.setNumero(facture.getNumero());
        dto.setDateFacture(facture.getDateFacture());
        dto.setDateEcheance(facture.getDateEcheance());
        dto.setStatut(facture.getStatut());

        // Client mapping
        dto.setClientId(facture.getClient().getId());
        dto.setClientNom(facture.getClient().getNom());  // ← Récupère le nom du client

        // Lignes mapping
        if (facture.getLignes() != null) {
            dto.setLignes(facture.getLignes().stream()
                .map(this::toDTO)
                .collect(Collectors.toList()));
        }

        // Montants
        dto.setMontantHT(facture.getMontantHT());
        dto.setTauxTVA(facture.getTauxTVA());
        dto.setMontantTVA(facture.getMontantTVA());
        dto.setMontantTTC(facture.getMontantTTC());

        dto.setNotes(facture.getNotes());
        dto.setCreatedAt(facture.getCreatedAt());

        return dto;
    }

    // LigneFacture Entity → LigneFactureDTO
    public LigneFactureDTO toDTO(LigneFacture ligne) {
        if (ligne == null) {
            return null;
        }

        LigneFactureDTO dto = new LigneFactureDTO();
        dto.setId(ligne.getId());
        dto.setDescription(ligne.getDescription());
        dto.setQuantite(ligne.getQuantite());
        dto.setPrixUnitaire(ligne.getPrixUnitaire());
        dto.setMontantLigne(ligne.getMontantLigne());

        return dto;
    }

    // CreateFactureDTO → Facture Entity
    public Facture toEntity(CreateFactureDTO dto, Client client) {
        if (dto == null) {
            return null;
        }

        Facture facture = new Facture();
        facture.setDateFacture(dto.getDateFacture());
        facture.setDateEcheance(dto.getDateEcheance());
        facture.setTauxTVA(dto.getTauxTVA());
        facture.setNotes(dto.getNotes());
        facture.setClient(client);

        return facture;
    }

    // CreateLigneFactureDTO → LigneFacture Entity
    public LigneFacture toEntity(CreateLigneFactureDTO dto, Facture facture) {
        if (dto == null) {
            return null;
        }

        LigneFacture ligne = new LigneFacture();
        ligne.setDescription(dto.getDescription());
        ligne.setQuantite(dto.getQuantite());
        ligne.setPrixUnitaire(dto.getPrixUnitaire());
        ligne.setMontantLigne(dto.getMontantLigne());
        ligne.setFacture(facture);

        return ligne;
    }

    // List<Facture> → List<FactureDTO>
    public List<FactureDTO> toDTOList(List<Facture> factures) {
        if (factures == null) {
            return null;
        }

        return factures.stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
}
