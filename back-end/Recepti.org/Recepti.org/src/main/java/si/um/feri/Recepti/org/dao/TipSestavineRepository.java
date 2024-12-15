package si.um.feri.Recepti.org.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import si.um.feri.Recepti.org.vao.SestavinaKolicina;
import java.util.List;

public interface TipSestavineRepository extends JpaRepository<SestavinaKolicina, Integer> {

}
