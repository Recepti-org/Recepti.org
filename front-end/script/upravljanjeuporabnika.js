
//const userId = 1; // Replace with actual user ID --> ta informacija je v splosnem scriptu script.js 

async function fetchUserData() {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();

    document.getElementById('pozdravljeni').textContent = "Pozdravljeni, " + data.Ime + " " + data.Priimek;

    document.getElementById('ime').value = data.Ime;
    document.getElementById('priimek').value = data.Priimek;
    if (data.Naslov == null) {
      document.getElementById('naslov').value = data.Naslov_kmetije;
    } else {
      document.getElementById('naslov').value = data.Naslov;
    }
    document.getElementById('datum_rojstva').value = formatDate(data.Datum_rojstva);
    document.getElementById('uporabnisko_ime').value = data.Uporabnisko_ime;

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

async function updatePassword() {
  const currentPassword = document.getElementById('trenutno_geslo').value;
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

  try {
    // Verify current password
    const passwordCheckResponse = await fetch(`http://localhost:3000/check-password-from-userId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    const passwordCheckData = await passwordCheckResponse.json();

    if (!passwordCheckData.success || currentPassword !== passwordCheckData.currentPassword) {
      createAlert('Trenutno geslo ni pravilno.');
      return;
    }

    // Update to the new password
    const response = await fetch(`http://localhost:3000/user/${userId}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });

    const message = await response.text();

    createSuccessAlert(message);

  } catch (error) {
    console.error('Error updating password:', error);
  }
}

$(document).ready(async function () {
  await fetchUserData();
});

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('sl-SI', { year: 'numeric', month: 'long', day: 'numeric' });
}

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
