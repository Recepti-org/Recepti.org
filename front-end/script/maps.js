document.addEventListener('DOMContentLoaded', function () {
    // Function to handle address input and suggestions
    function handleAddressInput(map, marker, addressInputId, suggestionsListId) {
        const addressInput = document.getElementById(addressInputId);
        const suggestionsList = document.getElementById(suggestionsListId);
        const apiKey = 'ff520dfbc9e04406a4e876f5759561a8';

        addressInput.addEventListener('input', async function () {
            const query = addressInput.value;
            const countryCode = 'SI,HR,HU,AT,IT';
        
            if (query.length > 2) {
                try {
                    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&countrycode=${countryCode}&language=sl&limit=5`);
                    const data = await response.json();
        
                    suggestionsList.innerHTML = '';
        
                    data.results.forEach(result => {
                        const suggestionItem = document.createElement('li');
                        suggestionItem.textContent = result.formatted;
        
                        suggestionItem.addEventListener('click', function () {
                            addressInput.value = result.formatted;
        
                            const { lat, lng } = result.geometry;
                            map.setView([lat, lng], 13);
                            marker.setLatLng([lat, lng]);
                            marker.bindPopup(result.formatted).openPopup();
        
                            suggestionsList.innerHTML = '';
                        });
        
                        suggestionsList.appendChild(suggestionItem);
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                suggestionsList.innerHTML = '';
            }
        });
    }

    // Check for the map container corresponding to 'map' and initialize if found
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map').setView([46.5625, 15.6554], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const marker = L.marker([46.5625, 15.6554]).addTo(map).openPopup();
        handleAddressInput(map, marker, 'naslov', 'suggestions');
    }

    // Check for the map container corresponding to 'map2' and initialize if found
    const map2Container = document.getElementById('map2');
    if (map2Container) {
        const map2 = L.map('map2').setView([46.5625, 15.6554], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map2);
        const marker2 = L.marker([46.5625, 15.6554]).addTo(map2).openPopup();
        handleAddressInput(map2, marker2, 'naslov', 'suggestions2');
    }
});
