document.addEventListener('DOMContentLoaded', function() {
  fetch(`http://localhost:8080/recept`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then(najaciindex => {
      console.log("Data fetched successfully:", najaciindex);
      updateProductDisplay(najaciindex);
      setupSorting(najaciindex);  // Set up sorting once the data is fetched and displayed
    })
    .catch(error => {
      console.error('Error loading product data:', error);
      alert('Failed to load product details. Please check if the product ID is correct and the server is running.');
    });
});

function updateProductDisplay(products) {
  const container = document.getElementById('najaciindex');  // Get the container by ID
  container.innerHTML = '';  // Clear previous content
  
  products.forEach(product => {
    console.log(product);
    // Create HTML string for each product
    const html = `
      <div class="col-md-4 col-sm-12 mb-4" id="zunanjidivcard-res">
        <div class="card product-card" onclick="location.href='izdelek.html?id=${product.idrecepta}'" style="background-color: white; height: 520px;" id="card-produkti-res">
          <img src="../images/${product.slika}" class="card-img-top" alt="${product.slika}">
          <div class="card-body" style="overflow: hidden;" id="card-body-naindex-res">
            <h5 class="card-title">${product.ime}</h5>
            <p class="card-text pl-3 pr-3">
              <span class="info-icon mt-1" id="opis-div-index-res">
              <i class="fa-solid fa-info-circle mr-3 mb-3 ml-1"></i>${product.opis}
              </span>
              <div class="price" id="cenadiv-index-res">
                <i class="fa-solid fa-weight-hanging"></i>Težavnost: ${vzvezdice(product.tezavnost)}
              </div>
            </p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += html;  // Append the new HTML to the container
  });
}

function vzvezdice(x){
  const xe = parseInt(x);
  var text = "";
  for(var i = 0; i<3; i++){
      if(i < xe)
      text = text + ' <i class="fa-solid fa-star"></i>';
      else text = text + ' <i class="fa-regular fa-star"></i>';
  }
  return text;
}

function setupSorting(products) {
  $("#btnRecommended").click(function () {
    const sortedProducts = [...products].sort(() => Math.random() - 0.5);
    updateProductDisplay(sortedProducts);
  });

  $("#btnAlphabet").click(function () {
    const sortedProducts = [...products].sort((a, b) => a.ime.localeCompare(b.ime));
    updateProductDisplay(sortedProducts);
  });

  $("#btnPrice").click(function () {
    const sortedProducts = [...products].sort((a, b) => a.cena - b.cena);
    updateProductDisplay(sortedProducts);
  });
}
