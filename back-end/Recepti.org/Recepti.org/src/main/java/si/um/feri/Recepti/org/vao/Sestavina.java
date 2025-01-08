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
    private Float cena;

    @ManyToOne
    @JoinColumn(name = "TK_tip")
    private TipSestavine Tktip;

    public Sestavina(int idsestavine, String ime, TipSestavine tktip) {
        this.idsestavine = idsestavine;
        this.ime = ime;
        Tktip = tktip;
    }

    public Sestavina() {}

    public Sestavina(String ime) {
        this.ime = ime;
    }
}
