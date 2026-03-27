package com.axel.backend.repository;

import java.util.List;
import java.util.Optional;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.axel.backend.entity.Facture;
import com.axel.backend.entity.StatutFacture;

public interface FactureRepository extends JpaRepository<Facture, Long> {
    public List<Facture> findByClientId(Long clientId);
    public List<Facture> findByStatut(StatutFacture statut);

    public Optional<Facture> findByNumero(String numero);

    public Long countByNumeroStartingWith(String prefix);

    public Optional<Facture> findFirstByNumeroStartingWithOrderByNumeroDesc(String prefix);

    public Integer countByStatut(StatutFacture statut);

    @Query("SELECT SUM(f.montantTTC) FROM Facture f WHERE f.statut = :statut AND YEAR(f.dateFacture) = :annee AND MONTH(f.dateFacture) = :mois")
    BigDecimal sumMontantTTCByStatutAndMois(@Param("statut") StatutFacture statut, @Param("annee") int annee, @Param("mois") int mois);

    @Query("SELECT SUM(f.montantTTC) FROM Facture f WHERE f.statut = :statut AND YEAR(f.dateFacture) = :annee")
    BigDecimal sumMontantTTCByStatutAndAnnee(@Param("statut") StatutFacture statut, @Param("annee") int annee);

    @Query("SELECT MONTH(f.dateFacture), SUM(f.montantTTC) FROM Facture f WHERE f.statut = :statut AND YEAR(f.dateFacture) = :annee GROUP BY MONTH(f.dateFacture) ORDER BY MONTH(f.dateFacture)")
    List<Object[]> sumMontantTTCByMoisAndAnnee(@Param("statut") StatutFacture statut, @Param("annee") int annee);
}
