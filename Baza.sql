DROP DATABASE IF EXISTS Recepti;

CREATE DATABASE IF NOT EXISTS Recepti;

USE Recepti;


CREATE TABLE IF NOT EXISTS Uporabnik (
    idUporabnika INT NOT NULL AUTO_INCREMENT,
    ime VARCHAR(45) NOT NULL,
    priimek VARCHAR(45) NOT NULL,
    PRIMARY KEY (idUporabnika)
);

CREATE TABLE IF NOT EXISTS Recept (
    idrecepta INT NOT NULL AUTO_INCREMENT,
    Ime VARCHAR(45) NOT NULL,
    Opis VARCHAR(45) NOT NULL,
    tezavnost INT NOT NULL,
    caspriprave DECIMAL NOT NULL,
    slika VARCHAR(100) NOT NULL,
    TK_Uporabnik INT NOT NULL,
    PRIMARY KEY (idrecepta),
    FOREIGN KEY (TK_Uporabnik) REFERENCES Uporabnik(idUporabnika)
);

CREATE TABLE IF NOT EXISTS Koraki (
    `idkoraka` INT NOT NULL AUTO_INCREMENT,
    `opis` VARCHAR(100) NOT NULL,
    `stkoraka` int NOT NULL,
    `TKrecepta` INT NOT NULL,
    PRIMARY KEY (`idkoraka`)
);

CREATE TABLE IF NOT EXISTS Ocena (
    `id_ocena` INT NOT NULL AUTO_INCREMENT,
    `st_zvezdic` INT NOT NULL,
    `mnenje` VARCHAR(100) NOT NULL,
    `vprasanje` VARCHAR(100) NOT NULL,
    `TKrecepta` INT,
    `TKuporabnik` INT,
    PRIMARY KEY (`id_ocena`),
    FOREIGN KEY (TKrecepta) REFERENCES Recept (idrecepta),
    FOREIGN KEY (TKuporabnik) REFERENCES Uporabnik (idUporabnika)
);

