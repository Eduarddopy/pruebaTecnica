package com.eduardo.PruebaTecnicaVeMasMas.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record PersonaReq(

    String nombre,

    String apellidoPaterno,

    String apellidoMaterno,

    String curp,

    String rfc,

    LocalDate fechaNacimiento,

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Correo inválido")
    String correoElectronico,

    @NotBlank(message = "El teléfono es obligatorio")
    String telefono

) {}