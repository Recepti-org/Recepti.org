package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Uporabnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iduporabnika")
    private int idUporabnika;

    private String ime;
    private String priimek;


    public Uporabnik() {
    }

    // Constructors
    public Uporabnik(String ime, String priimek) {
        this.ime = ime;
        this.priimek = priimek;
    }
}

