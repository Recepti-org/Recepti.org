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

document.addEventListener('DOMContentLoaded', () => {
    const nakupEmail = document.getElementById('placilo');

    nakupEmail.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/send-email/nakup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            console.log(result);
            createSuccessAlert(result);
        } catch (error) {
            console.error('Error:', error);
            createAlert('Napaka pri pošiljanju e-pošte');
        }
    });
});
