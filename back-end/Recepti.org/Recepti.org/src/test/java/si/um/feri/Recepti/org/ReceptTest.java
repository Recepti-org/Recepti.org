package si.um.feri.Recepti.org;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import si.um.feri.Recepti.org.dao.ReceptRepository;
import si.um.feri.Recepti.org.dao.UporabnikRepository;
import si.um.feri.Recepti.org.rest.ReceptController;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import java.util.Optional;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ExtendWith(MockitoExtension.class)
public class ReceptTest {

    @Mock
    private ReceptRepository receptRepository; // Mock the ReceptRepository

    @InjectMocks
    private ReceptController receptController; // Inject the mocked repository into the controller

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


    /*@Test
    public void testiram_brisanje() {
        Optional<Recept> recept = dao.findById(0);

        // When
        dao.delete(recept.get());

        // Then
        assertFalse(dao.existsById(recept.get().getIdrecepta()));
    }*/

    @Test
    public void testiram_brisanje2() {
        // Arrange: Dodajte testne podatke
        Uporabnik uporabnik = new Uporabnik("Test", "Uporabnik");
        uporabnikRepo.save(uporabnik);
        Recept novRecept = new Recept(uporabnik, 4, 15.0, "Test Opis", "Test Recept", "URL");
        dao.save(novRecept);

        // Act: Poiščite in izbrišite recept
        Optional<Recept> recept = dao.findById(novRecept.getIdrecepta());
        assertTrue(recept.isPresent()); // Preverite, ali obstaja
        dao.delete(recept.get());

        // Assert: Preverite, ali je recept izbrisan
        assertFalse(dao.existsById(novRecept.getIdrecepta()));
    }


    // Preveri, da kontroler vrne seznam receptov s statusom 200 OK, ko so recepti na voljo
        @Test
        public void testGetAllRecepti_ReturnsReceptiList() {
            // Arrange
            Uporabnik uporabnik = new Uporabnik("Test", "Uporabnik");
            Recept r1 = new Recept(uporabnik, 2, 15, "Opis1", "Test1", "URL");
            Recept r2 = new Recept(uporabnik, 4, 30, "Opis2", "Test2", "URL");
            List<Recept> recepti = Arrays.asList(r1, r2);

            when(receptRepository.findAll()).thenReturn(recepti);

            // Act
            ResponseEntity<List<Recept>> response = receptController.getAllRecepti();

            // Assert
            assertEquals(200, response.getStatusCodeValue()); // Status 200 OK
            assertEquals(2, response.getBody().size()); // Verify that the list contains 2 recipes
            assertEquals("Recept 1", response.getBody().get(0).getIme()); // Verify that the first recipe is "Recept 1"
            assertEquals("Recept 2", response.getBody().get(1).getIme()); // Verify that the second recipe is "Recept 2"
            verify(receptRepository, times(1)).findAll(); // Verify that the findAll() method was called once
        }

        //Preveri, da kontroler vrne status 204 No Content, ko ni receptov
        @Test
        public void testGetAllRecepti_ReturnsNoContent() {
            // Arrange
            when(receptRepository.findAll()).thenReturn(Arrays.asList()); // Simulate an empty list of recipes

            // Act
            ResponseEntity<List<Recept>> response = receptController.getAllRecepti();

            // Assert
            assertEquals(204, response.getStatusCodeValue()); // Status 204 No Content
            assertNull(response.getBody()); // Verify that the response body is null
            verify(receptRepository, times(1)).findAll(); // Verify that the findAll() method was called once
        }

}



