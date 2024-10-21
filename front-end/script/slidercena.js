document.addEventListener('DOMContentLoaded', function() {
    const rangeSlider = document.getElementById('customRange3');
    const totalPriceDisplay = document.getElementById('cena');
    console.log(document.getElementById('pricePerKg').innerText);
    const basePrice = parseFloat(document.getElementById('pricePerKg').innerText);
    // Update the total price based on the range slider's value
    function updatePrice() {
        const quantity = parseFloat(rangeSlider.value);
        const totalPrice = parseFloat(basePrice * quantity);
        totalPriceDisplay.innerText = ` Skupna cena: ${totalPrice}€ (${quantity} kg)`;
    }

    // Initialize with default value
    updatePrice();

    rangeSlider.addEventListener('input', updatePrice);
});

document.addEventListener('DOMContentLoaded', function() {
    const rangeSlider = document.getElementById('customRange3');
    function updateTrack() {
        const value = ((rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min)) * 100;
        rangeSlider.style.setProperty('--value', `${value}%`);
    }
    rangeSlider.addEventListener('input', updateTrack);
    updateTrack(); 
});