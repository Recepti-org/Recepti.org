package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.vao.Sestavina;
import si.um.feri.Recepti.org.dao.SestavinaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/sestavine")
public class SestavinaController {

    @Autowired
    private SestavinaRepository sestavinaRepository;

    // Dobimo vse sestavine
    @GetMapping
    public ResponseEntity<List<Sestavina>> getAllSestavine() {
        List<Sestavina> sestavine = sestavinaRepository.findAll(Sort.by(Sort.Order.asc("ime"))); // Sorting by 'ime'
        return ResponseEntity.ok(sestavine);
    }


    // Dodaj novo sestavino
    @PostMapping
    public ResponseEntity<Sestavina> createSestavina(@RequestBody Sestavina sestavina) {
        return ResponseEntity.ok(sestavinaRepository.save(sestavina));
    }

    // Pridobi sestavino po ID
    @GetMapping("/{id}")
    public ResponseEntity<Sestavina> getSestavinaById(@PathVariable Integer id) {
        return sestavinaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Posodobi sestavino
    @PutMapping("/{id}")
    public ResponseEntity<Sestavina> updateSestavina(@PathVariable Integer id, @RequestBody Sestavina updatedSestavina) {
        return sestavinaRepository.findById(id).map(sestavina -> {
            sestavina.setIme(updatedSestavina.getIme());
            return ResponseEntity.ok(sestavinaRepository.save(sestavina));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Izbriši sestavino
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSestavina(@PathVariable Integer id) {
        if (sestavinaRepository.existsById(id)) {
            sestavinaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

