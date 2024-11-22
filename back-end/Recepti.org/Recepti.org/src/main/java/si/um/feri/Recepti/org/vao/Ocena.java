package si.um.feri.Recepti.org.vao;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Ocena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idOcena")
    private int idOcena;
    private int stZvezdic;
    private String mnenje;
    private String vprasanje;

    @ManyToOne
    @JoinColumn(name = "TKrecepta")
    private Recept TKrecepta;

    //Constructors
    public Ocena() {}

    public Ocena(int idOcena, int stZvezdic, String mnenje, String vprasanje, Recept TKrecepta) {
        this.idOcena = idOcena;
        this.stZvezdic = stZvezdic;
        this.mnenje = mnenje;
        this.vprasanje = vprasanje;
        this.TKrecepta = TKrecepta;
    }
}
