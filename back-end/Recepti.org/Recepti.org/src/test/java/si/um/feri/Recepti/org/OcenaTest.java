package si.um.feri.Recepti.org;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import si.um.feri.Recepti.org.vao.*;

import static org.junit.jupiter.api.Assertions.*;

class OcenaTest {

    @Test
    void testOcenaInitialization() {
        Recept recept = new Recept(new Uporabnik("Janez", "Novak"), 3, 45.5, "Testen recept", "Ime recepta", "slika.png");
        Ocena ocena = new Ocena(1, 5, "Odlično!", "Ali je recept enostaven?", recept);

        assertEquals(1, ocena.getIdOcena());
        assertEquals(5, ocena.getStZvezdic());
        assertEquals("Odlično!", ocena.getMnenje());
        assertEquals("Ali je recept enostaven?", ocena.getVprasanje());
        assertEquals(recept, ocena.getTKrecepta());
    }

    @Test
    void testInvalidRating() {
        Recept recept = new Recept();
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Ocena(1, 6, "Previsoka ocena", "Napaka?", recept); // Ocena izven obsega
        });
        assertEquals("Ocena mora biti med 1 in 5.", exception.getMessage());
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 3, 5}) // Testiranje različnih veljavnih ocen
    void testValidRatings(int rating) {
        Recept recept = new Recept();
        Ocena ocena = new Ocena(1, rating, "Mnenje", "Vprašanje", recept);

        assertEquals(rating, ocena.getStZvezdic());
        assertEquals(recept, ocena.getTKrecepta());
    }

    @Test
    void testOcenaWithUser() {
        Uporabnik uporabnik = new Uporabnik("Ana", "Kranjc");
        Recept recept = new Recept(uporabnik, 2, 30.0, "Opis", "Ime", "slika.jpg");
        Ocena ocena = new Ocena(1, 4, "Solidno", "Je bilo enostavno?", recept, uporabnik);

        assertEquals(uporabnik, ocena.getTKuporabnik());
        assertEquals(recept, ocena.getTKrecepta());
        assertEquals(4, ocena.getStZvezdic());
    }

    @RepeatedTest(3) // Ponavljanje testa
    void testRepeatedOcenaInitialization() {
        Recept recept = new Recept();
        Ocena ocena = new Ocena(1, 5, "Super", "Je bilo dobro?", recept);

        assertNotNull(ocena);
        assertEquals(5, ocena.getStZvezdic());
    }

    @TestFactory
    Iterable<DynamicTest> dynamicTestsForInvalidRatings() {
        return java.util.List.of(
                DynamicTest.dynamicTest("Negative rating", () -> {
                    Recept recept = new Recept();
                    assertThrows(IllegalArgumentException.class, () -> new Ocena(1, -1, "Napaka", "Vprašanje", recept));
                }),
                DynamicTest.dynamicTest("Zero rating", () -> {
                    Recept recept = new Recept();
                    assertThrows(IllegalArgumentException.class, () -> new Ocena(1, 0, "Napaka", "Vprašanje", recept));
                }),
                DynamicTest.dynamicTest("Over max rating", () -> {
                    Recept recept = new Recept();
                    assertThrows(IllegalArgumentException.class, () -> new Ocena(1, 10, "Napaka", "Vprašanje", recept));
                })
        );
    }
}
