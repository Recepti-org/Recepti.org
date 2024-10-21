package si.um.feri.Recepti.org.vao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Koraki {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idkoraka")
    private int idkoraka;

    private String opis;
    private int stkoraka;

    @ManyToOne
    @JoinColumn(name = "TKrecepta")  // This should reference the Recept table
    private Recept TKrecepta;

    // Constructors
    public Koraki() {}

    public Koraki(Recept TKrecepta, int stkoraka, String opis) {
        this.TKrecepta = TKrecepta;
        this.stkoraka = stkoraka;
        this.opis = opis;
    }
}
