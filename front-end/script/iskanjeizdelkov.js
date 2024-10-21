
document.addEventListener('DOMContentLoaded', function () {

  let gumbLupaKliknjen = false;
  let gumbMreznoKliknjen = false;
  let gumbMapaKliknjen = false;

  let mreznaPrikazana = false;
  let mapaPrikazana = false;

  if (gumbMreznoKliknjen == false) {
    prikaziMrezno();
    mreznaPrikazana = true;
  }

  // if(gumbMapaKliknjen == false){
  //   prikaziMapo();
  //   mapaPrikazana = true;
  // }

  document.getElementById('btnLupa').addEventListener('click', function () {
    gumbLupaKliknjen = true;

    prikaziMrezno();
    mreznaPrikazana = true;

  });

  document.getElementById('btnMrezno').addEventListener('click', function () {
    gumbMreznoKliknjen = true;

    if (mreznaPrikazana == false) {
      prikaziMrezno();
      mreznaPrikazana = true;
    }

  });

  document.getElementById('btnMapa').addEventListener('click', function () {
    gumbMapaKliknjen = true;


    prikaziMapo();
    mapaPrikazana = true;


  });

});

/* Ostale spremenljivke */
//id izbranega kmeta
var idIzbranegaKmeta = 0;

function akcijaGumbIzdelki(id) {
  idIzbranegaKmeta = id;
  prikaziMrezno();

  mreznaPrikazana = true;
}

//dela
var mapa; // Declare the map variable globally

// First, define the custom icon
var customIcon = L.icon({
  iconUrl: '../images/icon-map-pin.svg',  // Path to your icon image
  iconSize: [48, 105],                     // Size of the icon
  iconAnchor: [19, 75],                   // Adjusted anchor point
  popupAnchor: [5, -75]                   // Adjusted popup anchor
});

//dela OK
async function iskanjeIzdelkov() {

  const niz = document.getElementById('productName').value;
  const resultsDiv = document.getElementById('rezultati_iskanja');

  try {
    let products;

    if (idIzbranegaKmeta != 0) {
      products = await fetchIzdelekByUporabnik(idIzbranegaKmeta);
      idIzbranegaKmeta = 0;
      // if (!products || products.length === 0) {
      //   // If no products are fetched or the array is empty, display a specific message
      //   resultsDiv.textContent = 'No products found.';
      // }
    }
    else {
      products = await fetchProductsByIskalniNiz(niz);
    }

    // //na podlagi produktov sortiranih pri iskanju izvedemo render le teh
    // let sortedProducts;

    // if ($("#btnRecommended").click()) {
    //   sortedProducts = [...products].sort(() => Math.random() - 0.5);

    // } else if ($("#btnAlphabet").click()) {
    //   sortedProducts = [...products].sort((a, b) => a.Naziv.localeCompare(b.Naziv));

    // } else if ($("#btnPrice").click()) {
    //   sortedProducts = [...products].sort((a, b) => a.Cena - b.Cena);

    // } else {
    //   sortedProducts = products;
    // }

    // renderProducts(sortedProducts);

    renderProducts(products); 
    const resultsDiv = document.getElementById('rezultati_iskanja');
    resultsDiv.innerHTML = '';

    let sortedProducts; // Default to unsorted products initially

    // document.getElementById('btnRecommended').addEventListener('click', () => {
    //   sortedProducts = [...products].sort(() => Math.random() - 0.5); // Shuffle products randomly
      
    //   const resultsDiv = document.getElementById('rezultati_iskanja');
    //   resultsDiv.innerHTML = 'rrr';
    //   //renderProducts(sortedProducts);
    // });

    // document.getElementById('btnAlphabet').addEventListener('click', () => {
    //   sortedProducts = [...products].sort((a, b) => a.Naziv.localeCompare(b.Naziv)); // Sort products alphabetically

    //   const resultsDiv = document.getElementById('rezultati_iskanja');
    //   resultsDiv.innerHTML = 'aaa';
    //   //renderProducts(sortedProducts);
    // });

    // document.getElementById('btnPrice').addEventListener('click', () => {
    //   sortedProducts = [...products].sort((a, b) => a.Cena - b.Cena); // Sort products by price

    //   const resultsDiv = document.getElementById('rezultati_iskanja');
    //   resultsDiv.innerHTML = 'ppp';
    //   //renderProducts(sortedProducts);
    // });

  } catch (error) {
    console.error('Error fetching products:', error);
    if (resultsDiv) {
      resultsDiv.style.color = 'white';
      resultsDiv.textContent = 'Trenutno noben izdelek ni na voljo';
      idIzbranegaKmeta = 0;
    }
  }
}

