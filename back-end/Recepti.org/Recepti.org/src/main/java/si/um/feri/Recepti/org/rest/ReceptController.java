package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.vao.Recept;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/recept")  // Base path for all endpoints in this controller
public class ReceptController {

    @Autowired
    ReceptRepository dao;

    @GetMapping
    public List<Recept> testiram() {
        return (List<Recept>) dao.findAll();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{id}")
    public ResponseEntity<Recept> getRecept(@PathVariable int id) {
        return dao.findById(id)
                .map(recept -> ResponseEntity.ok().body(recept))
                .orElse(ResponseEntity.notFound().build()); // Return 404 if not found
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/dodajrecept")
    public Recept postRecept(@RequestBody Recept recept) {  // Use @RequestBody
        System.out.println(recept);
        return dao.save(recept);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/spremeni")
    public void putRecept(@RequestBody Recept recept){
        System.out.println(recept);
        dao.save(recept);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/odstrani/{id}")
    public ResponseEntity<String> deleteRecept(@PathVariable int id) {
        // Check if the recipe exists
        if (dao.existsById(id)) {
            dao.deleteById(id); // Delete the recipe if found
            return ResponseEntity.ok("Recept je odstranjen");
        } else {
            return ResponseEntity.status(404).body("Recipe not found."); // Return 404 if not found
        }
    }

    @GetMapping("/iskanje")
    public List<Recept> searchRecepti(@RequestParam String keyword) {
        return dao.searchByKeyword(keyword);
    }

    @GetMapping("/recepti")
    public ResponseEntity<List<Recept>> getAllRecepti() {
        List<Recept> recepti = (List<Recept>) dao.findAll(); // Pridobi vse recepte
        if (recepti.isEmpty()) {
            return ResponseEntity.noContent().build(); // Vrne 204 (brez vsebine), če ni receptov
        }
        return ResponseEntity.ok(recepti); // Vrne 200 in seznam receptov
    }

}
