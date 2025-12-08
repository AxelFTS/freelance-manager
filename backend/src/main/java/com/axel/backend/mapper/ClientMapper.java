package com.axel.backend.mapper;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.axel.backend.dto.ClientDTO;
import com.axel.backend.entity.Client;

@Component
public class ClientMapper {

    public ClientDTO toDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setNom(client.getNom());
        dto.setEmail(client.getEmail());
        dto.setAdresse(client.getAdresse());
        dto.setTelephone(client.getTelephone());
        dto.setCreatedAt(client.getCreatedAt());
        return dto;
    }

    public Client toEntity (ClientDTO dto) {
        Client client = new Client();
        client.setNom(dto.getNom());
        client.setEmail(dto.getEmail());
        client.setAdresse(dto.getAdresse());
        client.setTelephone(dto.getTelephone());
        return client;
    }

    public List<ClientDTO> toDTOList(List<Client> clients) {
        List<ClientDTO> dtos = new ArrayList<>(); 

        for (Client client : clients) {
            dtos.add(toDTO(client));
        }
        return dtos;
    }
}
