package si.um.feri.Recepti.org;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import si.um.feri.Recepti.org.vao.Uporabnik;

import static org.junit.jupiter.api.Assertions.*;

public class UporabnikTest {

    @Test
    @DisplayName("Test: Pravilna inicializacija objekta Uporabnik")
    void testUporabnikInitialization() {
        Uporabnik uporabnik = new Uporabnik("Janez", "Novak");

        assertEquals("Janez", uporabnik.getIme());
        assertEquals("Novak", uporabnik.getPriimek());
    }

    @Test
    @DisplayName("Test: Primerjava dveh enakih uporabnikov")    //pozitivni scenarij
    void testEquals_sameUsers() {
        Uporabnik user1 = new Uporabnik("Janez", "Novak");
        Uporabnik user2 = new Uporabnik("Janez", "Novak");

        assertTrue(user1.equals(user2), "Uporabnika z enakimi atributi bi morala biti enaka.");
    }

    @Test
    @DisplayName("Test: Primerjava dveh različnih uporabnikov") //negativni scenarij
    void testEquals_differentUsers() {
        Uporabnik user1 = new Uporabnik("Janez", "Novak");
        Uporabnik user2 = new Uporabnik("Ana", "Kovač");

        assertFalse(user1.equals(user2), "Uporabnika z različnimi atributi ne bi smela biti enaka.");
    }
}
