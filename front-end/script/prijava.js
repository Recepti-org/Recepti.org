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

document.getElementById('prijava').addEventListener('submit', async function (event) {
  event.preventDefault();
  const uporabniskoIme = document.getElementById('uporabniskoIme').value;
  const geslo = document.getElementById('geslo').value;

  console.log('Sending data:', { uporabniskoIme, geslo });

  const response = await fetch('http://localhost:3000/prijava', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uporabniskoIme, geslo })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Data: ', data);
    if (data.id > 0 && data.id !== undefined) {
      console.log('Logged in successfully:', data);
      sessionStorage.setItem('userID', data.id);
      sessionStorage.setItem('proizvajalec', data.proizvajalec);
      if (data.proizvajalec === 1) {
        window.location.href = 'kmetdodaj.html';
      } else {
        window.location.href = 'izdelki.html';
      }
    } else {
      createAlert('ID not found in the database.');
    }
  } else if (response.status === 400) {
    const errorData = await response.json();
    createAlert(errorData.message);
  } else {
    createAlert('An error occurred. Please try again later.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('userID')) {
    addLogoutButton(); // Dodaj gumb za odjavo samo, če je uporabnik prijavljen
  }

  // Dolžina gesla
  document.getElementById('novo_geslo').addEventListener('blur', function () {
    const input = this;
    const errorText = document.getElementById('password-error');
    const errorContainer = input.nextElementSibling;

    if (input.value.length < 8) {
      errorText.textContent = 'Geslo mora vsebovati najmanj 8 znakov';
      errorContainer.style.display = 'block';
      input.classList.add('has-error');
    } else {
      errorText.textContent = '';
      errorContainer.style.display = 'none';
      input.classList.remove('has-error');
    }
  });
});

function addSVG(logoutDiv) {
  const logoutDivs = document.getElementsByClassName('odjava');
  console.log('Found logoutDivs:', logoutDivs);

  if (!logoutDiv.querySelector('a')) {

    Array.from(logoutDivs).forEach(logoutDiv => {
      const vl = document.createElement('div');
      vl.className = 'vl';
      console.log('Created vertical line:', vl);

      const logoutLink = document.createElement('a');
      logoutLink.innerHTML = `
        <svg fill="#000000" width="25px" height="25px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <title>Odjava</title>
          <path d="M7,6H23v9.8h2V6a2,2,0,0,0-2-2H7A2,2,0,0,0,5,6V30a2,2,0,0,0,2,2H23a2,2,0,0,0,2-2H7Z"></path>
          <path d="M28.16,17.28a1,1,0,0,0-1.41,1.41L30.13,22H15.63a1,1,0,0,0-1,1,1,1,0,0,0,1,1h14.5l-3.38,3.46a1,1,0,1,0,1.41,1.41L34,23.07Z"></path>
          <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
        </svg>
      `;
      console.log('Created logout link:', logoutLink);

      logoutLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default action
        logoutDiv.remove(); // Remove the logout div when clicked
        console.log('Logout button removed.');
      });

      logoutDiv.appendChild(vl);
      logoutDiv.appendChild(logoutLink);
      console.log('Appended vl and logoutLink to logoutDiv:', logoutDiv);
    });
  }
}

function removeSVG() {
  const id = sessionStorage.getItem('userID');
  var divs = document.getElementsByClassName('odjava');

  if (!id && logoutDiv) {
    Array.from(divs).forEach(function (div) {
      div.innerHTML = '';  // Clears the inner HTML, removing the SVG
    });
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('proizvajalec');
  }
}

/* Doda gumb za odjavo */
function addLogoutButton() {
  const logoutDivs = document.getElementsByClassName('odjava');
  Array.from(logoutDivs).forEach(logoutDiv => {
    addSVG(logoutDiv);
  });
}

// Check sessionStorage on page load
let storedId = sessionStorage.getItem('userID');
if (storedId !== null && !isNaN(Number(storedId))) {
  addSVG();
} else {
  removeSVG();
}

// Add event listeners to all anchor elements
var anchorElements = document.getElementsByTagName('a');
Array.from(anchorElements).forEach(function (anchor) {
  anchor.addEventListener('click', function () {
    removeSVG();
    console.log('SVG removed by clicking an anchor element.');
  });
});


/* Ste pozabili geslo */
async function updateForgotPassword() {
  const uporabniskoIme = document.getElementById('uporabniskoIme2').value;
  const newPassword = document.getElementById('novo_geslo').value;
  const confirmNewPassword = document.getElementById('ponovno_novo_geslo').value;

  if (newPassword !== confirmNewPassword) {
    createAlert('Ponovitev novega gesla se ne ujema.');
    return;
  }
  if (newPassword.length < 8) {
    createAlert('Geslo mora vsebovati najmanj 8 znakov.');
    return;
  }
  //check if email exists
  try {
    const response = await fetch('http://localhost:3000/api/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: uporabniskoIme })
    });
    console.log('Server response status:', response.status);
    const data = await response.json();

    if (!data.exists) {
      createAlert('Uporabniško ime ne obstaja.');
      return;
    }

    const currentPasswordResponse = await fetch('http://localhost:3000/api/get-current-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uporabniskoIme2: uporabniskoIme })
    });
    const currentPasswordData = await currentPasswordResponse.json();

    if (!currentPasswordData.success) {
      createAlert('Napaka pri pridobivanju trenutnega gesla.');
      return;
    }

    const currentPassword = currentPasswordData.currentPassword;

    // Check if new password is the same as the current password
    if (newPassword === currentPassword) {
      createAlert('Novo geslo ne sme biti enako trenutnemu geslu.');
      return;
    }

    const updatePasswordResponse = await fetch('http://localhost:3000/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: uporabniskoIme, newPassword: newPassword })
    });
    const updateData = await updatePasswordResponse.json();

    if (updateData.success) {
      createSuccessAlert('Geslo uspešno spremenjeno.');
    } else {
      createAlert('Napaka pri spreminjanju gesla.');
    }

  } catch (error) {
    console.error('Error when changing password:', error);
    return false;
  }
}