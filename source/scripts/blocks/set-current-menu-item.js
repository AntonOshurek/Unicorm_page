const setCurrentMenuItem = () => {

  const coverBlock = document.querySelector('.cover');
  const skillsBlock = document.querySelector('.skills');
  const aboutUsBlock = document.querySelector('.about-us');
  const systemsBlock = document.querySelector('.systems');

  const navigateLinks = document.querySelectorAll('.nav__link');
  // nav__link--current
  const startLink = document.querySelector('.nav__link--start');
  const skillsLink = document.querySelector('.nav__link--skills');
  const aboutLink = document.querySelector('.nav__link--aboutUs');
  const systemslink = document.querySelector('.nav__link--systems');

  const isScrolledIntoView = (elem) => {
    const rect = elem.getBoundingClientRect();

    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = (elemTop < (window.innerHeight / 2) && Math.sign(elemTop) != -1) || ((elemBottom > window.innerHeight / 2) && elemBottom < window.innerHeight);
    return isVisible;
  }

  window.addEventListener('scroll', () => {

    if(isScrolledIntoView(coverBlock)) {
      navigateLinks.forEach((item) => {item.classList.remove('nav__link--current')})
      startLink.classList.add('nav__link--current');
    }

    if(isScrolledIntoView(skillsBlock)) {
      navigateLinks.forEach((item) => {item.classList.remove('nav__link--current')})
      skillsLink.classList.add('nav__link--current');
    }

    if(isScrolledIntoView(aboutUsBlock)) {
      navigateLinks.forEach((item) => {item.classList.remove('nav__link--current')})
      aboutLink.classList.add('nav__link--current');
    }

    if(isScrolledIntoView(systemsBlock)) {
      navigateLinks.forEach((item) => {item.classList.remove('nav__link--current')})
      systemslink.classList.add('nav__link--current');
    }

  });

}

export {setCurrentMenuItem};
