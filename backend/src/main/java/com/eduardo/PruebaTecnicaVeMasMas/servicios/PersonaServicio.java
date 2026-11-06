package com.eduardo.PruebaTecnicaVeMasMas.servicios;

import com.eduardo.PruebaTecnicaVeMasMas.dto.PersonaReq;
import com.eduardo.PruebaTecnicaVeMasMas.entidades.Persona;
import com.eduardo.PruebaTecnicaVeMasMas.repositorio.PersonaRepo;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PersonaServicio {

    private final PersonaRepo repository;

    public PersonaServicio(PersonaRepo repository) {
        this.repository = repository;
    }

    public Persona registrar(PersonaReq request) {

        if (repository.existsByCurp(request.curp())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "La CURP ya está registrada"
            );
        }

        if (repository.existsByRfc(request.rfc())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "El RFC ya está registrado"
            );
        }

        Persona persona = new Persona();
        actualizarDatos(persona, request);

        return repository.save(persona);
    }

    public List<Persona> listar() {
        return repository.findAll();
    }

    public Persona consultar(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Persona no encontrada"
            ));
    }

    public Persona editar(Long id, PersonaReq request) {

        Persona persona = consultar(id);

        if (repository.existsByCurpAndIdNot(request.curp(), id)) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "La CURP ya está registrada"
            );
        }

        if (repository.existsByRfcAndIdNot(request.rfc(), id)) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "El RFC ya está registrado"
            );
        }

        actualizarDatos(persona, request);

        return repository.save(persona);
    }

    public void eliminar(Long id) {
        Persona persona = consultar(id);
        repository.delete(persona);
    }

    private void actualizarDatos(Persona persona, PersonaReq request) {

        persona.setNombre(request.nombre());
        persona.setApellidoPaterno(request.apellidoPaterno());
        persona.setApellidoMaterno(request.apellidoMaterno());
        persona.setCurp(request.curp());
        persona.setRfc(request.rfc());
        persona.setFechaNacimiento(request.fechaNacimiento());
        persona.setCorreoElectronico(request.correoElectronico());
        persona.setTelefono(request.telefono());
    }
}
