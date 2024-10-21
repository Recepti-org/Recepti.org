// Ustvari obvestilo o uspehu
function createSuccessAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    if (alertDiv) {
        alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
        alertDiv.className = 'successAlert';
        window.scrollTo(0, 0);
    }
}

// Prikaži košarico v kosarica.html
function prikazikosarico(elementId) {
    let kosaricaDiv = document.getElementById(elementId);
    kosaricaDiv.innerHTML = '';
    // Pridobi artikle iz sessionStorage
    let kos = JSON.parse(sessionStorage.getItem('kosarica')) || [];
    let skupajznesek = 0;
    kos.forEach((item, index) => {
        let izdelekDiv = document.createElement('div');
        izdelekDiv.innerHTML = `
        <div class="main-section-grid-item-kosarica" style="border-radius: 25px; padding: 0px; background-color: #fcf3ca7f;">
            <figure>
                <img style="border-radius: 25px; padding: 5%;" src="../images/${item.izdelek[0].Slika1}" alt="${item.izdelek[0].Naziv}">
            </figure>
            <article>
                <h3>${item.izdelek[0].Naziv}</h3>
                <p>Cena: ${item.izdelek[0].Cena}&euro;</p>
                <p>Količina: ${item.kolicina} kg</p>
                <p>Skupaj: ${item.izdelek[0].Cena * item.kolicina}&euro;</p>
            </article>
            <div class="gumbi-kosarica">
                <button class="mt-0 mr-4" style="background-color: transparent;" id="kosaricaOdstrani" onclick="odstraniizkošare(${index})">✖</button>
            </div>     
        </div>
        `;
        skupajznesek += parseFloat(item.izdelek[0].Cena) * parseFloat(item.kolicina);
        kosaricaDiv.appendChild(izdelekDiv);
    });
    
    let totalDiv = document.getElementById('znesek');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.classList.add('znesek');
        document.body.appendChild(totalDiv);
    }
    totalDiv.innerHTML = `<h5>Celotni znesek: <span id="zneseke">${skupajznesek.toFixed(2)}</span>€</h5>`;

    let prejsnadostava = 0;
    document.getElementById("dostava").addEventListener('change', function () {
        let znesekbrezdostave = document.getElementById("zneseke");
        let dostavica = parseFloat(znesekbrezdostave.innerText);
        const dostava = document.getElementById('dostava').value;
        switch (dostava) {
            case "osebni":
                dostavica -= prejsnadostava;
                prejsnadostava = 0;
                document.getElementById('postnina').textContent = `${prejsnadostava}`;
                break;
            case "navadna":
                dostavica -= prejsnadostava;
                prejsnadostava = 5.99;
                document.getElementById('postnina').textContent = `${prejsnadostava}`;
                break;
            case "dopol":
                dostavica -= prejsnadostava;
                prejsnadostava = 8.99;
                document.getElementById('postnina').textContent = `${prejsnadostava}`;
                break;
        }
        dostavica += prejsnadostava;
        znesekbrezdostave.innerText = dostavica.toFixed(2);
    });
}

// Ustvari košarico, če še ne obstaja
function naredikosarico() {
    if (!sessionStorage.getItem('kosarica')) {
        sessionStorage.setItem('kosarica', JSON.stringify([]));
    }
}
naredikosarico();

// Odstrani izdelek iz košarice
function odstraniizkošare(index) {
    let kos = JSON.parse(sessionStorage.getItem('kosarica'));
    kos.splice(index, 1);
    sessionStorage.setItem('kosarica', JSON.stringify(kos));
    prikazikosarico('kosar');
    updateItemCount(); // Posodobi števec izdelkov
    updateTotalAmount(); // Posodobi skupni znesek
}

// Pošlji nakup v bazo in posodobi stanje
async function nakup() {
    let uporabnik_id = sessionStorage.getItem("userID");
    let kosarica = JSON.parse(sessionStorage.getItem("kosarica"));
    let dostava_ = document.getElementById("dostava").value;
    const myUUID = uuid.v4();
    
    dostava_ = dostava_ === "osebni" ? "Osebni prevzem" :
                dostava_ === "navadna" ? "Standardna" :
                "Dopoldanska";
    
    let skupaj_cena = parseFloat(document.getElementById("zneseke").innerText);
    let promises = kosarica.map(item => {
        let cena = parseFloat(item.izdelek[0].Cena);
        let kolicina = parseFloat(item.kolicina);
        let znesek_izd = cena * kolicina;
        let id_izd = item.izdelek[0].idIzdelki;
        let datum = formatDate(new Date().toISOString());
        uporabnik_id = parseInt(uporabnik_id);

        let nakup = {
            St_nakupa: myUUID,
            TK_Uporabniki_Potrosnik: uporabnik_id,
            TK_Uporabniki_Proizvajalec: uporabnik_id,
            TK_Izdelki: id_izd,
            Znesek: znesek_izd,
            Kolicina: kolicina, 
            Znesek_nakupa: skupaj_cena,
            Dostava: dostava_,
            Datum: datum,
        };

        return fetch("http://localhost:3000/nakupi/", {
            method: "POST",
            body: JSON.stringify(nakup),
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
    try {
        await Promise.all(promises);
        console.log("All items processed.");
        sessionStorage.setItem('kosarica', JSON.stringify([]));
        sessionStorage.setItem('purchaseCompleted', 'true');
        window.location.href = 'izdelki.html';
    } catch (error) {
        console.error("An error occurred during the purchase process:", error);
    }
}
// Formatiraj datum
function formatDate(isoString) {
    let date = new Date(isoString);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); 
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
console.log(formatDate("2024-06-04T09:09:07.838Z")); 
// Ustvari košarico, če še ne obstaja
function naredikosarico() {
    if (!sessionStorage.getItem('kosarica')) {
        sessionStorage.setItem('kosarica', JSON.stringify([]));
    }
}
naredikosarico();
// Dodaj izdelek v košarico
function kosarica() {
    const id = document.getElementById("id").innerText;
    const kolicina = document.getElementById('customRange3').value;
    fetch(`http://localhost:3000/izdelek/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(izdelek => {
            console.log('Product fetched:', izdelek);
            dodajvkosarico(izdelek, kolicina);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Dodaj izdelek v košarico
function dodajvkosarico(izdelek, kolicina) {
    let kos = JSON.parse(sessionStorage.getItem('kosarica')) || [];
    kos.push({
        izdelek: izdelek,
        kolicina: kolicina
    });
    sessionStorage.setItem('kosarica', JSON.stringify(kos));
    createSuccessAlert("Izdelek je bil dodan v košarico!");
    updateItemCount();
}
// Posodobi števec izdelkov
function updateItemCount() {
    const kosarica = JSON.parse(sessionStorage.getItem('kosarica')) || [];
    document.getElementById('krogec').innerText = kosarica.length;
    document.getElementById('steviloIzdelkov').textContent = `Število izbranih izdelkov: ${kosarica.length}`;
}
// Posodobi skupni znesek
function updateTotalAmount() {
    let total = 0;
    const kosarica = JSON.parse(sessionStorage.getItem('kosarica')) || [];
    kosarica.forEach(item => {
        total += item.izdelek[0].Cena * item.kolicina;
    });
    document.getElementById('zneseke').innerText = total.toFixed(2);
}
// Kliči funkcijo ob nalaganju strani in ob posodobitvah košarice
document.addEventListener('DOMContentLoaded', updateItemCount);
document.getElementById("gumb").addEventListener("click", kosarica);
