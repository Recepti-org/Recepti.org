let najaciindex = []; // Global array to hold recipes
let currentRecipe = null; // Store the currently selected recipe for editing
trenutniUporabnikId = 1; // ID of the current user

// Function to create HTML for a recipe card
function createRecipeCard(product) {
  return `
        <div class="col-md-4 col-sm-12 mb-4" id="zunanjidivcard-res">
            <div class="card product-card" style="background-color: white; height: 520px;" id="card-produkti-res">
                <img src="../images/${product.slika}" class="card-img-top" alt="${product.ime}">
                <div class="card-body" style="overflow: hidden;" id="card-body-naindex-res">
                    <h5 class="card-title">${product.ime}</h5>
                    <br>
                    <button class="btn btn-success" onclick="showRecipeDetails(${product.idrecepta})">Spremeni recept</button>
                    <button class="btn btn-danger" onclick="removeRecipe(${product.idrecepta})">Odstrani recept</button>
                </div>
            </div>
        </div>
    `;
}

function vzvezdice(x) {
  const xe = parseInt(x); // Convert to an integer
  if (isNaN(xe) || xe < 0) return ""; // Handle invalid or negative values
  let text = "";
  for (let i = 0; i < 3; i++) {
    if (i < xe) {
      text += ' <i class="fa-solid fa-star"></i>';
    } else {
      text += ' <i class="fa-regular fa-star"></i>';
    }
  }
  return text;
}

function createBigRecipeCard(recept) {
  //console.log("Težavnost:", recept.tezavnost); // Log raw value
  //console.log("Zvezdice:", vzvezdice(recept.tezavnost)); // Log the generated stars
  return `
        <div class="col-md-6 col-sm-12 mb-4" id="zunanjidivcard-res">
          <div class="card product-card" onclick="location.href='izdelek.html?id=${
            recept.idrecepta
          }'" style="background-color: white; height: 520px;" id="card-produkti-res">
            <img src="../images/${recept.slika}" class="card-img-top" alt="${
    recept.slika
  }">
            <div class="card-body" style="overflow: hidden;" id="card-body-naindex-res">
              <h5 class="card-title">${recept.ime}</h5>
              <p class="card-text pl-3 pr-3">
                <span class="info-icon mt-1" id="opis-div-index-res">
                  <i class="fa-solid fa-info-circle mr-3 mb-3 ml-1"></i>${
                    recept.opis
                  }
                </span>
                <div class="price" id="cenadiv-index-res">
                  <i class="fa-solid fa-weight-hanging"></i>Težavnost: ${vzvezdice(
                    recept.tezavnost
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      `;
}

// Function to display all recipes
function displayRecipes() {
  const container = document.getElementById("recipe-container");
  container.innerHTML = ""; // Clear existing content

  // Fetch recipes from the API
  // primer dostopa do swaggerja za nek endpoint http://localhost:8080/swagger-ui/index.html#/recept-controller/getAllRecepti
  fetch(`http://localhost:8080/uporabniki/${trenutniUporabnikId}/recepti`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      console.log(data);
      najaciindex = data; // Store the fetched data in the global array
      najaciindex.forEach((product) => {
        container.innerHTML += createRecipeCard(product); // Append each recipe card
      });

      najpogostejsasestavina(data);
    })
    .catch((error) => {
      console.error("Error loading product data:", error);
      alert(
        "Failed to load product details. Please check if the product ID is correct and the server is running."
      );
    });
}

// Function to show details of a selected recipe in the modal
function showRecipeDetails(idrecepta) {
  // Find the selected recipe by idrecepta
  currentRecipe = najaciindex.find(
    (product) => product.idrecepta === idrecepta
  );

  if (currentRecipe) {
    // Load current recipe properties into the modal
    document.getElementById("recipeName").value = currentRecipe.ime;
    document.getElementById("recipeDescription").value = currentRecipe.opis;
    document.getElementById("recipeDifficulty").value = currentRecipe.tezavnost;
    document.getElementById("time").value = currentRecipe.caspriprave;
    // Now we have set the current recipe for updating
    recipeToUpdate = currentRecipe; // Set the global variable to the current recipe

    $("#recipeModal").modal("show"); // Show the modal
  } else {
    console.error(`Recipe with id ${idrecepta} not found.`);
  }
}
let recipeToUpdate = null; // Global variable to hold the recipe being updated

// Function to save changes to the recipe (using idrecepta as parameter)
function saveRecipeChanges() {
  console.log(recipeToUpdate);
  if (recipeToUpdate) {
    // Update recipeToUpdate object with new values from the modal form
    recipeToUpdate.ime = document.getElementById("recipeName").value;
    recipeToUpdate.opis = document.getElementById("recipeDescription").value;
    recipeToUpdate.tezavnost =
      document.getElementById("recipeDifficulty").value;
    recipeToUpdate.caspriprave = document.getElementById("time").value;
    // Now save changes via an API call or update in the array
    // Example: PUT request to update the recipe in the backend
    fetch(`http://localhost:8080/recept/spremeni`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToUpdate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating recipe");
        }
        return response.json();
      })
      .then((updatedRecipe) => {
        console.log("Recipe updated successfully:", updatedRecipe);
        // Refresh the recipe list after successful update
        displayRecipes();
        alert("Recept je bil uspešno posodobljen");
        $("#recipeModal").modal("hide");
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  } else {
    console.error("No recipe selected to update.");
  }
}

