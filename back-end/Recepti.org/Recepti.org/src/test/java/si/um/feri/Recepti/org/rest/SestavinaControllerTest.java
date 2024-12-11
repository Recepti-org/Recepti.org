package si.um.feri.Recepti.org.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import si.um.feri.Recepti.org.dao.SestavinaRepository;
import si.um.feri.Recepti.org.vao.Sestavina;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SestavinaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private SestavinaRepository sestavinaRepository;

    @InjectMocks
    private SestavinaController sestavinaController;

    private Sestavina mockSestavina;

    @Before
    public void setUp() {
        // Priprava mock objekta
        mockSestavina = new Sestavina();
        mockSestavina.setIdsestavine(10);
        mockSestavina.setIme("Moka");
    }

    // Test GET /api/sestavine
    @Test
    public void testGetAllSestavine() throws Exception {
        when(sestavinaRepository.findAll()).thenReturn(Arrays.asList(mockSestavina));

        mockMvc.perform(get("/api/sestavine"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$[0].ime").value("Jajca"))
                .andExpect(jsonPath("$[1].ime").value("Maslo"))
                .andExpect(jsonPath("$[2].ime").value("Moka"))
                .andExpect(jsonPath("$[3].ime").value("Moka"))
                .andExpect(jsonPath("$[4].ime").value("Moka"))
                .andExpect(jsonPath("$[5].ime").value("Moka"))
                .andExpect(jsonPath("$[6].ime").value("Moka"))
                .andExpect(jsonPath("$[7].ime").value("Sladkor"));
    }

    // Test GET /api/sestavine/{id}
    @Test
    public void testGetSestavinaById() throws Exception {
        when(sestavinaRepository.findById(1)).thenReturn(Optional.of(mockSestavina));

        mockMvc.perform(get("/api/sestavine/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.ime").value("Sladkor"));
    }

    // Test POST /api/sestavine
    @Test
    public void testCreateSestavina() throws Exception {
        when(sestavinaRepository.save(any(Sestavina.class))).thenReturn(mockSestavina);

        mockMvc.perform(post("/api/sestavine")
                        .contentType("application/json")
                        .content("{\"ime\":\"Moka\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ime").value("Moka"));
    }

    // Test PUT /api/sestavine/{id}
    @Test
    public void testUpdateSestavina() throws Exception {
        when(sestavinaRepository.findById(1)).thenReturn(Optional.of(mockSestavina));
        when(sestavinaRepository.save(any(Sestavina.class))).thenReturn(mockSestavina);

        mockMvc.perform(put("/api/sestavine/{id}", 1)
                        .contentType("application/json")
                        .content("{\"ime\":\"Sladkor\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ime").value("Sladkor"));
    }

    // Test DELETE /api/sestavine/{id}
    /*@Test
    public void testDeleteSestavina() throws Exception {
        when(sestavinaRepository.existsById(1)).thenReturn(true);

        mockMvc.perform(delete("/api/sestavine/{id}", 1))
                .andExpect(status().isNoContent());

        verify(sestavinaRepository, times(1)).deleteById(1);
    }

    // Test DELETE /api/sestavine/{id} (ko element ne obstaja)
    @Test
    public void testDeleteSestavinaNotFound() throws Exception {
        when(sestavinaRepository.existsById(1)).thenReturn(false);

        mockMvc.perform(delete("/api/sestavine/{id}", 1))
                .andExpect(status().isNotFound());
    }*/
}
