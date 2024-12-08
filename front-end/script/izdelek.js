document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`http://localhost:8080/recept/${productId}`)
        .then(response => response.json())
        .then(product => {
            console.log(product);
            document.getElementById('ime').textContent = `${product.ime}`;
            document.getElementById('cas').textContent = `${product.caspriprave} min`;
            document.getElementById('opis').textContent = `${product.opis}`;

            const myDiv = document.getElementById('slika');
            const newElement = document.createElement('img');
            newElement.src = '../images/' + product.slika;
            newElement.classList = 'd-block w-100';
            myDiv.appendChild(newElement);

            const zvede = document.getElementById('tezavnost');
            if (product.tezavnost !== undefined && product.tezavnost !== null) {
                const starsDiv = vzvezdice(product.tezavnost);
                if (starsDiv instanceof Node) {
                    zvede.appendChild(starsDiv);
                }
            } else {
                console.error('Invalid tezavnost value:', product.tezavnost);
            }

            var idrecepta = product.idrecepta;
            fetch(`http://localhost:8080/koraki/${idrecepta}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(koraki => {
                    console.log(koraki);
                    const korakiList = document.getElementById('koraki');
                    korakiList.innerHTML = '';
                    koraki.forEach((item, index) => {
                        const listItem = document.createElement('li');
                        listItem.className = 'list-group-item';
                        listItem.textContent = `${index + 1}. ${item.opis}`;
                        korakiList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        });

    document.getElementById("gumb").addEventListener('click', function () {
        $('#recipeModal').modal('show');
    });

    // Function to render the star rating
    function vzvezdice(x) {
        const xe = parseInt(x);
        const div = document.createElement('div');
        div.classList.add('star-rating');

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            if (i < xe) {
                star.classList.add('selected');
            }
            star.textContent = '★';
            div.appendChild(star);
        }

        return div;
    }

    // Handle star click for rating
    document.getElementById("starRating").addEventListener('click', function (event) {
        const stars = Array.from(event.currentTarget.children);
        const rating = stars.indexOf(event.target) + 1;

        // Set the value of the hidden input for the rating
        document.getElementById('ocenaSkladnosti').value = rating;

        // Update the visual rating
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    });


    document.getElementById("shrani").addEventListener('click', function (event) {
        $('#recipeModal').modal('hide');
        $('#questionModal').modal('show');
    });


    // Initialize the star rating
    const starRatingDiv = document.getElementById('starRating');
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        starRatingDiv.appendChild(star);
    }
});





function receptsestavine(){
    console.log(document.getElementById("peopleCount").value);
}
