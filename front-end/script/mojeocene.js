let najaciindex = []; // Global array to hold recipes
let currentRecipe = null; // Store the currently selected recipe for editing

// Function to create HTML for a recipe card
function createOcenaCard(ocena) {
    console.log(ocena)
    return `
        <div class="col-md-4 col-sm-12 mb-4" id="zunanjidivcard-res">
            <div class="card ocena-card" style="background-color: white; height: auto;" id="card-ocene-res">
                <div class="card-body" style="overflow: hidden;" id="card-body-ocene-res">
                    <h5 class="card-title" id="ocena">Ocena: ${ocena.stZvezdic} ★</h5>
                    <p id="mnenje"><strong>Mnenje:</strong> ${ocena.mnenje}</p>
                    ${ocena.vprasanje ? `<p><strong>Vprašanje:</strong> <span id="vprasanje">${ocena.vprasanje}</span></p>` : ''}
                    <hr>
                    <p><strong>Recept:</strong> ${ocena.tkrecepta.ime}</p>
                    <button class="btn btn-success" onclick="showRecipeDetails(${ocena.idOcena})">Spremeni recept</button>
                </div>
            </div>
        </div>
    `;
}

function saveRecipeChanges() {

    console.log(recipeToUpdate)
    if (recipeToUpdate) {
        // Update recipeToUpdate object with new values from the modal form
        recipeToUpdate.ocena = document.getElementById('ocena').value;
        recipeToUpdate.mnenje = document.getElementById('mnenje').value;
        recipeToUpdate.vprasanje = document.getElementById('vprasanje').value;
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

// Function to display all recipes
function displayRecipes() {
    const container = document.getElementById('recipe-container');
    container.innerHTML = ''; // Clear existing content

    // Fetch recipes from the API
    fetch(`http://localhost:8080/api/ocena/uporabnik/${1}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse JSON data from the response
        })
        .then(data => {
            najaciindex = data; // Store the fetched data in the global array
            najaciindex.forEach(product => {
                console.log(product)
                container.innerHTML += createOcenaCard(product); // Append each recipe card
            });
        })
        .catch(error => {
            console.error('Error loading product data:', error);
            alert('Failed to load product details. Please check if the product ID is correct and the server is running.');
        });
}

function showRecipeDetails(idrecepta) {
    // Find the selected recipe by idrecepta
    currentRecipe = najaciindex.find(ocena => ocena.idOcena === idrecepta);
    
    if (currentRecipe) {
        console.log(currentRecipe.mnenje)
        
        // Populate the modal with the current recipe data
        document.getElementById('Ocena').value = currentRecipe.stZvezdic || '';
        document.getElementById('Mnenje').value = currentRecipe.mnenje || '';
        document.getElementById('Vprašanje').value = currentRecipe.vprasanje || '';
        // Set the global variable to the current recipe for later saving changes
        recipeToUpdate = currentRecipe;

        // Open the modal
        $('#recipeModal').modal('show');
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
        recipeToUpdate.stZvezdic = document.getElementById('Ocena').value;  // Update 'Ocena'
        recipeToUpdate.mnenje = document.getElementById('Mnenje').value;    // Update 'Mnenje'
        recipeToUpdate.vprasanje = document.getElementById('Vprašanje').value; // Update 'Vprašanje'

        // Now save changes via an API call or update in the array
        // Example: PUT request to update the recipe in the backend
        fetch(`http://localhost:8080/api/ocena/spremeni`, {
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
            displayRecipes(); // Re-render the list of recipes
            alert("Recept je bil uspešno posodobljen");
            $('#recipeModal').modal('hide'); // Close the modal
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
