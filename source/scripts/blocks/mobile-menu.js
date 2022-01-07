const mobileMenu = () => {

  const navButton = document.querySelector('.nav-button');
	const navButtonndicator = document.querySelector('.nav-button__indicator');
  const navBlock = document.querySelector('.nav');
  const navButtonSvg = document.querySelector('.ham');
  const body = document.querySelector('.body');
  const menuBackground = document.querySelector('.header__menu-bg');
  const navItem = document.querySelectorAll('.nav__item');

  let menuOpen = false;

  const closeMenu = () => {
    menuOpen = false;
		navButtonndicator.textContent = 'open menu button';
    navBlock.classList.remove('nav--open');
    navButtonSvg.classList.remove('active');
    menuBackground.classList.remove('header__menu-bg--open');
    body.classList.remove('body--scrolloff');

    menuBackground.removeEventListener('click', onMenuBGCloseMenu);

    navItem.forEach((link) => {
      link.removeEventListener('click', closeMenu);
    })
  }

  const onMenuBGCloseMenu = () => {
    closeMenu();
  }

  const openMenu = () => {
    menuOpen = true;
		navButtonndicator.textContent = 'close menu button';
    navBlock.classList.add('nav--open');
    navButtonSvg.classList.add('active');
    menuBackground.classList.add('header__menu-bg--open');
    body.classList.add('body--scrolloff');

    menuBackground.addEventListener('click', onMenuBGCloseMenu);

    navItem.forEach((link) => {
      link.addEventListener('click', closeMenu);
    })
  }

  const onMobileMenuToogle = (evt) => {
    menuOpen ? closeMenu() : openMenu();
  }

  navButton.addEventListener('click', onMobileMenuToogle);
}

export {mobileMenu};

