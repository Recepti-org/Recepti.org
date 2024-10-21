document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

            fetch(`http://localhost:8080/recept/${productId}`)  // Removed the colon and corrected the endpoint
                .then(response => response.json())
                .then(product => {

                    console.log(product)


                    document.getElementById('ime').textContent = `${product.ime}`;


                    document.getElementById('cas').textContent = `${product.caspriprave} min`;
                    document.getElementById('opis').textContent = `${product.opis}`;
                    
                    const myDiv = document.getElementById('slika');

                    // Create a new element, like a paragraph
                    const newElement = document.createElement('img');
                    newElement.src = '../images/' + product.slika;
                    newElement.classList = 'd-block w-100';

                    // Append the new element to the div
                    myDiv.appendChild(newElement);

                    const zvede = document.getElementById('tezavnost');
        
                    // Check if product.tezavnost is valid before appending
                    if (product.tezavnost !== undefined && product.tezavnost !== null) {
                        const starsDiv = vzvezdice(product.tezavnost);
                        if (starsDiv instanceof Node) { // Ensure it's a valid Node
                            zvede.appendChild(starsDiv);
                        } else {
                            console.error('vzvezdice did not return a valid Node');
                        }
                    } else {
                        console.error('Invalid tezavnost value:', product.tezavnost);
                    }


                    var idrecepta = product.idrecepta
                    fetch(`http://localhost:8080/koraki/${idrecepta}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(koraki => {
                        console.log(koraki); // Logging the fetched data for debugging
            
                        const korakiList = document.getElementById('koraki');
            
                        // Clear existing list items if necessary
                        korakiList.innerHTML = '';
            
                        // Assuming koraki is an array
                        koraki.forEach((item, index) => {
                            console.log(item)
                            const listItem = document.createElement('li');
                            listItem.className = 'list-group-item'; // Add the same class for styling
                            listItem.textContent = `${index + 1}. ${item.opis}`; // Assuming item is a string
            
                            // Append the list item to the UL element
                            korakiList.appendChild(listItem);
                        });
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                    });

                })
            })
            function vzvezdice(x) {
                const xe = parseInt(x);
                const div = document.createElement('div'); // Create a div for stars
    
                for (let i = 0; i < 3; i++) {
                    // Create an <i> element for each star
                    const star = document.createElement('i');
    
                    if (i < xe) {
                        star.className = 'fa-solid fa-star'; // Solid star
                    } else {
                        star.className = 'fa-regular fa-star'; // Regular star
                    }
    
                    // Append each star to the div
                    div.appendChild(star);
                }
    
                return div; // Return the div containing the stars
            }