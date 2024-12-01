/*package si.um.feri.Recepti.org;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import si.um.feri.Recepti.org.dao.KorakiRepository;
import si.um.feri.Recepti.org.rest.KorakiController;
import si.um.feri.Recepti.org.vao.Koraki;
import si.um.feri.Recepti.org.vao.Recept;

import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class KorakiControllerTest {

    @Mock
    private KorakiRepository korakiRepository;  // Mocking the repository

    @InjectMocks
    private KorakiController korakiController;  // Injecting mocks into the controller

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(korakiController).build();  // Ensure standalone setup
    }

    @Test
    void testCreateKorak() throws Exception {
        Koraki korak = new Koraki(new Recept(), 1, "Step description");

        // Mocking the repository method to return the Koraki object
        when(korakiRepository.save(any(Koraki.class))).thenReturn(korak);

        mockMvc.perform(post("/api/koraki")
                        .contentType("application/json")
                        .content("{\"opis\": \"Step description\", \"stkoraka\": 1, \"TKrecepta\": {}}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.opis").value("Step description"))
                .andExpect(jsonPath("$.stkoraka").value(1));
    }

    @Test
    void testGetKorakiByRecept() throws Exception {
        Recept recept = new Recept();
        Koraki korak = new Koraki(recept, 1, "Step description");

        // Mocking the repository to return a list of Koraki
        when(korakiRepository.findByTKrecepta(recept)).thenReturn(Collections.singletonList(korak));

        mockMvc.perform(get("/api/koraki/recept/{id}", recept.getIdrecepta()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].opis").value("Step description"))
                .andExpect(jsonPath("$[0].stkoraka").value(1));
    }
}
*/