package com.axel.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axel.backend.dto.ClientDTO;
import com.axel.backend.entity.Client;
import com.axel.backend.exception.EmailAlreadyExistsException;
import com.axel.backend.exception.ResourceNotFoundException;
import com.axel.backend.mapper.ClientMapper;
import com.axel.backend.repository.ClientRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientMapper clientMapper;
    
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    public List<ClientDTO> findAll() {
        List<Client> clients = clientRepository.findAll();
        return clientMapper.toDTOList(clients);
    }

    public ClientDTO findById(Long id) {
        Client client = clientRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Client introuvable avec l'ID: " + id));
        return clientMapper.toDTO(client);
    }

    public ClientDTO create(ClientDTO dto) {
        logger.info("Tentative de création d'un client avec l'email : {}", dto.getEmail());
        if (clientRepository.existsByEmail(dto.getEmail())) {
            logger.warn("Échec de la création : l'email {} existe déjà", dto.getEmail());
            throw new EmailAlreadyExistsException("L'email existe déjà");
        }
        Client client = clientMapper.toEntity(dto);
        clientRepository.save(client); 
        ClientDTO clientDto = clientMapper.toDTO(client);
        logger.info("Client créé avec succès : {}", client.getId());
        return clientDto;
    }

    public ClientDTO update(Long id, ClientDTO dto) {
        Client existingClient = clientRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Le Client n'existe pas avec l'id: " + id));

        if (clientRepository.existsByEmail(dto.getEmail()) && !existingClient.getEmail().equals(dto.getEmail())) {
            logger.warn("Email déjà utilisé : {}", dto.getEmail());
            throw new EmailAlreadyExistsException("L'email suivante est déjà utilisé: " + dto.getEmail());
        }

        existingClient.setNom(dto.getNom());
        existingClient.setAdresse(dto.getAdresse());
        existingClient.setEmail(dto.getEmail());
        existingClient.setTelephone(dto.getTelephone());

        clientRepository.save(existingClient);
        logger.info("Client mis à jour avec l'ID: {}", id);

        return clientMapper.toDTO(existingClient);
    }

    public void delete(Long id) {
        if (!clientRepository.existsById(id)) {
            logger.warn("Tentative de suppression d'un client inexistant avec l'ID: {}", id);
            throw new ResourceNotFoundException("Le Client n'existe pas avec l'id: " + id);
        }
        clientRepository.deleteById(id);
        logger.info("Client supprimé avec succès avec l'ID: {}", id);
    }
}
