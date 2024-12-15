package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import si.um.feri.Recepti.org.vao.SestavinaKolicina;
import java.util.List;

public interface SestavinaKolicinaRepository extends JpaRepository<SestavinaKolicina, Integer> {
    // Poišče vse sestavine s količinami za določen recept
    List<SestavinaKolicina> findByTkRecepta_Idrecepta(Integer idrecepta);


    @Query("""
    SELECT sk 
    FROM SestavinaKolicina sk
    JOIN sk.tkSestavina s 
    JOIN s.Tktip t
    WHERE sk.tkRecepta.idrecepta = :idrecepta
      AND t.ime NOT IN ('Začimbe', 'Osnovne sestavine')
""")
    List<SestavinaKolicina> findFilteredByTkRecepta(Integer idrecepta);

}