// Function to remove a recipe by its ID
function removeRecipe(idrecepta) {
  const url = `http://localhost:8080/recept/odstrani/${idrecepta}`;

  // Call the DELETE API
  fetch(url, {
    method: "DELETE", // Use DELETE method
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Recipe with ID ${idrecepta} deleted successfully.`);
        displayRecipes(); // Refresh the list after successful deletion
      } else {
        console.error(`Failed to delete recipe with ID ${idrecepta}.`);
        return response.text(); // Get error message as text
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Call displayRecipes on page load
document.addEventListener("DOMContentLoaded", displayRecipes);

function najpogostejsasestavina(recepti) {
  const stevilostestavine = {}; // Object to store sestavina counts

  // Use Promise.all to wait for all fetch calls to complete
  const fetchPromises = recepti.map((recept) => {
    let id = recept.idrecepta;

    return fetch(`http://localhost:8080/api/recept/${id}/filtered`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        //recept.sestavine = data; // Attach sestavine to the recipe
        data.forEach((sestavina) => {
          const ime = sestavina.tkSestavina.ime;
          if (stevilostestavine[ime]) {
            stevilostestavine[ime] += 1;
          } else {
            stevilostestavine[ime] = 1;
          }
        });
      })
      .catch((error) => {
        console.error("Error loading sestavina data:", error);
      });
  });

  Promise.all(fetchPromises).then(() => {
    let mostUsedsestavina = null;
    let najveckrat = 0;

    for (const [sestavina, stevilo] of Object.entries(stevilostestavine)) {
      if (stevilo > najveckrat) {
        mostUsedsestavina = sestavina;
        najveckrat = stevilo;
      }
    }

    // Display all sestavinas and their counts
    /*const sestavinaList = Object.entries(stevilostestavine)
            .map(([sestavina, stevilo]) => {
                const style = sestavina === mostUsedsestavina ? 'style="text-decoration: underline; font-weight: bold;"' : '';
                return `<li ${style}>${sestavina}: ${stevilo} krat</li>`;
            })
            .join('');

        document.getElementById("sestavina").innerHTML = `<ul style=" list-style: none;">${sestavinaList}</ul>`;*/

    // Sort and display all sestavinas and their counts
    const sestavinaList = Object.entries(stevilostestavine)
      .sort(([, countA], [, countB]) => countB - countA) // Sort by count in descending order
      .map(([sestavina, stevilo]) => {
        const style =
          sestavina === mostUsedsestavina
            ? 'style="text-decoration: underline; font-weight: bold;"'
            : "";
        return `<li ${style}>${sestavina}: ${stevilo} krat</li>`;
      })
      .join("");

    document.getElementById(
      "sestavina"
    ).innerHTML = `<ul style="list-style: none;">${sestavinaList}</ul>`;

    console.log(mostUsedsestavina)
    // Call the function to recommend recipes based on the most used ingredient
    priporoceniReceptiPoSestavini(mostUsedsestavina);
  });
}

function priporoceniReceptiPoSestavini(iskanaSestavina) {
  // Fetch all recipes from the API
  fetch("http://localhost:8080/recept/recepti")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((recepti) => {
      // Fetch sestavine for each recipe
      const fetchPromises = recepti.map((recept) => {
        let id = recept.idrecepta;

        return fetch(
          `http://localhost:8080/api/recept/${id}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok: " + response.statusText
              );
            }
            return response.json(); // Parse JSON data from the response
          })
          .then((data) => {
            // Add sestavine to the recipe object
            recept.sestavine = data; // Attach sestavine to the recipe
          })
          .catch((error) => {
            console.error("Error loading sestavina data:", error);
          });
      });

      return Promise.all(fetchPromises).then(() => recepti);
    })
    .then((recepti) => {
      // Filter recipes that contain the desired sestavina
      /*const priporoceniRecepti = recepti.filter((recept) =>
        recept.sestavine.some(
          (sestavina) =>
            sestavina.tkSestavina.ime === iskanaSestavina &&
            recept.TK_Uporabnik !== trenutniUporabnikId,
          console.log(recept.TK_Uporabnik, trenutniUporabnikId)
        )
      );*/

      // Filter recipes that contain the desired sestavina and are not owned by the current user
      const priporoceniRecepti = recepti.filter((recept) =>
        recept.sestavine.some(
          (sestavina) =>
            sestavina.tkSestavina.ime === iskanaSestavina &&
            recept.uporabnik.idUporabnika !== trenutniUporabnikId
        )
      );

      // Display recommended recipes
      /*const priporoceniList = priporoceniRecepti
        .map(
          (recept) =>
            `<li><a href="html/izdelek.html?id=${recept.idrecepta}">${recept.ime}</a></li>`
        )
        .join("");

      document.getElementById("priporoceni-recepti-list").innerHTML =
        priporoceniList || "<li>Ni priporočil na voljo</li>";
    })
    .catch((error) => {
      console.error("Error loading recipes data:", error);
    });*/

      // Generate recipe cards instead of list items
      const priporoceniCards = priporoceniRecepti
        .map((recept) => createBigRecipeCard(recept))
        .join("");

      // Insert recipe cards into the container
      document.getElementById("priporoceni-recepti-list").innerHTML =
        priporoceniCards || "<p>Ni priporočil na voljo</p>";
    })
    .catch((error) => {
      console.error("Error loading recipes data:", error);
    });
}
