const mobileMenu = () => {

  const navButton = document.querySelector('.nav-button');
  const navBlock = document.querySelector('.nav');
  const navButtonSvg = document.querySelector('.ham');

  let menuOpen = false;

  const onMobileMenuToogle = (evt) => {
    evt.preventDefault();
    if(!menuOpen) {
      menuOpen = true;
      navBlock.classList.add('nav--open');
      navButtonSvg.classList.add('ham--menu-open');
    } else {
      menuOpen = false;
      navBlock.classList.remove('nav--open');
      navButtonSvg.classList.remove('ham--menu-open');
    }
  }

  navButton.addEventListener('click', onMobileMenuToogle);



}

export {mobileMenu};

