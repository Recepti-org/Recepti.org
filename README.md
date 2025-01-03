# Recepti.org - Projekt skupine

**Člani ekipe**:

- Miha Rot
- Aleš Fon Cafnik
- Matija Čoh

**Povezava do repozitorija**:  
[Recepti.org](https://github.com/Recepti-org/Recepti.org.git)

## O projektu

Projekt **Recepti.org** je spletna aplikacija, ki uporabnikom omogoča dostop do zbirke receptov. Aplikacija je zasnovana za enostavno iskanje, dodajanje, urejanje in brisanje receptov ter ponuja številne funkcionalnosti, ki izboljšujejo uporabniško izkušnjo.

### Glavne funkcionalnosti

- **Pregled receptov**: Uporabniki lahko enostavno pregledajo seznam vseh receptov, ki so shranjeni v bazi podatkov.

- **Iskanje receptov**: Uporabniki lahko iščejo recepte glede na ime, sestavine ali kategorijo.

- **Dodajanje novih receptov**: Uporabniki, ki imajo status administratorja lahko dodajo nove recepte, vključno s sestavinami, navodili in slikami.

- **Urejanje obstoječih receptov**: Uporabniki, ki imajo status administratorja imajo možnost urejati obstoječe recepte, kar omogoča posodobitve in izboljšave.

- **Brisanje receptov**: Uporabniki, ki imajo status administratorja lahko izbrišejo recepte, ki jih ne želijo več imeti v svoji zbirki.

- Dodatno: **Dokumentacija API-jev**: Uporaba **Swagger** za avtomatsko generiranje dokumentacije API-jev, kar omogoča enostavno testiranje in razumevanje dostopnih funkcionalnosti.

- **Podpora za več uporabnikov**: Aplikacija omogoča različnim uporabnikom, da ustvarijo svoje račune in upravljajo svoje recepte.

## Projektna struktura

Projekt je razdeljen na smiselne mape in datoteke, da omogočimo enostavno upravljanje in nadaljnji razvoj aplikacije. Projekt vključuje naslednje mape:

- **src/main/java**: Vsebuje izvorno kodo aplikacije, organizirano v paketih po funkcionalnostih.

  - **controller**: Vsebuje krmilnike (controllerje) za API-je.
  - **service**: Vsebuje poslovno logiko aplikacije.
  - **repository**: Vsebuje povezave s podatkovno bazo in CRUD operacije.
  - **model**: Vsebuje podatkovne entitete (modeli).

- **src/main/resources**: Vsebuje konfiguracijske datoteke, kot je `application.properties` za nastavitev povezave z bazo.

- **pom.xml**: Maven datoteka za upravljanje odvisnosti in gradnjo projekta.

- **README.md**: Ta datoteka, ki vsebuje dokumentacijo za razvijalce.

### Standardi kodiranja

- Uporabljamo **CamelCase** za imenovanje razredov in metod.
- Komentarji morajo biti jasni in v slovenščini.
- Vsaka nova funkcionalnost mora biti implementirana v skladu s strukturo projekta in dogovorjenimi standardi.

### Uporabljena orodja in tehnologije

- **Java™ 19**: Osnovni programski jezik.
- **Spring Boot™ 3.3.4**: Okvir za backend in REST API-je.
- **MySQL®**: Podatkovna baza za shranjevanje receptov.
- **Maven®**: Orodje za gradnjo in upravljanje odvisnosti.
- **GitHub®**: Za shranjevanje izvorne kode in vodenje različic.
- **Postman®**: Orodje za testiranje API-jev.
- **Swagger®**: Orodje za dokumentacijo API-jev in testiranje.

### Razvojna okolja

- **IntelliJ IDEA®**: Primarno razvojno okolje (IDE) za razvoj Java aplikacij.
- **Visual Studio Code™ (VS Code)**: Uporabljen za razvoj front-end in urejanje konfiguracijskih datotek.

## Navodila za namestitev

1. **Kloniranje repozitorija**

   git clone https://github.com/Recepti-org/Recepti.org.git
   cd recepti-org
   git status

2. **Namestitev Node.js in Node modulov**

   Prenesite in namestite Node.js z uradne spletne strani nodejs.org.
   Priporočamo, da namestite LTS (Long-Term Support) različico za najboljšo združljivost.

   Namestitev Node modulov
   V terminalu pojdite v direktorij projekta in namestite vse potrebne module, ki so navedeni v datoteki package.json:

   npm install

3. **Nastavitev podatkovne baze**

   Ustvarite bazo podatkov v MySQL® z imenom recepti_org.

   Posodobite datoteko src/main/resources/application.properties z vašimi MySQL nastavitvami:

   - spring.datasource.url=jdbc:mysql://localhost:3306/recepti_org
   - spring.datasource.username=vaše-uporabniško-ime
   - spring.datasource.password=vaše-geslo
   - spring.jpa.hibernate.ddl-auto=update

4. **Gradnja in zagon projekta**

   Uporabite Maven® za gradnjo in zagon aplikacije:

   mvn clean install
   mvn spring-boot:run

5. **Dostop do aplikacije**

   Aplikacija bo dostopna na http://localhost:8080. Uporabite brskalnik ali orodje Postman® za testiranje API-jev.

6. **Uporaba Swaggerja**

   Za dostop do dokumentacije API-jev in interaktivno testiranje uporabite Swagger® na naslednji povezavi, ko aplikacija teče:
   http://localhost:8080/swagger-ui/

## Navodila za razvijalce

# Faze razvoja

## Zajem zahtev

## Vizija

_Vizija projekta Recepti.org_
Recepti.org je platforma za ljubitelje kulinarike – od začetnikov do profesionalcev.
Naša vizija je ustvariti sodoben in intuitiven prostor, ki rešuje ključne težave uporabnikov,
kot so nepreglednost shranjevanja receptov, omejena prilagodljivost sestavin,
iskanje navdiha ter preprosto shranjevanje in organiziranje priljubljenih receptov.
Z enostavnim iskanjem, možnostjo prilagoditve receptov po meri in pregledno organizacijo
platforma podpira ustvarjalnost ter pomaga uporabnikom obogatiti njihove kulinarične izkušnje.

## Besednjak

| **Beseda**                 | **Definicija**                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Registracija**           | Postopek, s katerim uporabnik ustvari nov račun v sistemu. Vključuje vnos naslednjih osebnih podatkov: ime, priimek, datum rojstva, naslov, uporabniško ime (elektronski naslov), geslo. Ti podatki omogočajo kasnejši dostop do funkcionalnosti spletne strani/aplikacije.                                                                                                                                                                  |
| **Prijava**                | Postopek dostopa do osebnega računa z vnosom uporabniškega imena in gesla, ki omogoča uporabo funkcij, dostopnih le registriranim uporabnikom, kot so dodajanje, iskanje, spreminjanje receptov ipd.                                                                                                                                                                                                                                         |
| **Odjava**                 | Postopek, s katerim se uporabnik odjavi iz svojega računa, da zaključi sejo in prepreči dostop do osebnih podatkov ter upravljanje njegovih receptov s strani drugih uporabnikov ali naprav.                                                                                                                                                                                                                                                 |
| **Recept**                 | Navodila za pripravo določene jedi, ki vključujejo seznam sestavin, čas priprave, težavnost priprave in natančne korake priprave, da lahko uporabnik pripravi obrok po predpisanem postopku.                                                                                                                                                                                                                                                 |
| **Težavnost**              | Stopnja zahtevnosti recepta, ki označuje, koliko znanja, spretnosti in časa je potrebnega za pripravo jedi. Označena je s številom zvezdic med 1 in 5, pri čemer velja: 1 = za začetnike, 2 = enostavno, 3 = srednje zahtevno, 4 = zahtevno, 5 = za profesionalce.                                                                                                                                                                           |
| **Priporočeno**            | Seznam ali oznaka, ki naključno prikazuje recepte iz baze, ne glede na priljubljenost ali osebne preference uporabnika. Namenjen je odkrivanju novih, naključno izbranih receptov, ki jih uporabnik morda sicer ne bi opazil.                                                                                                                                                                                                                |
| **Sestavine**              | Seznam potrebnih živil in začimb, ki jih mora uporabnik imeti za pripravo določene jedi v skladu z receptom.                                                                                                                                                                                                                                                                                                                                 |
| **Korak**                  | Posamezno navodilo v sklopu priprave recepta, ki ga je treba izvesti, da bi se jed uspešno pripravila.                                                                                                                                                                                                                                                                                                                                       |
| **Postopek priprave jedi** | Seznam vseh korakov dodanih v recept, kot so priprava sestavin, kuhanje, pečenje ali druga opravila, potrebna za dokončanje jedi.                                                                                                                                                                                                                                                                                                            |
| **Čas priprave**           | Časovni okvir izražen v minutah (min), potreben za pripravo recepta, ki vključuje celoten čas kuhanja in pripravljanja sestavin, da je jed popolnoma pripravljena za postrežbo.                                                                                                                                                                                                                                                              |
| **Kategorija**             | Razvrstitev receptov glede na vrsto jedi in sicer: glavne jedi, sladice in juhe. Olajša iskanje specifičnih vrst receptov.                                                                                                                                                                                                                                                                                                                   |
| **Juha**                   | Jedi, pripravljene z osnovo iz tekočine, kot je voda ali jušna osnova, pogosto vsebujejo zelenjavo, meso ali ribe ter začimbe, ki ustvarijo okusno, običajno toplo jed.                                                                                                                                                                                                                                                                      |
| **Sladica**                | Jedi, ki so običajno sladke in postrežene ob koncu obroka, kot so peciva, torte, piškoti ali sadne jedi.                                                                                                                                                                                                                                                                                                                                     |
| **Glavna jed**             | Osrednji del obroka, ki se običajno pripravlja za kosilo in ga sestavljajo beljakovinske in škrobnate komponente, kot so meso, ribe, testenine, riž, zelenjava ipd.                                                                                                                                                                                                                                                                          |
| **Profil**                 | Osebni račun uporabnika, kjer so shranjeni vsi njegovi podatki, ki jih je vnesel ob registraciji, in priljubljeni recepti, s katerimi si uporabnik prilagodi izkušnjo uporabe aplikacije.                                                                                                                                                                                                                                                    |
| **Ocena**                  | Številska in besedna vrednost, ki jo uporabnik dodeli receptu, da izrazi svoje zadovoljstvo z jedjo ali kakovost recepta. Ocene so prikazane kot število zvezdic med 1 in 5, kjer višja ocena predstavlja višje zadovoljstvo in kakovost recepta. Prikazane pa so z mnenjem uporabnika o receptu. Ocene pripomorejo k boljšemu razvrščanju receptov glede na priljubljenost in uporabnikom omogočajo, da hitreje najdejo kakovostne recepte. |

## Diagram primera uporabe

![Use case](./front-end/images/Posnetek%20zaslona%202024-11-11%20184747.png)

1.  Ogled vseh receptov:
    Uporabnik lahko pregleda vse razpoložljive recepte v aplikaciji. Na voljo ima dodatni možnosti filtriranja po priporočeno in iskanja po vnosu, ki omogočata bolj specifično iskanje receptov.

2.  Ogled recepta:
    Uporabnik lahko pregleda podrobnosti posameznega recepta s seznama.

3.  Dodajanje recepta:
    Uporabnik lahko dodaja nove recepte tako, da izpolni obrazec in shrani spremembe. Ta možnost omogoča uporabnikom, da prispevajo nove recepte v bazo.

4.  Ogled mojih receptov:
    Uporabnik lahko pregleda seznam receptov, ki jih je sam ustvaril. Iz te možnosti lahko recepte tudi spremeni ali odstrani.

5.  Spreminjanje recepta:
    Uporabnik lahko spremeni katerikoli recept, ki ga je ustvaril – lahko posodobi sestavine, navodila ali druge podrobnosti recepta.

6.  Odstrani recept:
    Uporabnik ima možnost, da odstrani katerega koli izmed receptov, ki jih je predhodno ustvaril.

## Podrobni opisi funkcionalnosti in scenariji

### Primer uporabe: **_Ogled vseh receptov_** _ID: PU-001_

**Cilj:** Uporabnik želi pregledati seznam vseh receptov.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.

**Stanje sistema po PU:**

- Sistem prikaže seznam vseh razpoložljivih receptov.

**Scenarij:**

1. Uporabnik izbere možnost "Ogled vseh receptov".

2. Sistem prikaže seznam receptov z osnovnimi informacijami, kot so ime recepta, kratek opis in ocena.

**Alternativni tokovi:**

- **Filtriranje po priporočeno:** Uporabnik izbere možnost filtriranja receptov po priporočilih, sistem prikaže le priporočene recepte.
- **Iskanje po vnosu:** Uporabnik vnese iskalni niz, sistem prikaže recepte, ki ustrezajo vnosu.

**Izjeme:**
Če ni na voljo nobenega recepta, sistem prikaže obvestilo, da trenutno ni razpoložljivih receptov.

### Primer uporabe: **_Filtriranje po priporočeno_** _ID: PU-001-1_

**Cilj:** Uporabnik želi filtrirati recepte, da prikaže samo priporočene recepte.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Na voljo je seznam vseh receptov.

**Stanje sistema po PU:**

- Sistem prikaže seznam receptov, filtriran po priporočilih.

**Scenarij:**

1. Uporabnik izbere možnost "Filtriranje po priporočeno" v prikazu vseh receptov.

2. Sistem filtrira seznam in prikaže samo priporočene recepte.

**Alternativni tokovi:**

- Noben

**Izjeme:**
Če ni na voljo nobenega priporočenega recepta, sistem prikaže obvestilo, da trenutno ni priporočljivih receptov.

### Primer uporabe: **_Iskanje po vnosu_** _ID: PU-001-2_

**Cilj:** Uporabnik želi poiskati recepte glede na iskalni niz.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Na voljo je seznam vseh receptov.

**Stanje sistema po PU:**

- Sistem prikaže recepte, ki ustrezajo iskalnemu nizu.

**Scenarij:**

1. Uporabnik vnese iskalni niz v iskalno polje in potrdi iskanje.

2. Sistem išče recepte, ki se ujemajo z vnosom, in prikaže ustrezne rezultate.

**Alternativni tokovi:**

- Noben

**Izjeme:**
Če noben recept ne ustreza iskalnemu nizu, sistem prikaže obvestilo, da ni bilo najdenih rezultatov.

### Primer uporabe: **_Ogled recepta_** _ID: PU-002_

**Cilj:** Uporabnik želi pridobiti podrobne informacije o določenem receptu.

**Akterji:** Uporabnik

**Predpogoji:** Uporabnik je prijavljen v aplikacijo.

**Stanje sistema po PU:**

- Sistem prikaže podroben prikaz izbranega recepta.

**Scenarij:**

1. Uporabnik izbere recept s seznama receptov.

2. Sistem prikaže podrobnosti o receptu, vključno s sestavinami, navodili za pripravo, ocenami in mnenji drugih uporabnikov.

**Alternativni tokovi:**

- preračunavanje količin sestavin glede na število porcij - kar izbere uporabnik z vnosom števila porcij v polje.

**Izjeme:**
Če recepta ni mogoče naložiti, sistem prikaže obvestilo o napaki.

### Primer uporabe: **_Dodajanje recepta_** _ID: PU-003_

**Cilj:** Uporabnik želi dodati nov recept v aplikacijo.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik ima pripravljene podatke o receptu (sestavine, navodila).

**Stanje sistema po PU:** Sistem shrani nov recept in ga doda na seznam vseh receptov.

**Scenarij:**

1. Uporabnik izbere možnost "Dodajanje recepta".

2. Sistem prikaže obrazec za vnos podatkov o receptu.

3. Uporabnik vnese ime, opis, sestavine in navodila za pripravo recepta ter potrdi vnos.

4. Sistem shrani recept in ga prikaže med vsemi recepti.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če so obvezna polja prazna, sistem uporabnika opozori, da mora izpolniti vsa zahtevana polja.

### Primer uporabe: **_Ogled mojih receptov_** _ID: PU-004_

**Cilj:** Uporabnik želi pregledati vse recepte, ki jih je sam dodal.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.

**Stanje sistema po PU:** Sistem prikaže seznam vseh receptov, ki jih je uporabnik dodal.

**Scenarij:**

1. Uporabnik izbere možnost "Ogled mojih receptov".

2. Sistem prikaže seznam receptov, ki jih je uporabnik dodal, z osnovnimi informacijami.

**Alternativni tokovi:**

- Sprememba recepta:

  1.  Uporabnik izbere možnost "Sprememba recepta" ob določenem receptu.

  2.  Sistem prikaže obrazec za urejanje izbranega recepta.

  3.  Uporabnik vnese spremembe in jih potrdi.

  4.  Sistem posodobi recept in prikaže posodobljene podatke v seznamu.

- Odstrani recept:

  1.  Uporabnik izbere možnost "Odstrani recept" ob določenem receptu.

  2.  Sistem prikaže potrditveno okno za izbris.

  3.  Uporabnik potrdi brisanje.

  4.  Sistem odstrani recept iz seznama in posodobi prikaz.

**Izjeme:**
Če uporabnik ni dodal nobenega recepta, sistem prikaže obvestilo, da ni na voljo nobenega recepta.

### Primer uporabe: **_Sprememba recepta_** _ID: PU-005_

**Cilj:** Uporabnik želi urediti podrobnosti recepta, ki ga je dodal.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik je dodal recept, ki ga želi urediti.

**Stanje sistema po PU:** Sistem posodobi podatke recepta glede na spremembe, ki jih vnese uporabnik.

**Scenarij:**

1. Uporabnik izbere recept iz svojih receptov.

2. Uporabnik izbere možnost "Sprememba recepta".

3. Sistem prikaže obrazec s trenutnimi podatki recepta.

4. Uporabnik posodobi podatke in potrdi spremembe.

5. Sistem shrani posodobljene podatke o receptu.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik ne potrdi sprememb, sistem ohrani obstoječe podatke o receptu.

### Primer uporabe: **_Odstrani recept_** _ID: PU-006_

**Cilj:** Uporabnik želi izbrisati recept, ki ga je dodal.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik je dodal recept, ki ga želi izbrisati.

**Stanje sistema po PU:** Sistem trajno odstrani izbran recept iz baze podatkov.

**Scenarij:**

1. Uporabnik izbere recept iz svojih receptov.

2. Uporabnik izbere možnost "Odstrani recept".

3. Sistem prikaže potrditev izbrisa.

4. Uporabnik potrdi izbris recepta.

5. Sistem trajno odstrani recept.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik prekliče potrditev izbrisa, sistem ohrani recept.

## _Dodana kompleksnejša funkcionalnost: ocene in mnenja_

### Primer uporabe: **_Dodajanje ocen_** _ID: PU-007_

**Cilj:** Uporabnik želi dodati oceno za določen recept.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik je pregledal recept.

**Stanje sistema po PU:** Sistem shrani oceno, ki jo je uporabnik dodelil receptu.

**Scenarij:**

1. Uporabnik izbere možnost "Dodajanje ocen" ob določenem receptu.

2. Sistem prikaže obrazec za dodajanje ocene (lestvica od 1 do 5).

3. Uporabnik vnese oceno in potrdi vnos.

4. Sistem shrani oceno in osveži prikaz povprečne ocene za recept.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik poskuša dodati več kot eno oceno, sistem prikaže obvestilo, da je oceno že dodal.

### Primer uporabe: **_Urejanje ocen_** _ID: PU-008_

**Cilj:** Uporabnik želi spremeniti oceno, ki jo je prej dodal za določen recept.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik je že dodelil oceno za recept.

**Stanje sistema po PU:** Sistem posodobi oceno recepta glede na spremembe, ki jih vnese uporabnik.

**Scenarij:**

1. Uporabnik izbere možnost "Urejanje ocen" pri svojem obstoječem vnosu ocene.

2. Sistem prikaže obstoječo oceno in omogoči njeno spremembo.

3. Uporabnik vnese novo oceno in potrdi spremembe.

4. Sistem posodobi oceno in osveži prikaz povprečne ocene za recept.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik še ni dodal ocene za ta recept, sistem prikaže obvestilo, da ocena ni na voljo za urejanje.

### Primer uporabe: **_Dodajanje mnenj_** _ID: PU-009_

**Cilj:** Uporabnik želi dodati svoje mnenje o določenem receptu.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.

**Stanje sistema po PU:** Sistem shrani novo mnenje uporabnika in ga prikaže med mnenji za recept.

**Scenarij:**

1. Uporabnik izbere možnost "Dodajanje mnenj" ob določenem receptu.

2. Sistem prikaže obrazec za dodajanje mnenja.

3. Uporabnik vnese besedilo mnenja in potrdi vnos.

4. Sistem shrani mnenje in ga prikaže med vsemi mnenji za ta recept.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik poskuša dodati več mnenj za isti recept, sistem prikaže obvestilo, da je mnenje že dodal.

### Primer uporabe: **_Urejanje mnenj_** _ID: PU-010_

**Cilj:** Uporabnik želi urediti svoje mnenje o določenem receptu.

**Akterji:** Uporabnik

**Predpogoji:**

- Uporabnik je prijavljen v aplikacijo.
- Uporabnik je že dodal mnenje za recept.

**Stanje sistema po PU:** Sistem posodobi mnenje glede na spremembe, ki jih vnese uporabnik.

**Scenarij:**

1. Uporabnik izbere možnost "Urejanje mnenj" pri svojem obstoječem mnenju.

2. Sistem prikaže obstoječe mnenje in omogoči urejanje besedila.

3. Uporabnik spremeni besedilo mnenja in potrdi spremembe.

4. Sistem posodobi mnenje in ga prikaže med posodobljenimi mnenji za ta recept.

**Alternativni tokovi:**

- Noben.

**Izjeme:**
Če uporabnik še ni dodal mnenja za ta recept, sistem prikaže obvestilo, da mnenje ni na voljo za urejanje.

# Class Diagram

![Class Diagram](./front-end/images/Recepti.org_ClassDiagram_v2.png)

## Namen Razredov in Ključne Metode

### Podatkovne entitete:

### Koraki

**Namen:** Predstavlja posamezni korak priprave recepta, vključno z njegovim opisom, zaporedjem in pripadnostjo receptu.

**Ključne metode:**

- `toString()`: Pretvori korak v niz, kar omogoča lažje prikazovanje podatkov v uporabniškem vmesniku ali logih.
- `equals(Object)`: Primerja dva koraka za enakost na podlagi njihovih atributov.
- `hashCode()`: Ustvari enoličen identifikator za objekt, ki se uporablja v strukturah, kot so zbirke.

**Naloge:** Zagotavljajo osnovne operacije za primerjavo, identifikacijo in prikaz korakov receptov.

### Recept

**Namen:** Shranjuje podatke o receptu, vključno z avtorjem, težavnostjo, opisom, sliko in časom priprave.

**Ključne metode:**

- `toString()`: Pretvori recept v niz, kar omogoča lažje razhroščevanje in prikaz podatkov.
- `equals(Object)`: Primerja dva recepta glede na njihove atribute, kot je ID.
- `hashCode()`: Generira unikatni identifikator recepta za uporabo v zbirkah.

**Naloge:** Podpirajo identifikacijo, primerjavo in prikaz receptov ter so osnova za druge metode upravljanja z recepti.

### Uporabnik

**Namen:** Predstavlja uporabnika sistema, ki lahko ustvarja recepte.

**Ključne metode:**

- `toString()`: Pretvori podatke o uporabniku v niz.
- `equals(Object)`: Preveri, ali sta dva uporabnika enaka.
- `hashCode()`: Generira unikatni identifikator za uporabnika.

**Naloge:** Omogočajo enostavno identifikacijo, primerjavo in prikaz uporabniških podatkov.

### Ocena

**Namen:** Zabeleži oceno recepta, ki jo lahko uporabnik pusti, in omogoča podrobnosti, kot so število zvezdic, komentar in povezava z določenim receptom.

**Ključne metode:**

- `toString()`: Pretvori oceno v berljiv niz.
- `equals(Object)`: Primerja dve oceni na podlagi njihovih atributov.
- `hashCode()`: Ustvari identifikator za oceno, uporaben pri shranjevanju v zbirkah.

**Naloge:** Upravljajo s podatki o ocenah in omogočajo enostavno delo z njimi v sistemu.

---

### Kontrolerji:

### KorakiController

**Namen:** Upravljati logiko povezano s koraki receptov, kot so dodajanje, pridobivanje in urejanje korakov.

**Ključne metode:**

- `getRecept(int)`: Pridobi vse korake, povezane z določenim receptom.  
  **Naloga:** Omogoča prikaz korakov uporabnikom in povezavo korakov z receptom.
- `postKorak(Koraki)`: Doda nov korak receptu.  
  **Naloga:** Ustvari nove korake za obstoječe recepte.

### ReceptController

**Namen:** Upravljati logiko povezano z recepti, vključno s pridobivanjem, ustvarjanjem, posodabljanjem in brisanjem receptov.

**Ključne metode:**

- `getRecept(int)`: Pridobi recept po ID-ju.  
  **Naloga:** Uporabniku omogoči ogled določenega recepta.
- `postRecept(Recept)`: Doda nov recept v sistem.  
  **Naloga:** Ustvarjanje novih receptov.
- `putRecept(Recept)`: Posodobi obstoječi recept.  
  **Naloga:** Omogoča urejanje receptov.
- `deleteRecept(int)`: Izbriše recept iz sistema.  
  **Naloga:** Odstranjevanje neveljavnih ali neželenih receptov.
- `searchRecepti(String)`: Poišče recepte na podlagi iskalnega niza.  
  **Naloga:** Izboljša uporabniško izkušnjo z omogočanjem hitrega iskanja.

### UporabnikController

**Namen:** Upravljati logiko, povezano z uporabniki in njihovimi recepti, vključno z iskanjem receptov določenega uporabnika.

**Ključne metode:**

- `getReceptiByUporabnik(int)`: Pridobi vse recepte, ki jih je ustvaril določen uporabnik.  
  **Naloga:** Prikaz vsebine, povezane z določenim avtorjem.
- `getRecept(int)`: Pridobi podatke o uporabniku.  
  **Naloga:** Zagotavlja podatke za identifikacijo in analizo uporabnikov.
- `testiram()`: Testna metoda za pridobivanje seznamov uporabnikov.  
  **Naloga:** Preverjanje povezav in dostopa do podatkov.

### OcenaController

**Namen:** Upravljati logiko za dodajanje, urejanje in pridobivanje ocen za recepte.

**Ključne metode:**

- `getOcene(int)`: Pridobi seznam ocen za določen recept.  
  **Naloga:** Omogoča pregled povratnih informacij o receptu.
- `postOcena(Ocena)`: Doda novo oceno za recept.  
  **Naloga:** Omogoča uporabnikom ocenjevanje receptov.
- `putOcena(Ocena)`: Posodobi obstoječo oceno.  
  **Naloga:** Urejanje napačnih ali zastarelih ocen.

---

### Repozitoriji:

### KorakiRepository

**Namen:** Omogočiti dostop do podatkov, povezanih s koraki receptov.

**Ključne metode:**

- `findByTKrecepta(Recept)`: Pridobi seznam korakov, ki pripadajo določenemu receptu.  
  **Naloga:** Povezovanje korakov z receptom in zagotavljanje podatkov za kontrolerje.

### ReceptRepository

**Namen:** Omogočiti dostop do podatkov o receptih, vključno z iskanjem po uporabniku ali ključnih besedah.

**Ključne metode:**

- `findByUporabnik(Uporabnik)`: Pridobi recepte, ki jih je ustvaril določen uporabnik.  
  **Naloga:** Omogoča prikaz avtorjevih receptov.
- `searchByKeyword(String)`: Poišče recepte glede na ključne besede.  
  **Naloga:** Iskanje receptov po opisih, imenih ali drugih atributih.

### OcenaRepository

**Namen:** Omogočiti dostop do podatkov o ocenah receptov.

**Ključne metode:**

- `findByTKrecepta(Recept)`: Pridobi vse ocene, ki so povezane z določenim receptom.  
  **Naloga:** Omogoča analiziranje in prikaz povratnih informacij.

### UporabnikRepository

**Namen:** Omogočiti dostop do podatkov o uporabnikih.
**Ključne metode:**

- ni definiranih metod

# Dokumentacija za funkcionalnost dodajanja ocen, mnenj in vprašanj

## Implementirana funkcionalnost

V aplikacijo smo dodali funkcionalnost, ki uporabnikom omogoča:

- **Dodajanje ocen** za recepte.
- **Dodajanje mnenj** za recepte.
- **Postavljanje vprašanj** avtorju recepta.

---

# Opis delovanja funkcionalnosti ocenjevanja receptov

### Dodajanje ocen

- Uporabnik lahko doda oceno za recept, tako da izbere vrednost od 1 do 5 zvezdic.
- Ocena se shrani v sistem in posodobi povprečno oceno recepta.

### Dodajanje mnenj

- Uporabnik lahko napiše mnenje o receptu, ki vključuje njegovo izkušnjo, nasvete ali opažanja.
- Ob oddaji mnenja uporabnik avtorju recepta postavi dodatno vprašanje.

### Postavljanje vprašanj

- Ob dodajanju mnenja uporabnik vnese vprašanje za avtorja recepta.
- Vprašanje se posreduje avtorju recepta, ki lahko odgovori prek aplikacije.
- Vprašanja in odgovori so prikazani na strani recepta, da so dostopni tudi drugim uporabnikom.

## Preizkušanje funkcionalnosti

### Koraki za dodajanje ocen

1. Prijavite se v aplikacijo z veljavnim uporabniškim računom.
2. Na strani izbranega recepta poiščite sekcijo za ocenjevanje.
3. Izberite želeno število zvezdic (od 1 do 5) in kliknite **"Oddaj oceno"**.
4. Sistem prikaže obvestilo o uspešno oddani oceni, povprečna ocena recepta pa se posodobi.

### Koraki za dodajanje mnenj

1. Prijavite se v aplikacijo.
2. Na strani izbranega recepta poiščite sekcijo za dodajanje mnenja.
3. Vnesite svoje mnenje v besedilno polje.
4. Vnesite vprašanje za avtorja recepta v dodatno polje.
5. Kliknite **"Shrani vašo oceno"**.
6. Sistem prikaže obvestilo o uspešnem dodajanju mnenja in vprašanja.

### Koraki za pregled vprašanj in odgovorov

1. Na strani recepta poiščite sekcijo **"Vprašanja in odgovori"**.
2. Preberite vprašanja in odgovore drugih uporabnikov.

## Dostop do funkcionalnosti v aplikaciji

- Funkcionalnost dodajanja ocen, mnenj in vprašanj je na voljo vsem prijavljenim uporabnikom.
- Sekcije za ocenjevanje, mnenja in vprašanja so dostopne na strani posameznega recepta.

## Povečana interaktivnost

Ta razširjena funkcionalnost izboljšuje interaktivnost aplikacije in omogoča neposredno komunikacijo med uporabniki ter avtorji receptov, kar bogati uporabniško izkušnjo.

---

### Prispevanje k projektu Recepti Org lahko na naslednje načine:

**Predlogi za nove funkcionalnosti**:
Če imate predloge za nove funkcionalnosti ali izboljšave, jih lahko oddate prek GitHub Issues.

**Testiranje aplikacije**:
Poročila o napakah lahko oddate prek GitHub Issues.
Vključite opis težave, korake za reprodukcijo napake ter pričakovane rezultate.

**Donacije**:
Donacije nam pomagajo pri nadaljnjem razvoju aplikacije.
Informacije o donacijah najdete na strani projekta na GitHub-u.

**Prispevki k izvorni kodi**
Forkajte repozitorij.
Ustvarite novo vejo za vašo funkcionalnost: git checkout -b funkcionalnost-ime.
Opravite spremembe in commitajte: git commit -m 'Dodana nova funkcionalnost'.
Pushajte spremembe: git push origin funkcionalnost-ime.
Ustvarite pull request in označite člane ekipe za pregled.
Za večje spremembe najprej odprite "issue" za razpravo o predlagani funkcionalnosti.

## Licenca:

Projekt je odprtokoden in je licenciran pod MINT licenco. © 2024 Recepti.org™. Vse pravice pridržane.
