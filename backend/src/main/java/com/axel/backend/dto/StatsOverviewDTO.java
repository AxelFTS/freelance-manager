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
public class StatsOverviewDTO {

    private Integer totalClients;
    private Integer totalFactures;
    private Integer totalFacturePayees;
    private BigDecimal chiffreAffaireMois;
    private BigDecimal chiffreAffairesAnnee;
    private Integer facturesEnAttente;
    private BigDecimal montantEnAttente;
}