package com.axel.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.axel.backend.dto.CaMensuelDTO;
import com.axel.backend.dto.StatsOverviewDTO;
import com.axel.backend.service.StatsService;

@RestController
@RequestMapping("api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/overview")
    public StatsOverviewDTO getOverview() {
        return statsService.getOverview();
    }

    @GetMapping("/ca-mensuel")
    public List<CaMensuelDTO> getCaMensuel(@RequestParam int annee) {
        return statsService.getCaMensuel(annee);
    }
}
