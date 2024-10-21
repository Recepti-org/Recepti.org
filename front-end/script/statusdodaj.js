function createAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    if (alertDiv) {
        alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
        alertDiv.className = 'alert';
        window.scrollTo(0, 0);
    }
}
function createSuccessAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    if (alertDiv) {
        alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
        alertDiv.className = 'successAlert';
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const uporabnikId = sessionStorage.getItem('userID');

    console.log(uporabnikId);

    fetch(`http://localhost:3000/izdelek/od/${uporabnikId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const select = document.getElementById('pridelek');
            select.innerHTML = data.map(izdelek => `<option value="${izdelek.idIzdelki}">${izdelek.Naziv}</option>`).join('');
        })
        .catch(error => console.error('Error:', error));


});

function status() {
    const uporabnikId = sessionStorage.getItem('userID');
    const naziv = document.getElementById("status").value;
    const pridelek = document.getElementById("pridelek").value;
    const datum = document.getElementById("statusDate").value;
    var slika = document.getElementById("slika").value;
    slika = slika.split('\\').pop();

    fetch(`http://localhost:3000/izdelek/stanje-naredi/${pridelek}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uporabnikId: uporabnikId,
            naziv: naziv,
            datum: datum,
            slika: slika,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            createSuccessAlert('Status uspešno dodan');
            if (naziv === 'Pošiljanje') {
                sendEmail();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            createAlert('Napaka pri dodajanju statusa');
        });
}


pridelek.addEventListener('change', function () {
    const pridelek = document.getElementById("pridelek").value;
    var l = 0;
    fetch(`http://localhost:3000/izdelki/stanje/${pridelek}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const select = document.getElementById('status');
            select.innerHTML = data.map(izdelek => `<option value="${izdelek.Naziv}">${l++}. ${izdelek.Naziv}</option>`).join('');
            l++;
        })
        .catch(error => console.error('Error:', error));


});

function sendEmail() {
    fetch(`http://localhost:3000/send-email/statusPosiljanje`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};