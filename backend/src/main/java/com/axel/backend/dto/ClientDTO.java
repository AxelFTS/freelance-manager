package com.axel.backend.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDTO {

    private Long id;
    
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @Email
    @NotBlank(message = "L'email est obligatoire") 
    private String email;
    
    @Size(max = 255, message = "L'adresse ne peux pas dépasser 255 caractères")
    private String adresse;

    @Size(max = 20, message = "Le numéro de téléphone ne peux pas dépasser 20 caractères")
    private String telephone;
    private LocalDateTime createdAt;
}
