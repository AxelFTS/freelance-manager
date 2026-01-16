package com.axel.backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LigneFactureDTO {
    private Long id;
    private String description;
    private Integer quantite;
    private BigDecimal prixUnitaire;
    private BigDecimal montantLigne;
}
