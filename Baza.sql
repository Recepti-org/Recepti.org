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

CREATE TABLE IF NOT EXISTS Sestavina (
    `idsestavine` INT NOT NULL AUTO_INCREMENT,
    `ime` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`idsestavine`)
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
('Palačinke', 'Mehke palačinke', 1, 20.0, 'palacinke.jpg', 2),
('Špageti Carbonara', 'Tradicionalni italijanski špageti', 3, 40.0, 'karbonara.jpg', 3);


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




INSERT INTO Sestavina (ime) VALUES 
('Moka'),       -- Flour
('Sladkor'),    -- Sugar
('Maslo'),      -- Butter
('Jajca'),      -- Eggs
('Sol');        -- Salt


INSERT INTO SestavinaKolicina (kolicina, enota, TK_sestavina, TK_recepta) VALUES 
(200, 'g', 1, 1), -- 200g of "Moka" for Recept ID 1
(100, 'g', 2, 1), -- 100g of "Sladkor" for Recept ID 1
(50, 'g', 3, 1),  -- 50g of "Maslo" for Recept ID 1
(2, 'pcs', 4, 1), -- 2 "Jajca" for Recept ID 1 
(1, 'tsp', 5, 1), -- 1 teaspoon of "Sol" for Recept ID 1

(300, 'g', 1, 2), -- 300g of "Moka" for Recept ID 2
(150, 'g', 2, 2), -- 150g of "Sladkor" for Recept ID 2
(100, 'g', 3, 2), -- 100g of "Maslo" for Recept ID 2
(3, 'pcs', 4, 2), -- 3 "Jajca" for Recept ID 2
(2, 'tsp', 5, 2); -- 2 teaspoons of "Sol" for Recept ID 2

