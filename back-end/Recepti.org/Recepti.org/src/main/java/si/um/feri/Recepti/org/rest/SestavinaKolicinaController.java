package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.vao.SestavinaKolicina;
import si.um.feri.Recepti.org.dao.SestavinaKolicinaRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sestavine-kolicine")
public class SestavinaKolicinaController {

    @Autowired
    private SestavinaKolicinaRepository sestavinaKolicinaRepository;

    // Pridobi vse sestavine in količine za določen recept
    @GetMapping("/recept/{idrecepta}")
    public ResponseEntity<List<SestavinaKolicina>> getKolicineByIdrecepta(@PathVariable Integer idrecepta) {
        return ResponseEntity.ok(sestavinaKolicinaRepository.findByTkRecepta_Idrecepta(idrecepta));
    }

    // Pridobi preračunane količine sestavin glede na število porcij
    @GetMapping("/recept/{idrecepta}/porcije/{porcije}")
    public ResponseEntity<List<SestavinaKolicina>> getPrilagojeneKolicine(
            @PathVariable Integer idrecepta,
            @PathVariable Integer porcije) {

        // Pridobimo originalne količine iz baze
        List<SestavinaKolicina> originalneKolicine = sestavinaKolicinaRepository.findByTkRecepta_Idrecepta(idrecepta);

        // Preračunamo količine glede na število porcij
        List<SestavinaKolicina> prilagojeneKolicine = originalneKolicine.stream().map(k -> {
            SestavinaKolicina prilagojena = new SestavinaKolicina();
            prilagojena.setIdsestavinekoli(k.getIdsestavinekoli());
            prilagojena.setTkRecepta(k.getTkRecepta());
            prilagojena.setTkSestavina(k.getTkSestavina());
            prilagojena.setEnota(k.getEnota());
            prilagojena.setKolicina(k.getKolicina() * porcije); // Prilagodimo na podlagi števila porcij
            return prilagojena;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(prilagojeneKolicine);
    }
}
