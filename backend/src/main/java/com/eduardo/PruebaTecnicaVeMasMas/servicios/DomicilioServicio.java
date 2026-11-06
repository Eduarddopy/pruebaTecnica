package com.eduardo.PruebaTecnicaVeMasMas.servicios;

import com.eduardo.PruebaTecnicaVeMasMas.dto.DomicilioReq;
import com.eduardo.PruebaTecnicaVeMasMas.entidades.Domicilio;
import com.eduardo.PruebaTecnicaVeMasMas.repositorio.DomicilioRepo;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DomicilioServicio{

    private final DomicilioRepo repository;

    public DomicilioServicio(DomicilioRepo repository){
        this.repository = repository;
    }

    public Domicilio registrar(DomicilioReq request){

        Domicilio domicilio = new Domicilio();
        actualizarDatos(domicilio, request);

        return repository.save(domicilio);

    }

    public List<Domicilio> listar(){
        return repository.findAll();
    }

    public Domicilio consultar(Long id){
        return repository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "Domicilio no encontrado"
        ));
    }

    public List<Domicilio> consultarDomicilioPersona(Long id) {
        return repository.findByIdPersona(id);
    }

    public Domicilio editar(Long id, DomicilioReq request){

        Domicilio domicilio = consultar(id);

        actualizarDatos(domicilio, request);

        return repository.save(domicilio);
    }

    public void eliminar(Long id){
        Domicilio domicilio = consultar(id);
        repository.delete(domicilio);
    }

    private void actualizarDatos(Domicilio domicilio, DomicilioReq request){

        domicilio.setCalle(request.calle());
        domicilio.setNumeroExterior(request.numeroExterior());
        domicilio.setNumeroInterior(request.numeroInterior());
        domicilio.setColonia(request.colonia());
        domicilio.setCodigoPostal(request.codigoPostal());
        domicilio.setMunicipio(request.municipio());
        domicilio.setEstado(request.estado());
        domicilio.setIdPersona(request.idPersona());
    }
}