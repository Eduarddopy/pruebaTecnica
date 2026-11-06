package com.eduardo.PruebaTecnicaVeMasMas.dto;

import jakarta.validation.constraints.*;


public record DomicilioReq(

    String calle,

    String numeroExterior,

    String numeroInterior,

    String colonia,

    String codigoPostal,

    String municipio,

    String estado,

    Long idPersona
){}