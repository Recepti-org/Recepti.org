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

- **Java™ 21**: Osnovni programski jezik.
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


## Licence
Recepti.org® ©2024 Vse Pravice Pridržane
