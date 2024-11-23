package si.um.feri.Recepti.org.vao;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Ocena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idocena")
    private int idocena;
    private int stzvezdic;
    private String mnenje;
    private String vprasanje;

    @ManyToOne
    @JoinColumn(name = "TKrecepta", referencedColumnName = "idrecepta")
    private Recept TKrecepta;


    //Constructors
    public Ocena() {}

    public Ocena(int idocena, int stzvezdic, String mnenje, String vprasanje, Recept TKrecepta) {
        this.idocena = idocena;
        this.stzvezdic = stzvezdic;
        this.mnenje = mnenje;
        this.vprasanje = vprasanje;
        this.TKrecepta = TKrecepta;
    }
}
