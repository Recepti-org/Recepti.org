package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import si.um.feri.Recepti.org.vao.SestavinaKolicina;
import java.util.List;

public interface SestavinaKolicinaRepository extends JpaRepository<SestavinaKolicina, Integer> {
    // Poišče vse sestavine s količinami za določen recept
    List<SestavinaKolicina> findByTkRecepta_Idrecepta(Integer idrecepta);
}
