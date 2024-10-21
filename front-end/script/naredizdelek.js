document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form
    var ime = document.getElementById('ime').value;
    var opis = document.getElementById('opis').value;
    var tezavnost = parseInt(document.getElementById('tezavnost').value);
    var caspriprave = parseInt(document.getElementById('caspriprave').value);
    
    // Handle file input
    var slika = document.getElementById('slika').files[0];
    var slikaName = slika ? slika.name : ""; // Handle if no file is selected

    // Assuming you have a way to get the user ID
    var userId = 1; // This should be fetched dynamically as needed

    // Get steps from the dynamic steps container (if applicable)
    var steps = Array.from(document.querySelectorAll('.step-input')).map(stepInput => stepInput.value);

    // Create the recept object with the required structure
    const recept = {
        idrecepta: 0, // Assuming you're creating a new recipe, this should be 0
        ime: ime, // Name
        opis: opis, // Description
        caspriprave: caspriprave, // Preparation time
        tezavnost: tezavnost, // Difficulty
        slika: slikaName, // Image file name
        uporabnik: {
            idUporabnika: userId, // User ID
            ime: "Marko", // Replace with actual user name as needed
            priimek: "Novak" // Replace with actual user surname as needed
        }
    };

    console.log(recept); // Log the recept object for debugging

    // Send the data to the backend
    fetch('http://localhost:8080/recept/dodajrecept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sending as JSON
        },
        body: JSON.stringify(recept) // Convert the object to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Parse JSON data from the response
    })
    .then(data => {
        console.log('Recept created:', data);
        // Optionally redirect or update the UI
        alert("Recept dodan uspešno!");
    })
    .catch(error => console.error('Error creating recept:', error));
});


// Function to add a new step input
function addStep() {
    const stepsContainer = document.getElementById('stepsContainer');
    const stepInput = document.createElement('input');
    stepInput.type = 'text';
    stepInput.className = 'form-control mt-2 step-input'; // Add class for easy selection
    stepInput.placeholder = 'Vnesi korak';
    stepsContainer.appendChild(stepInput);
}

// Function to remove the last step input
function removeStep() {
    const stepsContainer = document.getElementById('stepsContainer');
    const stepInputs = stepsContainer.getElementsByClassName('step-input');
    if (stepInputs.length > 0) {
        stepsContainer.removeChild(stepInputs[stepInputs.length - 1]);
    }
}
