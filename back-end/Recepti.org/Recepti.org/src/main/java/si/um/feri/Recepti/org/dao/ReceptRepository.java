package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.List;

public interface ReceptRepository extends CrudRepository<Recept, Integer> {
    List<Recept> findByUporabnik(Uporabnik uporabnik);


    @Query("SELECT r FROM Recept r WHERE LOWER(r.ime) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(r.opis) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Recept> searchByKeyword(@Param("keyword") String keyword);

}
