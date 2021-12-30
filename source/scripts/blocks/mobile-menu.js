const mobileMenu = () => {

  const navButton = document.querySelector('.nav-button');
  const navBlock = document.querySelector('.nav');

  let menuOpen = false;

  const onMobileMenuToogle = (evt) => {
    evt.preventDefault();
    if(!menuOpen) {
      menuOpen = true;
      navBlock.classList.add('nav--open');
    } else {
      menuOpen = false;
      navBlock.classList.remove('nav--open');
    }
  }

  navButton.addEventListener('click', onMobileMenuToogle);



}

export {mobileMenu};

