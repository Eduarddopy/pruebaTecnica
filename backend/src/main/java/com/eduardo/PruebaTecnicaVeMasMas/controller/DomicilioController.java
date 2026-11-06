package com.eduardo.PruebaTecnicaVeMasMas.controller;

import com.eduardo.PruebaTecnicaVeMasMas.dto.DomicilioReq;
import com.eduardo.PruebaTecnicaVeMasMas.entidades.Domicilio;
import com.eduardo.PruebaTecnicaVeMasMas.servicios.DomicilioServicio;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/domicilios")
@CrossOrigin(origins = "*")
public class DomicilioController {

    private final DomicilioServicio service;

    public DomicilioController(DomicilioServicio service){
        this.service = service;    
    }

    @PostMapping
    public ResponseEntity<Domicilio> registrar(
        @Valid @RequestBody DomicilioReq request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.registrar(request));
    }

    @GetMapping
    public ResponseEntity<List<Domicilio>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/asociados/{id}")
    public ResponseEntity<List<Domicilio>> consultarDomicilioPersona(@PathVariable Long id){
        return ResponseEntity.ok(service.consultarDomicilioPersona(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Domicilio> consultar(@PathVariable Long id) {
        return ResponseEntity.ok(service.consultar(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domicilio> editar(
        @PathVariable Long id,
        @Valid @RequestBody DomicilioReq request
    ) {
        return ResponseEntity.ok(service.editar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}