//dela OK
async function renderProducts(products) {

  const resultsDiv = document.getElementById('rezultati_iskanja');
  if (!resultsDiv) return;

  //pocisti vsebino iskalnega obmocja pred risanjem na novo
  resultsDiv.innerHTML = '';

  for (const product of products) {
    try {
      // if (idIzbranegaKmeta != 0) {
      //   try {
      //     const uporabnikObjects = await fetchUporabnikByID(idIzbranegaKmeta);
      //     const NaslovKmetije = uporabnikObjects.map(obj => obj.Naslov_kmetije).join(" ");

      //     // Update the text content of the 'ponudba-text' element
      //     document.getElementById('ponudba-text').textContent = `Ponudba kmetije ${NaslovKmetije}`;
      //   } catch (error) {
      //     console.error('Failed to fetch or process data:', error);
      //     document.getElementById('ponudba-text').textContent = 'Failed to load data';
      //   }
      // } else {
      //   document.getElementById('ponudba-text').textContent = 'Ponudba ';
      // }


      const KmetData = await fetchUporabnikiByIDizdelki(product.idIzdelki);
      //console.log("KmetData:", KmetData);

      const uporabnikIme = KmetData.map(obj => obj.Ime).join(" ");
      const uporabnikPriimek = KmetData.map(obj => obj.Priimek).join(" ");
      const uporabnikNaslov = KmetData.map(obj => obj.Naslov).join(" ");
      const uporabnikNaslovKmetije = KmetData.map(obj => obj.Naslov_kmetije).join(" ");
      const uporabnikDrzava = KmetData.map(obj => obj.Drzava).join(" ");
      const uporabnikPonudba = KmetData.map(obj => obj.Ponudba).join(" ");

      const date = new Date(product.Datum);
      const formattedDate = date.toLocaleDateString('sl-SI', { year: 'numeric', month: 'numeric', day: 'numeric' });

      // document.getElementById('ponudba-text').textContent = `Ponudba kmetije ${uporabnikNaslovKmetije}`;

      const card = `
        <div class="col-md-4 mb-4">
          <div class="card product-card" onclick="location.href='izdelek.html?id=${product.idIzdelki}'" id="card-produkti-res">
            <img src="../images/${product.Slika1}" class="card-img-top" alt="${product.Slika1}">
            <div class="card-body" id="card-body-naindex-res">
              <h5 class="card-title">${product.Naziv}</h5>
              <p class="card-text pl-3 pr-3">
                <span class="info-icon mt-3" id="opis-div-index-res">
                  <i class="fa-solid fa-info-circle mr-3 mb-3" style="margin-left: 2px;"></i> ${product.Opis}
                </span> <br>
                <i class="fa-solid fa-location-dot mr-3 mb-3 ml-1" style="color: #0d7537;"></i>${uporabnikNaslov.split(',').slice(1).join(',').trim()}, ${uporabnikDrzava} <br>
                <i class="fa-regular fa-user mr-3 mb-3 ml-1" style="color: #0d7537;"></i>${uporabnikIme} ${uporabnikPriimek}<br>
                <i class="fa-solid fa-house mr-3 mb-3" style="color: #0d7537; margin-left: 2px;"></i>${uporabnikNaslovKmetije} <br>
                <!--i class="fa-solid fa-truck mr-3 mb-3 ml-1" style="color: #0d7537;"></i> ${formattedDate} <br-->
                <!--i class="fa-solid fa-calendar-day mr-3 mb-3 ml-1"></i>Datum objave: ${formattedDate}<br-->
                <div class="price"><i class="fa fa-tag" aria-hidden="true"></i> ${product.Cena} ${" "} &euro; ${"/ kg"}<br></div>
              </p>
            </div>
          </div>
        </div>
      `;

      const wrapper = document.createElement('div');
      wrapper.innerHTML = card;
      if (wrapper.firstElementChild) {
        resultsDiv.appendChild(wrapper.firstElementChild);
      } else {
        console.error('No valid element to append:', wrapper.innerHTML);
      }
    } catch (error) {
      console.error('Failed to fetch data for product:', product.idIzdelki, error);
    }
  }
}

