package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import si.um.feri.Recepti.org.dao.KorakiRepository;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.vao.Koraki;
import si.um.feri.Recepti.org.vao.Recept;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class KorakiController {

    @Autowired
    KorakiRepository dao;

    @Autowired
    private ReceptRepository receptDao;  // Make sure you have this injected

    @GetMapping("koraki/{id}")
    public List<Koraki> getRecept(@PathVariable int id) {
        Optional<Recept> receptOptional = receptDao.findById(id);
        if (receptOptional.isPresent()) {
            Recept recept = receptOptional.get();
            return dao.findByTKrecepta(recept);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recept not found");
        }
    }


    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/dodajkorak")
    public Koraki postKorak(@RequestBody Koraki korak) {  // Add @RequestBody
        System.out.println(korak);
        dao.save(korak);
        return korak;
    }
}
