package com.eduardo.PruebaTecnicaVeMasMas.repositorio;

import com.eduardo.PruebaTecnicaVeMasMas.entidades.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepo extends JpaRepository<Persona, Long> {

    boolean existsByCurp(String curp);

    boolean existsByRfc(String rfc);

    boolean existsByCurpAndIdNot(String curp, Long id);

    boolean existsByRfcAndIdNot(String rfc, Long id);
}