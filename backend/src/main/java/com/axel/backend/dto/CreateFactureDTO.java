package com.axel.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateFactureDTO {
    @NotNull(message = "Le client est obligatoire")
    private Long clientId;

    @NotNull(message = "La date de facture est obligatoire")
    private LocalDate dateFacture;

    private LocalDate dateEcheance;

    private BigDecimal tauxTVA;

    private String notes;

    @Valid
    private List<CreateLigneFactureDTO> lignes;
}
