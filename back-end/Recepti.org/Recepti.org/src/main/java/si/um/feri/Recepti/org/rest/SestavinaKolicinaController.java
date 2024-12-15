package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.dao.SestavinaKolicinaRepository;
import si.um.feri.Recepti.org.vao.SestavinaKolicina;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SestavinaKolicinaController {

    @Autowired
    private SestavinaKolicinaRepository sestavinaKolicinaRepository;

    // Pridobi vse sestavine in količine za določen recept (za 1 osebo)
    @GetMapping("/recept/{idrecepta}")
    public ResponseEntity<List<SestavinaKolicina>> getKolicineByIdrecepta(@PathVariable Integer idrecepta) {
        return ResponseEntity.ok(sestavinaKolicinaRepository.findByTkRecepta_Idrecepta(idrecepta));
    }
    
    // Pridobi vse sestavine in količine za določen recept (izključuje "Začimbe" in "Osnovne sestavine")
    @GetMapping("/recept/{idrecepta}/filtered")
    public ResponseEntity<List<SestavinaKolicina>> getFilteredKolicineByIdrecepta(@PathVariable Integer idrecepta) {
        List<SestavinaKolicina> filteredKolicine = sestavinaKolicinaRepository.findFilteredByTkRecepta(idrecepta);
        return ResponseEntity.ok(filteredKolicine);
    }
}
