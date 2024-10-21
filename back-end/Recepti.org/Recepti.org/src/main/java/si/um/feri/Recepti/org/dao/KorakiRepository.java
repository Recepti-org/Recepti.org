package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import si.um.feri.Recepti.org.vao.Koraki;
import si.um.feri.Recepti.org.vao.Recept;

import java.util.List;

public interface KorakiRepository extends CrudRepository<Koraki, Integer> {
    List<Koraki> findByTKrecepta(Recept recept);
}
