package com.eduardo.PruebaTecnicaVeMasMas.controller;

import com.eduardo.PruebaTecnicaVeMasMas.dto.PersonaReq;
import com.eduardo.PruebaTecnicaVeMasMas.entidades.Persona;
import com.eduardo.PruebaTecnicaVeMasMas.servicios.PersonaServicio;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "*")
public class PersonasController {

    private final PersonaServicio service;

    public PersonasController(PersonaServicio service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Persona> registrar(
        @Valid @RequestBody PersonaReq request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.registrar(request));
    }

    @GetMapping
    public ResponseEntity<List<Persona>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> consultar(@PathVariable Long id) {
        return ResponseEntity.ok(service.consultar(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Persona> editar(
        @PathVariable Long id,
        @Valid @RequestBody PersonaReq request
    ) {
        return ResponseEntity.ok(service.editar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}