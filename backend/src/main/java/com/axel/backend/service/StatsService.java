package com.axel.backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axel.backend.dto.CaMensuelDTO;
import com.axel.backend.dto.StatsOverviewDTO;
import com.axel.backend.entity.StatutFacture;
import com.axel.backend.repository.ClientRepository;
import com.axel.backend.repository.FactureRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StatsService {

    @Autowired ClientRepository clientRepository;
    @Autowired FactureRepository factureRepository;

    public StatsOverviewDTO getOverview() {
        int annee = LocalDate.now().getYear();
        int mois = LocalDate.now().getMonthValue();

        StatsOverviewDTO dto = new StatsOverviewDTO();

        dto.setTotalClients((int) clientRepository.count());
        dto.setTotalFactures((int) factureRepository.count());
        dto.setTotalFacturePayees(factureRepository.countByStatut(StatutFacture.PAYEE));

        BigDecimal caMois = factureRepository.sumMontantTTCByStatutAndMois(StatutFacture.PAYEE, annee, mois);
        dto.setChiffreAffaireMois(caMois != null ? caMois : BigDecimal.ZERO);

        BigDecimal caAnnee = factureRepository.sumMontantTTCByStatutAndAnnee(StatutFacture.PAYEE, annee);
        dto.setChiffreAffairesAnnee(caAnnee != null ? caAnnee : BigDecimal.ZERO);

        dto.setFacturesEnAttente(factureRepository.countByStatut(StatutFacture.ENVOYEE));

        BigDecimal montantEnAttente = factureRepository.sumMontantTTCByStatutAndAnnee(StatutFacture.ENVOYEE, annee);
        dto.setMontantEnAttente(montantEnAttente != null ? montantEnAttente : BigDecimal.ZERO);

        return dto;
    }

    public List<CaMensuelDTO> getCaMensuel(int annee) {
        List<Object[]> rows = factureRepository.sumMontantTTCByMoisAndAnnee(StatutFacture.PAYEE, annee);
        List<CaMensuelDTO> result = new ArrayList<>();

        for (Object[] row : rows) {
            int mois = ((Number) row[0]).intValue();
            BigDecimal montant = (BigDecimal) row[1];
            result.add(new CaMensuelDTO(mois, montant));
        }

        return result;
    }
}
