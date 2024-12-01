package si.um.feri.Recepti.org;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.dao.UporabnikRepository;
import si.um.feri.Recepti.org.rest.ReceptController;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class ReceptTest {

    @Autowired
    ReceptRepository dao;

    @Autowired
    UporabnikRepository uporabnikRepo;
    @Autowired
    ReceptController controller;


    @AfterEach
    void ciscenje() {
        dao.deleteAll();
    }

    @ParameterizedTest
    @CsvSource({
            "Peter, Klepec",
            "Ana, Novak",
    })
    public void testiram_dodajanjerecepta(String ime, String primek) {
            Uporabnik upo = new Uporabnik(ime, primek);
            uporabnikRepo.save(upo);
            Recept novrecept = new Recept(upo, 4, 10.0, "Test Opis", "Recept2", "URL");
            dao.save(novrecept);

            Optional<Recept> dodanrecept = dao.findById(novrecept.getIdrecepta());

            assertTrue(dodanrecept.isPresent());
            assertEquals("Recept2", dodanrecept.get().getIme());
            assertEquals("Test Opis", dodanrecept.get().getOpis());
        }


    @Test
    public void testiram_brisanje() {
        Optional<Recept> recept = dao.findById(0);

        // When
        dao.delete(recept.get());

        // Then
        assertFalse(dao.existsById(recept.get().getIdrecepta()));
    }

}



