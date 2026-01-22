package com.axel.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateLigneFactureDTO {
    @NotBlank(message = "La description est obligatoire")
    private String description;

    @NotNull(message = "La quantité est obligatoire")
    @Min(value = 1, message = "La quantité doit être au moins de 1")
    private Integer quantite;

    @NotNull(message = "Le prix unitaire est obligatoire")
    private BigDecimal prixUnitaire;

    public Object factureMapper;
}
