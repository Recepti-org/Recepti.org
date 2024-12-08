package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sestavinakolicina")
public class SestavinaKolicina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsestavinakoli")
    private int idsestavinakoli;

    private int kolicina;
    private String enota;

    @ManyToOne
    @JoinColumn(name = "TK_sestavina")
    private Sestavina tkSestavina;

    @ManyToOne
    @JoinColumn(name = "TK_recepta")
    private Recept tkRecepta;

    public SestavinaKolicina() {}

    public SestavinaKolicina(int kolicina, String enota, Sestavina tkSestavina, Recept tkRecepta) {
        this.kolicina = kolicina;
        this.enota = enota;
        this.tkSestavina = tkSestavina;
        this.tkRecepta = tkRecepta;
    }

}
