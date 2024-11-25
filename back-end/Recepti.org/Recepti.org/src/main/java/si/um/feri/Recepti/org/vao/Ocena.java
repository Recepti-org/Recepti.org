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

    @Column(name = "stZvezdic", nullable = false)
    private int stZvezdic;
    private String mnenje;
    private String vprasanje;

    //@Column(name = "idocena")
    //private int idocena;
    //private int stzvezdic;

    @ManyToOne
    @JoinColumn(name = "TKrecepta", referencedColumnName = "idrecepta")
    private Recept TKrecepta;

    @ManyToOne
    @JoinColumn(name = "TKuporabnik", referencedColumnName = "idUporabnika")
    private Uporabnik TKuporabnik;

    //Constructors
    public Ocena() {}

    public Ocena(int idOcena, int stZvezdic, String mnenje, String vprasanje, Recept TKrecepta) {
        this.idOcena = idOcena;
        this.stZvezdic = stZvezdic;
    //public Ocena(int idocena, int stzvezdic, String mnenje, String vprasanje, Recept TKrecepta) {
        //this.idocena = idocena;
        //this.stzvezdic = stzvezdic;
        this.mnenje = mnenje;
        this.vprasanje = vprasanje;
        this.TKrecepta = TKrecepta;
    }


    public Ocena(int idOcena, int stZvezdic, String mnenje, String vprasanje, Recept TKrecepta, Uporabnik TKuporabnik) {
        this.idOcena = idOcena;
        this.stZvezdic = stZvezdic;
        this.mnenje = mnenje;
        this.vprasanje = vprasanje;
        this.TKrecepta = TKrecepta;
        this.TKuporabnik = TKuporabnik;
    }


}