/* Fetchi */
async function fetchFarmAddress(id_uporabnik) {
  const response = await fetch(`http://localhost:3000/user/naslov/${id_uporabnik}`);
  const data = await response.json();
  return data;
}

async function fetchAllFarmAddresses() {
  try {
    const response = await fetch('http://localhost:3000/naslovikmetij');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    //console.log('Data fetched:', JSON.stringify(data, null, 2));  // Additional log for debugging
    return data;
  } catch (error) {
    console.error('Error fetching farm addresses:', error);
    return [];  // Ensure it returns an empty array on failure
  }
}

async function fetchUporabnikByNaslov(addressa) {
  const response = await fetch(`http://localhost:3000/uporabnikPoNaslovu?address=${addressa}`);
  const data = await response.json();
  return data;
}

async function fetchIzdelekByUporabnik(ajdi) {
  const response = await fetch(`http://localhost:3000/izdelkipouporabniku?id=${ajdi}`);
  const data = await response.json();
  return data;
}

async function fetchProductsByIskalniNiz(Iskalni) {
  const response = await fetch(`http://localhost:3000/izdelki/iskanje?iskalni_niz=${Iskalni}`);
  const data = await response.json();
  return data;
}

async function fetchUporabnikByID(ajdi) {
  const response = await fetch(`http://localhost:3000/user?id=${ajdi}`);
  const data = await response.json();
  return data;
}

async function fetchUporabnikiByIDizdelki(ajdi) {
  const response = await fetch(`http://localhost:3000/uporabnikpoizdelek?id=${ajdi}`);
  const data = await response.json();
  return data;
}

//
async function renderMap() {
  try {

    // Check if the map instance already exists
    if (mapa !== undefined) {
      mapa.remove(); // Remove the existing map instance ker se drugače prekriva
    }

    // Initialize the map and set its view to a chosen geographical coordinates and zoom level
    // Set the view to FERI in Maribor, Slovenia
    mapa = L.map('map-izdelki').setView([46.1246, 14.8150], 8);

    // Dodamo merilo na mapo
    L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(mapa);

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    await addMarkers(mapa); // Add markers for each address

  } catch (error) {
    console.error('Error fetching farm addresses:', error);
    return [];  // Ensure it returns an empty array on failure
  }


}

async function addMarkers(map) {

  // Fetch addresses and await the promise

  const addressObjects = await fetchAllFarmAddresses();

  // Extract the address strings from the address objects
  const addresses = addressObjects.map(obj => obj.Naslov);


  for (const address of addresses) {
    try {
      const coords = await geocodeAddress(address);
      if (coords) {
        const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

        //Pridobi podatke o osebi na naslovu
        const uporabnikObjects = await fetchUporabnikByNaslov(address);

        const uporabnikidUporabniki = uporabnikObjects.map(obj => obj.idUporabniki);
        const uporabnikIme = uporabnikObjects.map(obj => obj.Ime);
        const uporabnikPriimek = uporabnikObjects.map(obj => obj.Priimek);
        const uporabnikImeKmetije = uporabnikObjects.map(obj => obj.Naslov_kmetije);

        // Assuming each address only has one user associated with it
        const uporabnikDemeter = uporabnikObjects[0].Demeter;
        const uporabnikBioland = uporabnikObjects[0].Bioland;
        const uporabnikNaturland = uporabnikObjects[0].Naturland;
        const uporabnikEvropskiZeleniList = uporabnikObjects[0].Evropski_zeleni_list;
        const uporabnikBioSuisse = uporabnikObjects[0].Bio_Suisse;
        const uporabnikRegenerativno_kmetijstvo = uporabnikObjects[0].Regenerativno_kmetijstvo;

        // Toggle visibility based on uporabnikDemeter status
        const demeterClass = uporabnikDemeter ? 'visible' : 'hidden'; // 
        const biolandClass = uporabnikBioland ? 'visible' : 'hidden'; // 
        const naturlandClass = uporabnikNaturland ? 'visible' : 'hidden'; // 
        const euClass = uporabnikEvropskiZeleniList ? 'visible' : 'hidden'; // 
        const biosuisseClass = uporabnikBioSuisse ? 'visible' : 'hidden'; // 
        const regClass = uporabnikRegenerativno_kmetijstvo ? 'visible' : 'hidden'; // 

        // Create HTML content for the popup
        const popupContent = `
          <div style="width: 200px; padding: 5px; border-radius: 8px; color: #333;" id="popup-div-izdelki-mapa-res">
            <h3 style="color: #333; font-size: 16px; margin-top: 0;"> <strong>${uporabnikImeKmetije}<strong></h3>
            <div id="info-popup-div-res">
            <p style="color: #666; font-size: 14px;" id="popup-p-naslov-kmetije-izdelki-mapa-res">${address.split(',')[0]}</p>
            <i class="fa-solid fa-location-dot mr-3 mb-3 ml-1" style="color: #0d7537;"></i>${address.split(',').slice(1).join(',').trim()}, Slovenija <br>
            <i class="fa-regular fa-user mr-3 mb-3 ml-1" style="color: #0d7537;"></i>${uporabnikIme} ${uporabnikPriimek}<br>
            </div>
            <p style="color: #666; font-size: 14px;">
              <div>
                <p class="" id="popup-certifikati-p-res">Naši certifikati</p>
                <ul class="nav flex-column" id="popup-certifikati-ul-res">
                  <li class="footer-nav-item mb-2 d-flex align-items-center">
          
                    <a href="https://www.bio-suisse.ch/en/" target="_blank" id="bioSuisseLink" class="${biosuisseClass}">
                      <img src="../images/Bio_suisse_logo_(cropped).png" alt="Bio Suisse" title="Bio Suisse" class="mr-2"
                           style="max-width: 2em; max-height: 2em;">
                    </a>
                    <a href="https://ec.europa.eu/info/food-farming-fisheries/farming/organic-farming_en" target="_blank" id="euOrganicLink" class="${euClass}">
                      <img src="../images/eu-organic-logo-600x400_0.png" alt="EU Organic" title="EU Organic" class="mr-2"
                           style="max-width: 2em; max-height: 2em;">
                    </a>
                    <a href="https://www.naturland.de/en/" target="_blank" id="naturlandLink" class="${naturlandClass}">
                      <img src="../images/Naturland_Logo.svg.png" alt="Naturland" title="Naturland" class="mr-2"
                           style="max-width: 2em; max-height: 2em;">
                    </a>
                    <a href="https://www.bioland.de/verbraucher" target="_blank" id="biolandLink" class="${biolandClass}">
                      <img src="../images/logo.png" alt="Bioland" title="Bioland" class="mr-2"
                           style="max-width: 2em; max-height: 2em;">
                    </a>
                    <a href="https://www.demeter.net/" target="_blank" id="demeterLink" class="${demeterClass}">
                      <img src="../images/Capture-decran-2022-01-26-a-17.57.06.png" alt="Demeter" title="Demeter" class="mr-2"
                           style="max-width: 2em; max-height: 2em;">
                    </a>
                    <a href="https://knowledge4policy.ec.europa.eu/publication/what-regenerative-agriculture_en" target="_blank" id="regLink" class="${regClass}" style="text-decoration: none;">
                      reg
                    </a>

                  </li>
                </ul>
                </br>
              </div>
            
            </p>
            <button style="display: block; width: 100%; padding: 8px; margin-top: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="akcijaGumbIzdelki(${uporabnikidUporabniki})" id="popup-gumb-izdelki-res">Izdelki</button>
          </div>
          `;

        // Bind the popup with HTML content
        marker.bindPopup(popupContent);

        // Event listener for mouseover to open the popup
        marker.on('mouseover', function (e) {
          marker.openPopup();
        });

        // Event listener for mouseout to close the popup
        // marker.on('mouseout', function (e) {
        //   marker.closePopup();
        // });
      }
    } catch (error) {
      console.error(`Geocoding failed for address ${address}:`, error);
    }
  }
}

async function geocodeAddress(address) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } else {
    throw new Error('Geocoding failed');
  }
}

function prikaziMrezno() {
  iskanjeIzdelkov();
  const resultsDiv = document.getElementById('rezultati_iskanja_mrezna');
  const mapDiv = document.getElementById('rezultati_iskanja_mapa');
  if (resultsDiv) resultsDiv.style.display = 'block';
  if (mapDiv) mapDiv.style.display = 'none';
}

async function prikaziMapo() {
  renderMap();
  const resultsDiv = document.getElementById('rezultati_iskanja_mrezna');
  const mapDiv = document.getElementById('rezultati_iskanja_mapa');
  if (resultsDiv) resultsDiv.style.display = 'none';
  if (mapDiv) mapDiv.style.display = 'block';
}

