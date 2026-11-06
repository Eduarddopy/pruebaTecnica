package com.eduardo.PruebaTecnicaVeMasMas.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "domicilio")
@Getter
@Setter
@NoArgsConstructor
public class Domicilio{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String calle;

    @Column(nullable = false)
    private String numeroExterior;

    @Column(nullable = true)
    private String numeroInterior;

    @Column(nullable = false)
    private String colonia;

    @Column(nullable = false)
    private String codigoPostal;

    @Column(nullable = false)
    private String municipio;

    @Column(nullable = false)
    private String estado;

    @Column(name = "persona_id", nullable = false)
    private Long idPersona;

}