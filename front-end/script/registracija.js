function createAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
    alertDiv.className = 'alert';
    window.scrollTo(0, 0);
}

document.getElementById('registracija').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('http://localhost:3000/registracija', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.location.href = '../html/prijava.html'; // Redirect to prijava.html after successful registration
      } else {
        const result = await response.json();
        createAlert(result.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });


  // Dolžina gesla
  document.getElementById('geslo').addEventListener('blur', function() {
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

/* Preverjanje če uporabniško ime/email že obstaja */
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('uporabniskoIme');
  const emailError = document.getElementById('email-error');
  const errorContainer = document.querySelector('.error-container');  // Using querySelector for more precision

  if (!emailInput || !emailError || !errorContainer) {
    console.error('Initialization error: Missing DOM elements');
    return; // Halt execution if elements are not found
  }

  emailInput.addEventListener('blur', async function() {
    const email = emailInput.value;
    console.log('Blur event triggered with email:', email);

    if (email && emailInput.checkValidity()) {
      console.log('Checking existence for:', email);
      const exists = await checkEmailExists(email);
      console.log('Existence check returned:', exists);

      if (exists) {
        emailError.innerHTML = `
          <svg viewBox="0 0 24 24" width="1em" height="1em" class="zds-icon RC794g X9n9TI DlJ4rT _5Yd-hZ lystZ1 FxZV-M SpRgR2 _3SrjVh" focusable="false" aria-hidden="true" data-testid="cross_icon" fill="red">
            <path d="M12-.005c-6.627 0-12 5.372-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.245 15.184a.75.75 0 0 1-1.061 1.061L12 13.056 8.816 16.24a.75.75 0 0 1-1.061-1.061l3.184-3.184L7.755 8.81a.75.75 0 1 1 1.061-1.06L12 10.933l3.184-3.184a.75.75 0 1 1 1.06 1.061l-3.183 3.185 3.184 3.184z"></path>
          </svg> Uporabniško ime že obstaja`;
        errorContainer.style.display = 'block';
        emailInput.classList.add('has-error');
        console.log('Displaying error message');
      } else {
        emailError.textContent = '';
        errorContainer.style.display = 'none';
        emailInput.classList.remove('has-error');
        console.log('Email available, no error displayed');
      }
    } else {
      console.log('Email is either invalid or empty');
    }
  });

  async function checkEmailExists(email) {
    try {
      const response = await fetch('http://localhost:3000/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      console.log('Server response status:', response.status);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
});


/* Prikaz zastav pri kodi države in dolžina telefonske številke */
$(document).ready(function () {
  function formatState(state) {
      if (!state.id) {
          return state.text;
      }
      var imageUrl = $(state.element).data('image');
      if (!imageUrl) {
          imageUrl = 'path_to_default_image.png'; // Fallback image if none specified
      }
      var $state = $('<span><img src="' + imageUrl + '" class="img-flag" /> ' + state.text + '</span>');
      return $state;
  }

  $('.select2').select2({
      templateResult: formatState,
      templateSelection: formatState,
      minimumResultsForSearch: Infinity  // Disables the search box
  });

  // Adjust the height of the select2 container
  function adjustSelect2Height() {
    if (window.innerWidth > 1268) {
      $('.select2-container--default .select2-selection--single').css('height', '38px');
      $('.select2-container--default .select2-selection--single .select2-selection__rendered').css('line-height', '38px');
      $('.select2-container--default .select2-selection--single .select2-selection__arrow').css('height', '38px');
    } else {
      $('.select2-container--default .select2-selection--single').css('height', '54px');
      $('.select2-container--default .select2-selection--single .select2-selection__rendered').css('line-height', '54px');
      $('.select2-container--default .select2-selection--single .select2-selection__arrow').css('height', '54px');
    }
  }

  adjustSelect2Height();

  // Adjust the height on window resize
  $(window).resize(function () {
    adjustSelect2Height();
  });

  // Handle the change event
  $('#countryCode').on('change', function() {
      const phoneInput = document.getElementById('telefonska');
      const selectedOption = this.options[this.selectedIndex];
      const countryCode = selectedOption.value;

      const placeholders = {
          "+386": "30-123-456",  // Placeholder for Slovenia
          "+385": "91-234-5678", // Placeholder for Croatia
          "+43": "664-123456",   // Placeholder for Austria
          "+39": "320-123456",   // Placeholder for Italy
          "+36": "20-123-4567"   // Placeholder for Hungary
      };

      const exactLength = selectedOption.getAttribute('data-maxlength');

      if (exactLength) {
          phoneInput.setAttribute('maxlength', exactLength);
          phoneInput.setAttribute('minlength', exactLength);
          phoneInput.setAttribute('pattern', '\\d{' + exactLength + '}');
          phoneInput.placeholder = placeholders[countryCode] || "Vnesite telefonsko številko";
      } else {
          phoneInput.removeAttribute('maxlength');
          phoneInput.removeAttribute('minlength');
          phoneInput.removeAttribute('pattern');
          phoneInput.placeholder = "Enter phone number";
      }
  });

  // Trigger change event on page load to set initial state
  $('#countryCode').trigger('change');
});