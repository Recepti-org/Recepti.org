package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sestavina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsestavine")
    private int idsestavine;

    private String ime;

    public Sestavina() {}

    public Sestavina(String ime) {
        this.ime = ime;
    }
}
