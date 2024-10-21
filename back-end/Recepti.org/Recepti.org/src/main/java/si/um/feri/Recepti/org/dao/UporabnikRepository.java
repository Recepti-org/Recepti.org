package si.um.feri.Recepti.org.dao;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.Recepti.org.vao.Koraki;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.List;

public interface UporabnikRepository extends CrudRepository<Uporabnik, Integer> {

}