CREATE TABLE IF NOT EXISTS Tipsestavine(
    `idtipa` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ime` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Sestavina (
    `idsestavine` INT NOT NULL AUTO_INCREMENT,
    `ime` VARCHAR(200) NOT NULL,
    `cena` FLOAT NOT NULL CHECK (cena >= 0) DEFAULT 0.00,
        `TK_tip` INT NOT NULL,
    PRIMARY KEY (`idsestavine`),
	FOREIGN KEY (TK_tip) REFERENCES Tipsestavine (idtipa)
);

CREATE TABLE IF NOT EXISTS SestavinaKolicina(
    `idsestavinakoli` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `kolicina` INT NOT NULL,
    `enota` VARCHAR(5) NOT NULL,
    `TK_sestavina` INT NOT NULL,
    `TK_recepta` INT NOT NULL,
	FOREIGN KEY (TK_sestavina) REFERENCES Sestavina (idsestavine),
    FOREIGN KEY (TK_recepta) REFERENCES Recept (idrecepta)
);


alter table Koraki
add constraint TK_Recept_Korak foreign key (TKrecepta) references Recept (idrecepta);



INSERT INTO Uporabnik (Ime, Priimek) 
VALUES 
('Marko', 'Novak'),
('Ana', 'Kovač'),
('Maja', 'Horvat');

INSERT INTO Recept (Ime, Opis, tezavnost, caspriprave, slika, TK_Uporabnik)
VALUES 
('Rižota s piščancem', 'Okusna piščančja rižota', 2, 35.5, 'Rizota-s-piscancem-in-zelenjavo-500x375.jpg', 1),
('Palačinke', 'Mehke palačinke', 1, 20.0, 'palacinke.jpg', 1),
('Špageti Carbonara', 'Tradicionalni italijanski špageti', 3, 40.0, 'karbonara.jpg', 3),
('Zelenjavna lazanja', 'Sveža lazanja z zelenjavo in parmezanom', 2, 50.0, 'zelenjavna-lazanja.jpg', 3),
('Čokoladna torta', 'Sočna čokoladna torta s prelivom', 1, 90.0, 'cokoladna-torta.jpg', 3);


-- Koraki za "Rižota s piščancem" (idrecepta = 1)
INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Segrej olje v ponvi.', 1, 1),
('Dodaj narezan piščanec in praži do zlato-rjave barve.', 2, 1),
('Dodaj riž in mešaj.', 3, 1),
('Počasi dolivaj jušno osnovo in kuhaj.', 4, 1);

-- Koraki za "Palačinke" (idrecepta = 2)
INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Zmešaj jajca, mleko in moko.', 1, 2),
('Segrej ponev in dodaj malo olja.', 2, 2),
('Zlij maso v ponev in speci palačinke.', 3, 2);

-- Koraki za "Špageti Carbonara" (idrecepta = 3)
INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Skuhaj špagete v slani vodi.', 1, 3),
('Praži panceto do hrustljavosti.', 2, 3),
('Zmešaj jajca in sir v posodi.', 3, 3),
('Vmešaj kuhane špagete v panceto in dodaj jajčno zmes.', 4, 3);

INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Segrej pečico na 180 °C.', 1, 4),
('V ponvi segrej olje in prepraži čebulo ter česen.', 2, 4),
('Dodaj narezan korenček, bučke in papriko ter praži.', 3, 4),
('Primešaj paradižnikovo omako in začini po okusu.', 4, 4),
('V pekač izmenično polagaj plasti testenin, zelenjavne omake in sira.', 5, 4),
('Zaključi s plastjo sira in peci v pečici 40 minut.', 6, 4);

INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Segrej pečico na 180 °C.', 1, 5),
('V skledi zmešaj moko, kakav v prahu, pecilni prašek in sol.', 2, 5),
('V drugi skledi zmešaj sladkor, jajca, mleko in stopljeno maslo.', 3, 5),
('Postopoma dodaj suhe sestavine in mešaj, dokler ni masa gladka.', 4, 5),
('Maso vlij v pekač in peci 35 minut.', 5, 5),
('Ohladi torto in premaži z glazuro ali čokoladnim prelivom.', 6, 5);


-- Ocene for "Rižota s piščancem" (idrecepta = 1)
INSERT INTO Ocena (st_zvezdic, mnenje, vprasanje, TKrecepta, TKuporabnik) 
VALUES 
(5, 'Zelo okusno, definitivno priporočam!', 'Katera zelišča priporočate za boljši okus?', 1, 1),
(4, 'Dobro, a malo premalo začinjeno.', 'Katera zelišča priporočate za boljši okus?', 1, 2);

-- Ocene for "Palačinke" (idrecepta = 2)
INSERT INTO Ocena (st_zvezdic, mnenje, vprasanje, TKrecepta, TKuporabnik) 
VALUES 
(5, 'Najboljše palačinke, kar sem jih jedel!', 'Katera zelišča priporočate za boljši okus?', 2, 3),
(3, 'Dobra osnova, a testo bi lahko bilo bolj rahlo.', 'Ali bi lahko dodali še kako sestavino za rahlost?', 2, 1);

-- Ocene for "Špageti Carbonara" (idrecepta = 3)
INSERT INTO Ocena (st_zvezdic, mnenje, vprasanje, TKrecepta, TKuporabnik) 
VALUES 
(5, 'Pravi italijanski okus, popolno!','Katera zelišča priporočate za boljši okus?', 3, 2),
(4, 'Zelo dobro, a malo premalo sira za moj okus.', 'Katera zelišča priporočate za boljši okus?', 3, 3),
(2, 'Preveč slano za moj okus.', 'Ali je možno zmanjšati količino pancete?', 3, 1);

INSERT INTO Tipsestavine (ime) VALUES 
('Osnovne sestavine'), -- ID 1
('Sladila'),           -- ID 2
('Mlečni izdelki'),    -- ID 3
('Beljakovine'),       -- ID 4
('Začimbe'),           -- ID 5
('Zelenjava'),         -- ID 6
('Mesni izdelki'),     -- ID 7
('Žitarice'),          -- ID 8
('Zelišča'),           -- ID 9
('Testenine'),         -- ID 10
('Suhe mesnine'),      -- ID 11
('Smetana in sir'),    -- ID 12
('Tekočine'),          -- ID 13
('Voda'),              -- ID 14
('Drugo');             -- Additional categories

INSERT INTO Sestavina (ime, cena, TK_tip) VALUES 
('Moka', 1.20 / 1000, 1),       -- Cena na gram
('Sladkor', 0.90 / 1000, 5),    -- Cena na gram
('Maslo', 2.50 / 1000, 1),      -- Cena na gram
('Jajca', 0.30, 1),             -- Cena na kos
('Sol', 0.05 / 1000, 5),        -- Cena na gram
('Paradižnik', 1.50 / 1000, 6), -- Cena na gram
('Piščanec', 5.00 / 1000, 7),   -- Cena na gram
('Riž', 1.80 / 1000, 8),        -- Cena na gram
('Paprika', 1.20 / 1000, 9),    -- Cena na gram
('Špageti', 1.50 / 1000, 10),   -- Cena na gram
('Hamburška slanina', 3.00 / 1000, 11), -- Cena na gram
('Smetana', 0.80, 12),          -- Cena na liter
('Mleko', 0.70, 1),             -- Cena na liter
('Voda', 0.00, 1),              -- Cena na liter
('Čebula', 0.40, 1),            -- Cena na kos
('Česen', 0.20, 1),             -- Cena na kos
('Bučke', 1.00 / 1000, 6),      -- Cena na gram
('Korenček', 0.50 / 1000, 6),   -- Cena na gram
('Nariban sir', 2.80 / 1000, 12), -- Cena na gram
('Kakav v prahu', 1.50 / 1000, 2), -- Cena na gram
('Pecilni prašek', 0.30, 2),    -- Cena na kos
('Čokoladna glazura', 3.50 / 1000, 2); -- Cena na gram

INSERT INTO SestavinaKolicina (kolicina, enota, TK_sestavina, TK_recepta) VALUES 
(200, 'g', 7, 1),  -- 200g "Piščanec" for Recept ID 1
(400, 'g', 8, 1),  -- 400g "Riž" for Recept ID 1
(2, 'pcs', 9, 1),  -- 2 "Paprika" for Recept ID 1
(3, 'pcs', 6, 1),  -- 3 "Paradižnik" for Recept ID 1
(0.5, 'L', 14, 1), -- 0.5L "Voda" for Recept ID 1
(3, 'pcs', 4, 1),  -- 3 "Jajca" for Recept ID 1

(300, 'g', 1, 2),  -- 300g "Moka" for Recept ID 2
(100, 'g', 3, 2),  -- 100g "Maslo" for Recept ID 2
(3, 'pcs', 4, 2),  -- 3 "Jajca" for Recept ID 2
(0.5, 'L', 13, 2), -- 0.5L "Mleko" for Recept ID 2
(0.5, 'L', 14, 2), -- 0.5L "Voda" for Recept ID 2

(1, 'pcs', 6, 3),  -- 1 "Paradižnik" for Recept ID 3
(400, 'g', 10, 3), -- 400g "Špageti" for Recept ID 3
(240, 'g', 11, 3), -- 240g "Hamburška slanina" for Recept ID 3
(200, 'mL', 12, 3),-- 200mL "Smetana" for Recept ID 3
(150, 'g', 1, 3),  -- 150g "Moka" for Recept ID 3
(100, 'g', 3, 3),  -- 100g "Maslo" for Recept ID 3
(2, 'pcs', 4, 3),  -- 2 "Jajca" for Recept ID 3

(2, 'pcs', 15, 4), -- 2 "Čebula" for Recept ID 4
(3, 'pcs', 16, 4), -- 3 "Česen" for Recept ID 4
(2, 'pcs', 17, 4), -- 2 "Bučke" for Recept ID 4
(2, 'pcs', 18, 4), -- 2 "Korenček" for Recept ID 4
(500, 'g', 6, 4),  -- 500g "Paradižnik" for Recept ID 4
(300, 'g', 19, 4), -- 300g "Nariban sir" for Recept ID 4
(400, 'g', 8, 4),  -- 400g "Riž" for Recept ID 4

(250, 'g', 1, 5),  -- 250g "Moka" for Recept ID 5
(200, 'g', 2, 5),  -- 200g "Sladkor" for Recept ID 5
(50, 'g', 20, 5),  -- 50g "Kakav v prahu" for Recept ID 5
(1, 'pcs', 21, 5), -- 1 "Pecilni prašek" for Recept ID 5
(3, 'pcs', 4, 5),  -- 3 "Jajca" for Recept ID 5
(150, 'g', 3, 5),  -- 150g "Maslo" for Recept ID 5
(200, 'g', 22, 5); -- 200g "Čokoladna glazura" for Recept ID 5

INSERT INTO Recept (Ime, Opis, tezavnost, caspriprave, slika, TK_Uporabnik) 
VALUES 
('Piščančji curry', 'Okusen piščančji curry z začimbami', 3, 40.0, 'curry.webp', 2);


-- Koraki za "Piščančji curry" (idrecepta = 6)
INSERT INTO Koraki (opis, stkoraka, TKrecepta) 
VALUES 
('Segrej olje v ponvi.', 1, 6),
('Dodaj narezano čebulo in česen ter praži, dokler ne postaneta mehka.', 2, 6),
('Dodaj narezano piščančje meso in praži, dokler ne postane zlato rjavo.', 3, 6),
('Vmešaj začimbe (kumin, kurkuma, curry v prahu) in praži še 2 minuti.', 4, 6),
('Dodaj kokosovo mleko in kuhaj, dokler se omaka ne zgosti.', 5, 6),
('Na koncu dodaj svež koriander in postreži s kuhanim rižem.', 6, 6);

INSERT INTO Sestavina (ime, cena, TK_tip) VALUES 
('Kokosovo mleko', 0.50 / 1000, 1),    -- Cena na liter
('Kurry v prahu', 1.80 / 100, 5), -- Cena na gram
('Kumin', 2.00 / 100, 5),      -- Cena na gram
('Kurkuma', 1.50 / 100, 5);    -- Cena na gram

INSERT INTO SestavinaKolicina (kolicina, enota, TK_sestavina, TK_recepta) VALUES 
(300, 'g', 7, 6),  -- 300g "Piščanec" for Recept ID 6
(1, 'pcs', 15, 6), -- 1 "Čebula" for Recept ID 6
(2, 'pcs', 16, 6), -- 2 "Česen" for Recept ID 6
(400, 'mL', 23, 6),-- 400mL "Kokosovo mleko" for Recept ID 6
(10, 'g', 24, 6),  -- 10g "Kurry v prahu" for Recept ID 6
(5, 'g', 25, 6),   -- 5g "Kumin" for Recept ID 6
(5, 'g', 26, 6),   -- 5g "Kurkuma" for Recept ID 6
(200, 'g', 8, 6);  -- 200g "Riž" for Recept ID 6
