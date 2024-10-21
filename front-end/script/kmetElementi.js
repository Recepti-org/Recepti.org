document.addEventListener('DOMContentLoaded', function () {
  const proizvajalec = sessionStorage.getItem('proizvajalec');
  if (proizvajalec === '1') {
    const navItems = document.getElementsByClassName('column nav-item-x');
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.add('hidden');
    }

    const footerItems = document.getElementsByClassName('footer-nav-item-x');
    for (let i = 0; i < footerItems.length; i++) {
      footerItems[i].classList.add('hidden');
    }

    const navList = document.querySelector('.navbar-nav');
    if (navList) {
      const firstStaticNavItem = document.querySelector('.nav-item-static');
      const newNavItem = document.createElement('li');
      newNavItem.className = 'column nav-item';
      newNavItem.innerHTML = '<a class="nav-link" href="statusDodaj.html"><h6>dodaj status</h6></a>';
      navList.insertBefore(newNavItem, firstStaticNavItem);

      const newNavItem2 = document.createElement('li');
      newNavItem2.className = 'column nav-item';
      newNavItem2.innerHTML = '<a class="nav-link" href="kmetdodaj.html"><h6>dodaj drevo</h6></a>';
      navList.insertBefore(newNavItem2, firstStaticNavItem);	
    }
  }
});