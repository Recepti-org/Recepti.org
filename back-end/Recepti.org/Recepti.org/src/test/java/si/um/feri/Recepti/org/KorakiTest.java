package si.um.feri.Recepti.org;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import si.um.feri.Recepti.org.vao.Koraki;
import si.um.feri.Recepti.org.vao.Recept;
import si.um.feri.Recepti.org.vao.Uporabnik;

import static org.junit.jupiter.api.Assertions.*;

public class KorakiTest {

    // Setup metoda, ki se izvede pred vsem testiranjem
    @BeforeAll
    static void init() {
        System.out.println("Začetek testiranja!");
    }

    // Pozitivni scenarij: Pravilna inicializacija objekta Koraki
    @Test
    @DisplayName("Test: Pravilna inicializacija objekta Koraki")
    void testKorakiInitialization() {
        // Ustvarimo nov recept in nov korak
        Recept recept = new Recept(new Uporabnik("Test ime", "Test priimek"), 1, 10, "Testni opis", "Testni recept", "images.jpg");
        Koraki korak = new Koraki(recept, 1, "Zmešaj sestavine.");

        // Preverimo, da so atributi koraka pravilno nastavljeni
        assertEquals("Zmešaj sestavine.", korak.getOpis(), "Opis koraka se mora ujemati.");
        assertEquals(1, korak.getStkoraka(), "Številka koraka se mora ujemati.");
        assertEquals(recept, korak.getTKrecepta(), "Recept, povezan s korakom, se mora ujemati.");
    }

    // Pozitivni scenarij: Primerjava dveh objektov Koraki
    @Test
    @DisplayName("Test: Primerjava dveh objektov Koraki")
    void testEquals_sameObjects() {
        // Ustvarimo dva identična koraka
        Recept recept = new Recept(new Uporabnik("Test ime", "Test priimek"), 1, 10, "Testni opis", "Testni recept", "images.jpg");
        Koraki korak1 = new Koraki(recept, 1, "Zmešaj sestavine.");
        Koraki korak2 = new Koraki(recept, 1, "Zmešaj sestavine.");

        // Preverimo, da sta objekta enaka
        assertTrue(korak1.equals(korak2), "Koraka z enakimi atributi bi morala biti enaka.");
    }

    // Negativni scenarij: Neenakost dveh objektov Koraki
    @Test
    @DisplayName("Test: Neenakost dveh objektov Koraki")
    void testEquals_differentObjects() {
        // Ustvarimo dva različna recepta in dva različna koraka
        Recept recept1 = new Recept(new Uporabnik("Test ime", "Test priimek"), 1, 10, "Testni opis", "Testni recept", "images.jpg");
        Recept recept2 = new Recept(new Uporabnik("Test ime2", "Test priimek2"), 2, 11, "Testni opis2", "Testni recept2", "images.jpg");

        Koraki korak1 = new Koraki(recept1, 1, "Zmešaj sestavine");
        Koraki korak2 = new Koraki(recept2, 1, "Zmešaj sestavine2");

        // Preverimo, da sta objekta različna
        assertFalse(korak1.equals(korak2), "Koraka z različnimi atributi ne bi smela biti enaka.");
    }
}

