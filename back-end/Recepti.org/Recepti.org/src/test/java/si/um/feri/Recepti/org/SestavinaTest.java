package si.um.feri.Recepti.org;

import org.junit.jupiter.api.Test;
import si.um.feri.Recepti.org.vao.Sestavina;
import si.um.feri.Recepti.org.vao.TipSestavine;

import static org.junit.jupiter.api.Assertions.*;

public class SestavinaTest {

        @Test
        void testConstructorAndGetters() {
            TipSestavine tip = new TipSestavine();
            tip.setIme("Zelenjava");

            Sestavina sestavina = new Sestavina(99, "Korenje", tip);

            assertEquals(99, sestavina.getIdsestavine());
            assertEquals("Korenje", sestavina.getIme());
            assertEquals(tip, sestavina.getTktip());
        }

        @Test
        void testDefaultConstructorAndSetters() {
            Sestavina sestavina = new Sestavina();
            TipSestavine tip = new TipSestavine();
            tip.setIme("Mlečni izdelki");

            sestavina.setIdsestavine(101);
            sestavina.setIme("Mleko");
            sestavina.setTktip(tip);
            sestavina.setCena(1.2f);

            assertEquals(101, sestavina.getIdsestavine());
            assertEquals("Mleko", sestavina.getIme());
            assertEquals(tip, sestavina.getTktip());
            assertEquals(1.2f, sestavina.getCena());
        }

        @Test
        void testPartialConstructor() {
            Sestavina sestavina = new Sestavina("Jajce");

            assertEquals("Jajce", sestavina.getIme());
            assertNull(sestavina.getTktip());
            assertEquals(0, sestavina.getIdsestavine()); // default vrednost za int
        }

        @Test
        void testSetCena() {
            Sestavina sestavina = new Sestavina();
            sestavina.setCena(0.99f);

            assertEquals(0.99f, sestavina.getCena());
        }


}
