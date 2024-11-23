package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import si.um.feri.Recepti.org.vao.Ocena;

import java.util.List;

public interface OcenaRepository extends JpaRepository<Ocena, Integer> {

    // Query by the 'idrecepta' field in the related 'Recept' entity
    List<Ocena> findByTKrecepta_Idrecepta(int idrecepta);
}
