package com.axel.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.axel.backend.entity.StatutFacture;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FactureDTO {
    private Long id;
    private String numero;
    private LocalDate dateFacture;
    private LocalDate dateEcheance;
    private StatutFacture statut;

    private Long clientId;
    private String clientNom;

    private List<LigneFactureDTO> lignes;

    private BigDecimal montantHT;
    private BigDecimal tauxTVA;
    private BigDecimal montantTVA;
    private BigDecimal montantTTC;

    private String notes;
    private LocalDateTime createdAt;
}
