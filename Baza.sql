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
    `idOcena` INT NOT NULL AUTO_INCREMENT,
    `stZvezdic` INT NOT NULL,
    `mnenje` VARCHAR(100) NOT NULL,
    `vprasanje` VARCHAR(100) NOT NULL,
    `TKrecepta` INT NOT NULL,
    PRIMARY KEY (`idOcena`),
    FOREIGN KEY (TKrecepta) REFERENCES Recept (idrecepta)
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
