package mx.ipn.escom.ProyectoFinal.repositories;

import mx.ipn.escom.ProyectoFinal.models.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Rol, Long> {
    Optional<Rol> findByNombre(String nombre);
}
