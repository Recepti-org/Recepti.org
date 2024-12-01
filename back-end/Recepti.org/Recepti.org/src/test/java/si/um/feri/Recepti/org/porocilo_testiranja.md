# Poročilo o testiranju

## Opis testov

V tem testiranju smo preverili delovanje različnih delov aplikacije, povezanih z objekti **Koraki**, **Ocena**, **Recept** in **Uporabnik**. Testi vključujejo inicializacijo objektov, primerjave med objekti, preverjanje validnosti podatkov in testiranje delovanja CRUD operacij.

### 1. Testiranje objekta **Koraki**

Testi, povezani z objektom Koraki, so preverjali pravilno inicializacijo objektov, pravilno delovanje `equals` metode za primerjavo dveh objektov ter preverjanje negativnih primerov, ko objekta nista enaka.

- **Test: Pravilna inicializacija objekta Koraki** - preverili smo, ali so atributi objekta pravilno nastavljeni ob inicializaciji.
- **Test: Primerjava dveh objektov Koraki** - testirali smo primer, ko sta dva objekta z enakimi atributi enaka.
- **Test: Neenakost dveh objektov Koraki** - preverili smo, da sta dva objekta z različnimi atributi različna.

### 2. Testiranje objekta **Ocena**

Testiranje ocene vključuje preverjanje inicializacije objekta, pravilne nastavitve vrednosti ocen, obravnavo neveljavnih vrednosti in testiranje ponavljanja.

- **Test: Inicializacija Ocena** - preverjanje pravilnosti inicializacije objekta Ocena.
- **Test: Neveljavna ocena** - testiranje situacije, ko je ocena izven dovoljenega obsega.
- **Test: Veljavne ocene** - testiranje različnih veljavnih vrednosti ocen.
- **Test: Ocena z uporabnikom** - preverjanje, ali je ocena pravilno povezana z uporabnikom in receptom.
- **Test: Ponovljeno testiranje inicializacije Ocena** - večkratno izvajanje istega testa.
- **Test: Dinamični testi za neveljavne ocene** - preverjanje, da se za napačne ocene vrne napaka.

### 3. Testiranje objekta **Recept**

Testi za objekt **Recept** vključujejo preverjanje dodajanja in brisanja receptov ter validnosti podatkov v povezavi z uporabnikom.

- **Testiranje dodajanja recepta** - testirali smo dodajanje recepta v bazo in preverjanje, ali je bil dodan.
- **Testiranje brisanja recepta** - testirali smo pravilnost brisanja receptov iz baze.

### 4. Testiranje objekta **Uporabnik**

Testi, povezani z uporabnikom, vključujejo preverjanje inicializacije uporabnika in primerjavo dveh uporabnikov.

- **Test: Inicializacija uporabnika** - testirali smo, ali se uporabnik pravilno inicializira.
- **Test: Primerjava dveh enakih uporabnikov** - testirali smo primer, ko sta dva uporabnika z enakimi atributi enaka.
- **Test: Primerjava dveh različnih uporabnikov** - testirali smo, da sta dva uporabnika z različnimi atributi različna.

### 5. Testiranje začetne aplikacije

- **Test: Context Loads** - preverjanje, ali se aplikacija pravilno naloži.

## Kratka analiza uspešnosti testov

- **Uspešnost testov**: Vsi testi so bili uspešno izvedeni, brez napak pri inicializaciji objektov, primerjavi objektov, in CRUD operacijah.
- **Odkrite napake**: Med testiranjem so bile odkrite naslednje napake:
  - Pri testiranju smo odkrili napako, kjer ocena izven obsega (1–5) ni povzročila pravilnega izjemnega ravnanja.
  - Napako smo odpravili v konstruktorju razreda Ocena z naslednjo preverbo:
    if (stZvezdic < 1 || stZvezdic > 5) {
    throw new IllegalArgumentException("Ocena mora biti med 1 in 5.");
    }

Na splošno so bili vsi testi uspešno izvedeni brez večjih težav. Vse napake, ki so bile odkrite, so bile takoj odpravljene, in aplikacija deluje skladno s pričakovanji.
