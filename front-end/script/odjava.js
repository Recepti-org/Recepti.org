document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('userID')) {
    addLogoutButton();
    addShopIcon();
  }
  setupLoginAccess();
  setupDropdownLogout();
});

function addShopIcon() {
  const shopDiv = document.getElementById('shopIcon');
  if (shopDiv) {
    shopDiv.innerHTML = `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 112.13" style="width:25px; height:25px"><title>retail-store</title><path d="M69.19,87.22A1.75,1.75,0,1,1,67.44,89a1.75,1.75,0,0,1,1.75-1.75Zm45.37-34.58v53a6.52,6.52,0,0,1-6.51,6.51H14.83a6.5,6.5,0,0,1-4.6-1.92h0a6.49,6.49,0,0,1-1.91-4.6V52.7a23.89,23.89,0,0,0,5.37.35v52.57a1.13,1.13,0,0,0,.34.8h0a1.12,1.12,0,0,0,.8.32h45V66.38a9.76,9.76,0,0,1,9.74-9.73H85.64a9.76,9.76,0,0,1,9.73,9.73v40.37h12.68a1.13,1.13,0,0,0,1.13-1.13V52.8a22.55,22.55,0,0,0,5.38-.16ZM64.33,106.75H90.85V66.38a5.26,5.26,0,0,0-5.22-5.22H69.55a5.26,5.26,0,0,0-5.22,5.22v40.37ZM30,64.09h16.1a2.27,2.27,0,0,1,2.27,2.26V90.28a2.27,2.27,0,0,1-2.27,2.26H30a2.27,2.27,0,0,1-2.27-2.26V66.35A2.27,2.27,0,0,1,30,64.09Zm13.84,4.52H32.25V88H43.84V68.61ZM106.09,46.4c-1.25-.59-4.33-1.39-5.3-2.35a12.25,12.25,0,0,1-2.12-2.88,12.25,12.25,0,0,1-2.12,2.88c-2.14,2.13-7,3.46-10.29,3.46S78.11,46.18,76,44.05a12.25,12.25,0,0,1-2.12-2.88,12.25,12.25,0,0,1-2.12,2.88c-2.14,2.13-7,3.46-10.29,3.46s-8.15-1.33-10.29-3.46A12.25,12.25,0,0,1,49,41.17a12.25,12.25,0,0,1-2.12,2.88c-2.14,2.13-7,3.46-10.29,3.46s-8.15-1.33-10.29-3.46a12.25,12.25,0,0,1-2.12-2.88,12.25,12.25,0,0,1-2.12,2.88c-1.41,1.4-5.12,2.46-7.08,3-3.95.48-8.61-.09-11.54-3A11.77,11.77,0,0,1,0,35.71V31.07H0a1.44,1.44,0,0,1,.17-.66L8.49,3.76C9.17,1.57,10.84.16,14.07,0h94.09c2.9.31,4.79,1.53,5.57,3.74l9,26.62a1.35,1.35,0,0,1,.19.63h0a.71.71,0,0,1,0,.14v4.58a11.77,11.77,0,0,1-3.47,8.34c-3.48,3.48-8.78,3.39-13.32,2.35Z"/></svg>
    `;
  }
}

function addLogoutButton() {
  const logoutDivs = document.getElementsByClassName('odjava');
  Array.from(logoutDivs).forEach(logoutDiv => {
    if (!logoutDiv.querySelector('a')) {
      addSVG(logoutDiv);
    }
  });
}

function addSVG(logoutDiv) {
  const vl = document.createElement('div');
  vl.className = 'vl';

  const logoutLink = document.createElement('a');
  logoutLink.href = "../html/prijava.html";
  logoutLink.innerHTML = `
    <svg fill="#000000" width="25px" height="25px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <title>Odjava</title>
      <path d="M7,6H23v9.8h2V6a2,2,0,0,0-2-2H7A2,2,0,0,0,5,6V30a2,2,0,0,0,2,2H23a2,2,0,0,0,2-2H7Z"></path>
      <path d="M28.16,17.28a1,1,0,0,0-1.41,1.41L30.13,22H15.63a1,1,0,0,0-1,1,1,1,0,0,0,1,1h14.5l-3.38,3.46a1,1,0,1,0,1.41,1.41L34,23.07Z"></path>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
    </svg>
  `;

  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    handleLogout();
  });

  logoutDiv.appendChild(vl);
  logoutDiv.appendChild(logoutLink);
}

function handleLogout() {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('proizvajalec');
  window.location.href = '../html/index.html';
}

function setupLoginAccess() {
  const userId = sessionStorage.getItem('userID');
  const prijavaIcon = document.getElementById('prijavaIcon');

  if (prijavaIcon) {
    if (userId) {
      prijavaIcon.classList.remove('active-link');
      prijavaIcon.removeAttribute('href');
    } else {
      prijavaIcon.classList.add('active-link');
    }
  }
}

function setupDropdownLogout() {
  const odjavaDropdown = document.getElementsByClassName('dropdown-item odjava2');
  for (let i = 0; i < odjavaDropdown.length; i++) {
    odjavaDropdown[i].addEventListener('click', function () {
      sessionStorage.removeItem('userID');
      sessionStorage.removeItem('proizvajalec');
      window.location.href = '../html/index.html';
    });
  }
}
