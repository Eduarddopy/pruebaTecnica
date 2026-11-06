package com.eduardo.PruebaTecnicaVeMasMas.repositorio;

import com.eduardo.PruebaTecnicaVeMasMas.entidades.Domicilio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DomicilioRepo extends JpaRepository<Domicilio, Long>{

    List<Domicilio> findByIdPersona(Long idPersona);
    
}