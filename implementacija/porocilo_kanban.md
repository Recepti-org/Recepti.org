# Kanban Poročilo

## **Projekt**: Pogostost uporabe določenih sestavin

### **Cilj funkcionalnosti**

Razviti sistem za analizo pogostosti uporabe sestavin na podlagi zgodovine receptov. Uporabniki bodo imeli vpogled v najbolj uporabljene sestavine.

---

## **Priprava Kanban table**

1. **To Do** - Naloge, ki jih je treba začeti.
2. **In Progress** - Naloge, ki so trenutno v razvoju.
3. **Done** - Zaključene naloge.

### **WIP Limiti**

- **To Do**: Brez omejitve.
- **In Progress**: Maksimalno 6 nalogi naenkrat.

---

## **Razčlenitev funkcionalnosti**

### **Naloge (Issues)**

#### **Analiza zahteve**

- **Lociranje umestitve nove funkcionalnosti v aplikacijo**
  - _Točke_: 1
  - _Prioriteta_: Visoka

#### **2. Pridobivanje zgodovine receptov**

- **Implementiraj metodo za pridobivanje zgodovine receptov**
- **zračun pogostosti uporabe sestavin**
  - _Točke_: 5
  - _Prioriteta_: Visoka

#### **3. Izdelava API**

- **Dodaj REST API za pogostost uporabe sestavin**
  - _Točke_: 3
  - _Prioriteta_: Srednja

#### **4. Vizualna prilagoditev**

- **UI za prikaz pogostosti uporabe sestavin**
  - _Točke_: 2
  - _Prioriteta_: Nizka

#### **5. Testiranje**

- **Napiši enotske (Unit) teste za logiko**
- **Pripravi testne podatke za frontend**
  - _Točke_: 3
  - _Prioriteta_: Srednja

#### **6. Dokumentacija**
- **Opis:** Kratko poročilo o napredku.
  - _Točke_: 1
  - _Prioriteta_: Nizka

#### 7. Prikaz receptov z najpogostejšimi sestavinami (Nova funkcionalnost)
- ** Dodaj funkcionalnost za prikaz receptov z najpogostejšimi sestavinami
   - Točke: 4
   - Prioriteta: Visoka
   - Opis: Razviti sistem, ki omogoča uporabnikom, da vidijo seznam receptov z najpogostejšimi sestavinami na podlagi prejšnjih iskanj in receptov v bazi. 
   - Ta vključuje naslednja opravila:
      - Analiza zahteve
      - Prilagoditev uporabniškega vmesnika  
      - Prikaz uporabnikovih receptov z najpogostejšimi sestavinami 
      - Testiranje
---

### **Pregled trenutnega stanja**

| **Stolpec** | **Število nalog** |
| ----------- |-------------------|
| To Do       | 0                 |
| In Progress | 0                 |
| Done        | 10                |

## **Komunikacija s stranko**

- **Product Owner**:
  - Skrbi za ažurnost zahtev in komunikacijo z stranko.

### **Povratne informacije**

- **Povratne informacije glede nove funkcionalnosti:** 
   - Stranka je zadovoljna z napredkom in predlaga dodajanje funkcionalnosti za priporočanje receptov na podlagi uporabniškega okusa, kar bo povečalo personalizacijo storitve.

## **Izpolnjevanje Kanban načel**

- **Just-In-Time razvoj**: Naloge so razdeljene sproti in ocenjene glede na prioriteto.
- **WIP omejitve**: Upoštevane so omejitve števila aktivnih nalog.
- **Vizualizacija toka dela**: Vse naloge so vidne na Kanban tabli, napredek pa je jasen.

---

## **Zaključek**

**Naslednji koraki**:
