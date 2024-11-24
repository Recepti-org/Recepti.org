function openPopup(idIzdelki, productId) {
  const uporabnikId = sessionStorage.getItem("userID");
  fetch(`http://localhost:3000/izdelki/${uporabnikId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("izdelekId").value = productId;
    })
    .catch((error) => console.error("Error:", error));

  document.getElementById("loginPopup").style.display = "block";
}

// Funkcija za zapiranje popup-a
function closePopup() {
  const loginPopup = document.getElementById("loginPopup");
  if (loginPopup) {
    loginPopup.style.display = "none";
  } else {
    console.error('Element with id "loginPopup" not found.');
  }
}

// Funkcija za zapiranje popup-a ob kliku izven popup-a
window.onclick = function (event) {
  const loginPopup = document.getElementById("loginPopup");
  if (loginPopup && event.target === loginPopup) {
    closePopup();
  }
};

function setRating(event, inputId) {
  var starRating = event.currentTarget;
  var stars = Array.from(starRating.querySelectorAll("span"));
  var starIndex = stars.indexOf(event.target);
  if (starIndex !== -1) {
    var rating = stars.length - starIndex;
    document.getElementById(inputId).value = rating;
    stars.forEach(function (star, index) {
      star.style.color = index >= starIndex ? "#fde16d" : "#888";
    });
  }
}

// Generate the stars
document.querySelectorAll(".star-rating").forEach(function (starRating) {
  for (var i = 0; i < 5; i++) {
    var star = document.createElement("span");
    star.textContent = "★";
    starRating.appendChild(star);
  }
});

function submitOcena() {
  document
    .getElementById("ocenaForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // prepreči običajno pošiljanje obrazca

      const ocenaTocnosti = document.getElementById("ocenaTocnosti").value;
      const ocenaKakovosti = document.getElementById("ocenaKakovosti").value;
      const ocenaSkladnosti = document.getElementById("ocenaSkladnosti").value;
      const mnenje = document.getElementById("mnenje").value;
      const uporabnikId = sessionStorage.getItem("userID"); //document.getElementById('uporabnikId').value
      const izdelekId = document.getElementById("izdelekId").value; // Uporabite idIzdelki iz skritega polja

      const data = {
        ocenaTocnosti: ocenaTocnosti,
        ocenaKakovosti: ocenaKakovosti,
        ocenaSkladnosti: ocenaSkladnosti,
        mnenje: mnenje,
        uporabnikId: uporabnikId,
        izdelekId: izdelekId,
      };

      fetch("http://localhost:3000/oceni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Po uspešni oddaji obrazca, pobriši vnosna polja
          document.getElementById("ocenaTocnosti").value = "";
          document.getElementById("ocenaKakovosti").value = "";
          document.getElementById("ocenaSkladnosti").value = "";
          document.getElementById("mnenje").value = "";
          document.getElementById("izdelekId").value = ""; // Ponastavite tudi skrito polje
          // Ponastavi zvezdice
          document
            .querySelectorAll(".star-rating")
            .forEach(function (starRating) {
              starRating.querySelectorAll("span").forEach(function (star) {
                star.style.color = "#888";
              });
            });
          // Zapri popup
          closePopup();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

function changeCondition(index, product) {
  var conditions = product.StanjeNazivi;
  var images = product.StanjeSlike;
  var condition = conditions[index];
  var imageIndex = index;

  // Preverite, ali obstaja slika za to stanje
  if (!images[index]) {
    // Če slike ni, izberite naključno sliko
    imageIndex = Math.floor(Math.random() * images.length);
  }

  if (condition) {
    // Spremeni naslov stanja
    document.getElementById("condition-title").textContent = condition.Naziv;
    // Spremeni sliko stanja
    document.querySelector(".carousel-inner .carousel-item.active img").src =
      "../images/" + images[imageIndex];
  } else {
    // Nastavite na privzeto vrednost, če stanje ne obstaja
    document.getElementById("condition-title").textContent = "Privzeto stanje";
    document.querySelector(".carousel-inner .carousel-item.active img").src =
      "../images/" + images[images.length - 1]; // Privzeta slika je zadnja slika, ki je bila prikazana
  }
}

window.onload = function () {
  let userId = sessionStorage.getItem("userID");
  fetch(`http://localhost:3000/pridobinarocila?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      let productContainer = document.getElementById("productContainer");
      let groupedData = {};
      data.forEach((product) => {
        if (!groupedData[product.idIzdelki]) {
          groupedData[product.idIzdelki] = {
            ...product,
            StanjeSlike: [product.StanjeSlika],
            StanjeNazivi: [
              {
                Naziv: product.StanjeNaziv,
                Datum: new Date(product.StanjeDatum).toLocaleDateString(),
              },
            ],
          };
        } else {
          groupedData[product.idIzdelki].StanjeSlike.push(product.StanjeSlika);
          groupedData[product.idIzdelki].StanjeNazivi.push({
            Naziv: product.StanjeNaziv,
            Datum: new Date(product.StanjeDatum).toLocaleDateString(),
          });
        }
      });

      Object.values(groupedData).forEach((product) => {
        // Spremenite format datuma na človeku prijazen način
        let date = new Date(product.Datum);
        let formattedDate = date.toLocaleString();
        console.log(product.StanjeSlike);

        let card = `
           <style>
        body {
            font-family: 'Noticia Text', serif;
        }

        .card-horizontal {
            background-color: #fcf8e8;
            border-radius: 15px;
            margin-top: 20px;
            padding: 20px;
        }

        .card-horizontal img {
            border-radius: 10px;
        }

        .product-title {
            font-size: 24px;
            font-weight: bold;
        }

        .producer-name {
            font-size: 18px;
            color: #666;
        }

        .product-price {
            background-color: #d3d3d3;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            height: 100px;
            margin: 10px 0;
        }

        .product-date {
            text-align: right;
            color: gray;
        }

        .condition-title {
            background-color: #d39595;
            border-radius: 10px;
            padding: 5px;
            text-align: center;
            font-weight: bold;
            width: 100%;
            margin-bottom: 10px;
        }

        .timeline-horizontal {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap;
            background-color: #fdd1a7;
            border-radius: 10px;
            padding: 10px;
            margin-top: 20px;
            position: relative;
        }

        .timeline-horizontal .timeline-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 25%;
            position: relative;
            padding: 0 10px;
        }

        .timeline-horizontal .timeline-item img {
            width: 30px;
            height: 30px;
        }

        .timeline-horizontal .timeline-item span {
            margin-top: 10px;
            font-size: 14px;
        }

        .carousel-inner img {
            border-radius: 10px;
        }

        .carousel-item img {
            object-fit: cover;
            height: 320px;
            margin: 0px;
        }

        .center-button {
            text-align: center;
        }

        .carousel-container {
            position: relative;
        }

        .carousel-inner {
            height: 320px;
        }

        .carousel-container h5 {
            text-align: center;
            background-color: rgba(211, 149, 149, 0.8);
            padding: 5px 10px;
            border-radius: 10px;
            width: 90%;
            margin: 0 auto 10px;
        }

        .carousel-container {
            margin-top: 40px;
        }

        .circle-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #AD856F;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 2;
            background-color: white;
        }

        .circle-icon img {
            width: 100%;
            height: auto;
        }

        .timeline-line {
            position: absolute;
            top: 50%;
            left: calc(10% + 25px); /* Adjust to fit inside the icons */
            width: calc(80% - 50px); /* Adjust to fit between the icons */
            height: 2px;
            background-color: #AD856F;
            z-index: 1;
            transform: translateY(-50%);
        }

        .timeline-horizontal .timeline-item .date {
            margin-top: 5px;
            font-size: 12px;
            color: gray;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="col-12 mb-4">
            <div class="card card-horizontal shadow-lg p-3 mb-5 bg-white rounded">
                <div class="row no-gutters position-relative">
                    <!-- First column: Product image -->
                    <div class="col-lg-4 col-md-12">
                        <div class="card-body">
                            <h4 class="product-title">${product.Naziv}</h4>
                            <!--p class="producer-name">${
                              product.ProizvajalecIme
                            }</p-->
                            <p class="delivery-date" style="font-weight: 300; margin-bottom: 5px;">Predvidena dostava: ${
                              product.Datum_dostave
                            }</p>
                        </div>
                        <img src="../images/${
                          product.slika1
                        }" class="card-img-top" alt="Product Image" style="object-fit: cover; height: 320px; margin: 10px; border-radius: 10px;">
                    </div>
                    <!-- Second column: Content -->
                    <div class="col-lg-4 col-md-12 d-flex align-items-start flex-column">
                        <div class="card-body text-center" style="align-self: center;">
                            <p class="product-date" style="font-size: 15px; margin-top: -20px; text-align: center;">Datum nakupa: ${formattedDate}</p>
                            <div class="product-price" style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
                                <div>
                                    <img src="../images/nakup.svg" alt="Nakup" style="width: 20px; height: 20px;"><br>
                                    Količina: ${product.Kolicina} kg
                                </div>
                                <div>
                                    Znesek:  ${product.Znesek} €
                                </div>
                    </div>
<div class="added-states" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    ${
      product.StanjeNazivi.length > 0
        ? [...new Set(product.StanjeNazivi.map((stanje) => stanje.Naziv))]
            .map((naziv, index) => {
              let icon;
              switch (naziv) {
                case "Priprava nasada / sejanje":
                  icon = "sejanje.svg";
                  break;
                case "Faza rasti":
                  icon = "rast.svg";
                  break;
                case "Obiranje":
                  icon = "obiranje.svg";
                  break;
                case "Pošiljanje":
                  icon = "posiljanje.svg";
                  break;
              }
              return icon
                ? `<img src="../images/${icon}" alt="${naziv}" style="width: 30px; height: 30px;">`
                : "";
            })
            .join("") +
          `<p>${
            product.StanjeNazivi.some((stanje) => stanje.Naziv === "Pošiljanje")
              ? "Vaše posvojeno drevo je obrodilo sadove. Ocenite jih!"
              : "Posvojeno drevo še raste. Poglejte časovnico!"
          }</p>
        <span style="font-size: 30px; cursor: pointer;">↓</span>`
        : "Drevesa se še posvajajo. Kmalu boste lahko spremljali rast vaših pridelkov."
    }
</div>



                            ${
                              product.StanjeNazivi.some(
                                (stanje) => stanje.Naziv === "Pošiljanje"
                              )
                                ? `<div class="center-button">
                                <button onclick="openPopup(${product.idIzdelki}, ${product.idIzdelki})" class="btn-kmetija">Podaj mnenje</button>
                            </div>`
                                : ""
                            }
                        </div>
                    </div>
                    <!-- Third column: Caption "Producer's photos of conditions:" and scrolling list of condition images -->
                    <div class="col-lg-4 col-md-12 carousel-container">
                        <h5 id="condition-title" class="condition-title">Pridelovalčeve fotografije stanj:</h5>
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000">
                            <div class="carousel-inner">
                                ${product.StanjeSlike.map(
                                  (slika, index) => `
                                    <div class="carousel-item ${
                                      index === 0 ? "active" : ""
                                    }">
                                        <img src="../images/${slika}" class="d-block w-100">
                                    </div>
                                `
                                ).join("")}
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="timeline-horizontal d-flex flex-wrap justify-content-between position-relative">
                            ${[
                              "Priprava nasada / sejanje",
                              "Faza rasti",
                              "Obiranje",
                              "Pošiljanje",
                            ]
                              .map((naziv, index) => {
                                let icon;
                                switch (naziv) {
                                  case "Priprava nasada / sejanje":
                                    icon = "sejanje.svg";
                                    break;
                                  case "Faza rasti":
                                    icon = "rast.svg";
                                    break;
                                  case "Obiranje":
                                    icon = "obiranje.svg";
                                    break;
                                  case "Pošiljanje":
                                    icon = "posiljanje.svg";
                                    break;
                                }
                                const stanje = product.StanjeNazivi.find(
                                  (s) => s.Naziv === naziv
                                );
                                return `<div class="timeline-item" onclick="changeCondition(${index}, ${JSON.stringify(
                                  product
                                ).replace(/"/g, '"')})">
    <div class="circle-icon">
        <img src="../images/${icon}" alt="${naziv}">
    </div>
    <span class="date" style="color:black">${
      stanje ? `${stanje.Datum}` : ""
    }</span>
    <span>${naziv}</span>
</div>`;
                              })
                              .join("")}
                        </div>
                        <div class="timeline-line"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
        $('#carouselExampleIndicators').on('slid.bs.carousel', function () {
            var currentIndex = $('div.active').index();
            changeCondition(currentIndex, JSON.parse('${JSON.stringify(
              product
            ).replace(/"/g, '"')}'));
        });
    </script>
</body>

`;

        productContainer.innerHTML += card;
      });
    })
    .catch((error) => console.error(error));
};
