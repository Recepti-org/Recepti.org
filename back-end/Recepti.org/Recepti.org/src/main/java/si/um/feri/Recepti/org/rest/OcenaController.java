package si.um.feri.Recepti.org.controller;

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
}
