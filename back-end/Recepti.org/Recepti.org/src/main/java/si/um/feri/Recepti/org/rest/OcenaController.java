/*package si.um.feri.Recepti.org.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Recepti.org.dao.OcenaRepository;
import si.um.feri.Recepti.org.vao.Ocena;
import java.util.List;
@RestController
@RequestMapping("/ocena")
public class OcenaController {
    @Autowired
    private OcenaRepository ocenaRepository;
    // Example endpoint to fetch all Ocena by a specific Recept ID
    @GetMapping("/byRecept/{idrecepta}")
    public List<Ocena> getOcenaByReceptId(@PathVariable int idrecepta) {
        return ocenaRepository.findByTKrecepta_Idrecepta(idrecepta);
    }
}*/

package si.um.feri.Recepti.org.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
        import si.um.feri.Recepti.org.dao.OcenaRepository;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.dao.UporabnikRepository;
import si.um.feri.Recepti.org.vao.Ocena;
import si.um.feri.Recepti.org.vao.Recept;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ocena")
@CrossOrigin // Allow requests from the frontend
public class OcenaController {

    @Autowired
    private OcenaRepository ocenaRepository;

    @Autowired
    private ReceptRepository receptDao;  // Make sure you have this injected

    @Autowired
    private UporabnikRepository uporabnikDao;

    @PostMapping("/save")
    public Ocena saveOcena(@RequestBody Ocena ocena) {


        System.out.println(ocena);
        // Poišči recept z ID-jem, ki je prejet v telesu zahteve
        Optional<Recept> receptOptional = receptDao.findById(2);    //ocena.getTKrecepta().getIdrecepta()
        if (receptOptional.isPresent()) {
            Recept recept = receptOptional.get();
            ocena.setTKrecepta(recept); // Nastavi povezavo z receptom
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recept not found");
        }

        Optional<Uporabnik> uporabnik = uporabnikDao.findById(1);
        ocena.setTKuporabnik(uporabnik.get());
        return ocenaRepository.save(ocena);
    }


    @GetMapping("/ocena/{id}")
    public List<Ocena> getOceneByReceptId(@PathVariable int id) {
        // Poišči recept s tem ID-jem
        Optional<Recept> receptOptional = receptDao.findById(id);
        if (receptOptional.isPresent()) {
            Recept recept = receptOptional.get(); // Če recept obstaja, ga pridobi
            // Poišči vse ocene, povezane z tem receptom
            return ocenaRepository.findByTKrecepta(recept);
        } else {
            // Če recept ne obstaja, vrne napako 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recept not found");
        }
    }

    @GetMapping("/uporabnik/{userId}")
    public List<Ocena> getOceneByUserId(@PathVariable int userId) {
        // Find the user with the given ID
        Optional<Uporabnik> uporabnikOptional = uporabnikDao.findById(userId);
        if (uporabnikOptional.isPresent()) {
            Uporabnik uporabnik = uporabnikOptional.get();
            // Fetch and return all ratings by this user
            return ocenaRepository.findByTKuporabnik(uporabnik);
        } else {
            // If user not found, return 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }


    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/spremeni")
    public void putRecept(@RequestBody Ocena ocena){
        System.out.println(ocena);
        ocenaRepository.save(ocena);
    }

}
