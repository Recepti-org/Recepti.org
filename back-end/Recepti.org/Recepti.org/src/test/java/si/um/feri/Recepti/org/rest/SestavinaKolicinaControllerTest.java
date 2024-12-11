package si.um.feri.Recepti.org.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SestavinaKolicinaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testEndpoint() throws Exception {
        mockMvc.perform(get("/api/sestavine-kolicine/recept/{id}", 1))  // Corrected URL with path variable
                .andExpect(status().isOk())  // Expecting HTTP status 200 (OK)
                .andExpect(content().contentType("application/json"))  // Expecting JSON response
                .andExpect(content().json("["
                        + "{"
                        + "\"idsestavinakoli\":1,"
                        + "\"kolicina\":200,"
                        + "\"enota\":\"g\","
                        + "\"tkSestavina\":{\"idsestavine\":1,\"ime\":\"Moka\"},"
                        + "\"tkRecepta\":{\"idrecepta\":1,\"ime\":\"Rižota s piščancem\",\"opis\":\"Okusna piščančja rižota\",\"caspriprave\":36.0,\"tezavnost\":2,\"slika\":\"Rizota-s-piscancem-in-zelenjavo-500x375.jpg\",\"uporabnik\":{\"idUporabnika\":1,\"ime\":\"Marko\",\"priimek\":\"Novak\"}}"
                        + "},"
                        + "{"
                        + "\"idsestavinakoli\":2,"
                        + "\"kolicina\":100,"
                        + "\"enota\":\"g\","
                        + "\"tkSestavina\":{\"idsestavine\":2,\"ime\":\"Sladkor\"},"
                        + "\"tkRecepta\":{\"idrecepta\":1,\"ime\":\"Rižota s piščancem\",\"opis\":\"Okusna piščančja rižota\",\"caspriprave\":36.0,\"tezavnost\":2,\"slika\":\"Rizota-s-piscancem-in-zelenjavo-500x375.jpg\",\"uporabnik\":{\"idUporabnika\":1,\"ime\":\"Marko\",\"priimek\":\"Novak\"}}"
                        + "},"
                        + "{"
                        + "\"idsestavinakoli\":3,"
                        + "\"kolicina\":50,"
                        + "\"enota\":\"g\","
                        + "\"tkSestavina\":{\"idsestavine\":3,\"ime\":\"Maslo\"},"
                        + "\"tkRecepta\":{\"idrecepta\":1,\"ime\":\"Rižota s piščancem\",\"opis\":\"Okusna piščančja rižota\",\"caspriprave\":36.0,\"tezavnost\":2,\"slika\":\"Rizota-s-piscancem-in-zelenjavo-500x375.jpg\",\"uporabnik\":{\"idUporabnika\":1,\"ime\":\"Marko\",\"priimek\":\"Novak\"}}"
                        + "},"
                        + "{"
                        + "\"idsestavinakoli\":4,"
                        + "\"kolicina\":2,"
                        + "\"enota\":\"pcs\","
                        + "\"tkSestavina\":{\"idsestavine\":4,\"ime\":\"Jajca\"},"
                        + "\"tkRecepta\":{\"idrecepta\":1,\"ime\":\"Rižota s piščancem\",\"opis\":\"Okusna piščančja rižota\",\"caspriprave\":36.0,\"tezavnost\":2,\"slika\":\"Rizota-s-piscancem-in-zelenjavo-500x375.jpg\",\"uporabnik\":{\"idUporabnika\":1,\"ime\":\"Marko\",\"priimek\":\"Novak\"}}"
                        + "},"
                        + "{"
                        + "\"idsestavinakoli\":5,"
                        + "\"kolicina\":1,"
                        + "\"enota\":\"tsp\","
                        + "\"tkSestavina\":{\"idsestavine\":5,\"ime\":\"Sol\"},"
                        + "\"tkRecepta\":{\"idrecepta\":1,\"ime\":\"Rižota s piščancem\",\"opis\":\"Okusna piščančja rižota\",\"caspriprave\":36.0,\"tezavnost\":2,\"slika\":\"Rizota-s-piscancem-in-zelenjavo-500x375.jpg\",\"uporabnik\":{\"idUporabnika\":1,\"ime\":\"Marko\",\"priimek\":\"Novak\"}}"
                        + "}"
                        + "]"));
    }
}
