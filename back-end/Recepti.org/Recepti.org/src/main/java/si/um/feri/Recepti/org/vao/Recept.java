package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Recept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idrecepta")
    private int idrecepta;

    private String ime;
    private String opis;
    private double caspriprave;
    private int tezavnost;
    private String slika;

    @ManyToOne
    @JoinColumn(name = "TK_Uporabnik")
    private Uporabnik uporabnik;

    // Constructors
    public Recept() {}

    public Recept(Uporabnik uporabnik, int tezavnost, double caspriprave, String opis, String ime, String slika) {
        this.uporabnik = uporabnik;
        this.tezavnost = tezavnost;
        this.caspriprave = caspriprave;
        this.opis = opis;
        this.ime = ime;
        this.slika = slika;
    }
}
