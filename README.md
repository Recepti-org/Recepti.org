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

   spring.datasource.url=jdbc:mysql://localhost:3306/recepti_org
   spring.datasource.username=vaše-uporabniško-ime
   spring.datasource.password=vaše-geslo
   spring.jpa.hibernate.ddl-auto=update

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

## Diagram primera uporabe
   ![Use case](./front-end/images/Posnetek%20zaslona%202024-11-10%20181758.png)

   1. Ogled vseh receptov:
      Uporabnik lahko pregleda vse razpoložljive recepte v aplikaciji. Na voljo ima dodatni možnosti filtriranja po priporočeno in iskanja po vnosu, ki omogočata bolj specifično iskanje receptov.

   2. Ogled recepta:
      Uporabnik lahko pregleda podrobnosti posameznega recepta s seznama.

   3. Dodajanje recepta:
      Uporabnik lahko dodaja nove recepte tako, da izpolni obrazec in shrani spremembe. Ta možnost omogoča uporabnikom, da prispevajo nove recepte v bazo.

   4. Ogled mojih receptov:
      Uporabnik lahko pregleda seznam receptov, ki jih je sam ustvaril. Iz te možnosti lahko recepte tudi spremeni ali odstrani.

   5. Spreminjanje recepta:
      Uporabnik lahko spremeni katerikoli recept, ki ga je ustvaril – lahko posodobi sestavine, navodila ali druge podrobnosti recepta.

   6. Odstrani recept:
      Uporabnik ima možnost, da odstrani katerega koli izmed receptov, ki jih je predhodno ustvaril.

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