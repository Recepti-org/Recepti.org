package si.um.feri.Recepti.org.dao;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.Optional;

public interface UporabnikRepository extends CrudRepository<Uporabnik, Integer> {

    // Custom method to find user by their 'idUporabnika'
    Optional<Uporabnik> findByIdUporabnika(Integer idUporabnika);
}
