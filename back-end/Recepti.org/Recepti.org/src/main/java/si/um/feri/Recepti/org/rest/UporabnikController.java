package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.dao.UporabnikRepository;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
 // Base path for all endpoints in this controller
public class UporabnikController {

    @Autowired
    UporabnikRepository dao;
    @Autowired
    ReceptRepository daor;

    // Handle OPTIONS requests
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build(); // Respond to preflight requests
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public List<Uporabnik> testiram() {
        return (List<Uporabnik>) dao.findAll();
    }
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{id}")
    public ResponseEntity<Uporabnik> getRecept(@PathVariable int id) {
        return dao.findById(id)
                .map(recept -> ResponseEntity.ok().body(recept))
                .orElse(ResponseEntity.notFound().build()); // Return 404 if not found
    }

    @GetMapping("/uporabniki/{id}/recepti")
    public ResponseEntity<List<Recept>> getReceptiByUporabnik(@PathVariable int id) {
        return (ResponseEntity<List<Recept>>) dao.findById(id)
                .map(uporabnik -> {
                    List<Recept> recepti = daor.findByUporabnik(uporabnik);
                    if (recepti.isEmpty()) {
                        return ResponseEntity.notFound().build(); // Return 404 if no recipes found
                    }
                    return ResponseEntity.ok(recepti);
                })
                .orElse(ResponseEntity.notFound().build()); // Return 404 if user not found
    }
}

