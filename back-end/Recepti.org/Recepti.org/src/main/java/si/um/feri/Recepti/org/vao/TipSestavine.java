package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tipsestavine")
public class TipSestavine {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtipa")
    private Long idtipa;


    private String ime;

    public TipSestavine() {}

    public TipSestavine(String ime) {
        this.ime = ime;
    }
}
