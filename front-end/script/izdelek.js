var idrecept;
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`http://localhost:8080/recept/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      console.log(product);
      document.getElementById("ime").textContent = `${product.ime}`;
      document.getElementById("cas").textContent = `${product.caspriprave} min`;
      document.getElementById("opis").textContent = `${product.opis}`;
      idrecept = product.idrecepta;

      const myDiv = document.getElementById("slika");
      const newElement = document.createElement("img");
      newElement.src = "../images/" + product.slika;
      newElement.classList = "d-block w-100";
      myDiv.appendChild(newElement);

      const zvede = document.getElementById("tezavnost");
      if (product.tezavnost !== undefined && product.tezavnost !== null) {
        const starsDiv = vzvezdice(product.tezavnost);
        if (starsDiv instanceof Node) {
          zvede.appendChild(starsDiv);
        }
      } else {
        console.error("Invalid tezavnost value:", product.tezavnost);
      }

      var idrecepta = product.idrecepta;
      fetch(`http://localhost:8080/koraki/${idrecepta}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((koraki) => {
          console.log(koraki);
          const korakiList = document.getElementById("koraki");
          korakiList.innerHTML = "";
          koraki.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = `${index + 1}. ${item.opis}`;
            korakiList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    });

  document.getElementById("gumb").addEventListener("click", function () {
    $("#recipeModal").modal("show");
  });

  // Function to render the star rating
  function vzvezdice(x) {
    const xe = parseInt(x);
    const div = document.createElement("div");
    div.classList.add("star-rating");

    for (let i = 0; i < 5; i++) {
      const star = document.createElement("span");
      if (i < xe) {
        star.classList.add("selected");
      }
      star.textContent = "★";
      div.appendChild(star);
    }

    return div;
  }

  // Handle star click for rating
  document
    .getElementById("starRating")
    .addEventListener("click", function (event) {
      const stars = Array.from(event.currentTarget.children);
      const rating = stars.indexOf(event.target) + 1;

      // Set the value of the hidden input for the rating
      document.getElementById("ocenaSkladnosti").value = rating;

      // Update the visual rating
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
    });

  document.getElementById("shrani").addEventListener("click", function (event) {
    $("#recipeModal").modal("hide");
    $("#questionModal").modal("show");
  });

  // Initialize the star rating
  const starRatingDiv = document.getElementById("starRating");
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    starRatingDiv.appendChild(star);
  }
});

// Function to fetch ingredients and adjust quantities based on the input number of people
// Funkcija za prikaz sestavin za privzeto število oseb (2 osebi)
function receptsestavine() {
  const urlParams = new URLSearchParams(window.location.search);
  const idrecept = urlParams.get("id"); // Pridobi ID recepta iz URL-parametrov

  if (!idrecept) {
    console.error("Manjka ID recepta v URL-ju.");
    return;
  }

  const peopleCountInput = document.getElementById("peopleCount");
  const peopleCount = peopleCountInput.value || 1; // Privzeto število oseb, če ni izbrano

  if (peopleCount > 0) {
    fetch(`http://localhost:8080/api/recept/${idrecept}`)
      .then((response) => response.json())
      .then((data) => {
        // Posodobi UI s sestavinami za izbrano število oseb
        updateIngredientList(data, peopleCount);
      })
      .catch((error) => {
        console.error("Napaka pri pridobivanju podatkov o sestavinah:", error);
      });
  } else {
    // Če ni veljavne številke oseb, prikaži privzeto sporočilo
    document.getElementById("sestavine").innerHTML =
      "<li class='list-group-item'>Vnesite veljavno število oseb.</li>";
  }
}

// Funkcija za inicializacijo privzetega prikaza sestavin za 2 osebi
document.addEventListener("DOMContentLoaded", () => {
  receptsestavine(); // Samodejno naloži sestavine za 2 osebi ob nalaganju strani
});

// Funkcija za posodobitev seznama sestavin v uporabniškem vmesniku s preračunom cene
function updateIngredientList(ingredients, peopleCount) {
  const sestavineList = document.getElementById("sestavine");
  sestavineList.innerHTML = ""; // Počisti obstoječe elemente na seznamu

  if (ingredients.length > 0) {
    let totalCost = 0; // Skupna cena (inicializiraj na 0)

    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "custom-list-item");

      // Preračunaj prilagojeno količino glede na število oseb
      const adjustedKolicina = ingredient.kolicina * peopleCount;

      // Izračunaj strošek za posamezno sestavino
      const ingredientCost = adjustedKolicina * ingredient.tkSestavina.cena;
      totalCost += ingredientCost; // Dodaj strošek trenutne sestavine k skupni ceni

      // Posodobi besedilo za posamezno sestavino
      li.textContent = `${ingredient.tkSestavina.ime}: ${adjustedKolicina} ${
        ingredient.enota
      } - Cena: ${ingredientCost.toFixed(2)} €`;
      sestavineList.appendChild(li); // Dodaj element na seznam
    });

    // Dodaj skupno ceno na konec seznama
    const totalLi = document.createElement("li");
    totalLi.classList.add("list-group-item", "font-weight-bold");
    totalLi.textContent = `Skupni strošek: ${totalCost.toFixed(2)} €`;
    sestavineList.appendChild(totalLi);
  } else {
    // Če ni sestavin, prikaži privzeto sporočilo
    sestavineList.innerHTML =
      "<li class='list-group-item'>Sestavine niso na voljo.</li>";
  }
}
