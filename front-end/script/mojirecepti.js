let najaciindex = []; // Global array to hold recipes
let currentRecipe = null; // Store the currently selected recipe for editing

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

// Function to display all recipes
function displayRecipes() {
    const container = document.getElementById('recipe-container');
    container.innerHTML = ''; // Clear existing content

    // Fetch recipes from the API
    fetch(`http://localhost:8080/uporabniki/1/recepti`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse JSON data from the response
        })
        .then(data => {
            najaciindex = data; // Store the fetched data in the global array
            najaciindex.forEach(product => {
                container.innerHTML += createRecipeCard(product); // Append each recipe card
            });
        })
        .catch(error => {
            console.error('Error loading product data:', error);
            alert('Failed to load product details. Please check if the product ID is correct and the server is running.');
        });
}

// Function to show details of a selected recipe in the modal
function showRecipeDetails(idrecepta) {
    // Find the selected recipe by idrecepta
    currentRecipe = najaciindex.find(product => product.idrecepta === idrecepta);
    
    if (currentRecipe) {
        // Load current recipe properties into the modal
        document.getElementById('recipeName').value = currentRecipe.ime;
        document.getElementById('recipeDescription').value = currentRecipe.opis;
        document.getElementById('recipeDifficulty').value = currentRecipe.tezavnost;
        document.getElementById('time').value = currentRecipe.caspriprave;
        // Now we have set the current recipe for updating
        recipeToUpdate = currentRecipe; // Set the global variable to the current recipe
        
        $('#recipeModal').modal('show'); // Show the modal
    } else {
        console.error(`Recipe with id ${idrecepta} not found.`);
    }
}
let recipeToUpdate = null; // Global variable to hold the recipe being updated

// Function to save changes to the recipe (using idrecepta as parameter)
function saveRecipeChanges() {

    console.log(recipeToUpdate)
    if (recipeToUpdate) {
        // Update recipeToUpdate object with new values from the modal form
        recipeToUpdate.ime = document.getElementById('recipeName').value;
        recipeToUpdate.opis = document.getElementById('recipeDescription').value;
        recipeToUpdate.tezavnost = document.getElementById('recipeDifficulty').value;
        recipeToUpdate.caspriprave = document.getElementById('time').value;
        // Now save changes via an API call or update in the array
        // Example: PUT request to update the recipe in the backend
        fetch(`http://localhost:8080/recept/spremeni`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeToUpdate),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error updating recipe');
            }
            return response.json();
        })
        .then(updatedRecipe => {
            
            console.log('Recipe updated successfully:', updatedRecipe);
            // Refresh the recipe list after successful update
            displayRecipes();
            alert("Recept je bil uspešno posodobljen")
            $('#recipeModal').modal('hide');
        })
        .catch(error => {
            console.error('Error saving changes:', error);
        });
    } else {
        console.error('No recipe selected to update.');
    }
}

// Function to remove a recipe by its ID
function removeRecipe(idrecepta) {
    const url = `http://localhost:8080/recept/odstrani/${idrecepta}`;


    // Call the DELETE API
    fetch(url, {
        method: 'DELETE', // Use DELETE method
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log(`Recipe with ID ${idrecepta} deleted successfully.`);
            displayRecipes(); // Refresh the list after successful deletion
        } else {
            console.error(`Failed to delete recipe with ID ${idrecepta}.`);
            return response.text(); // Get error message as text
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call displayRecipes on page load
document.addEventListener('DOMContentLoaded', displayRecipes);
