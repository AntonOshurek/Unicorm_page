const TABLET_WIDTH = 900;

const navScroll = () => {

  const header = document.querySelector('.header__wrap');
  const coverBlock = document.querySelector('.cover');
  const navButtonLine = document.querySelectorAll('.line');

  const headerHeight = window.getComputedStyle(header).height.replace(/\D+/, '');
  let coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');
  let navButton = false;

  const onScrollCheck = () => {
    if (window.scrollY > coverHeight - (headerHeight / 2)) {
      header.classList.add('header__wrap--scroll');
      if(navButton) {
        navButtonLine.forEach((line) => {
          line.classList.add('line--black');
        })
      }
    } else {
      header.classList.remove('header__wrap--scroll');
      if(navButton) {
        navButtonLine.forEach((line) => {
          line.classList.remove('line--black');
        })
      }
    }
  };

  if(window.getComputedStyle(header).width.replace(/\D+/, '') < TABLET_WIDTH) {
    navButton = true;
    onScrollCheck();
  }

  const onHeightCheck = () => {
    coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');
    onScrollCheck();
  };

  window.addEventListener('scroll', onScrollCheck);
  window.addEventListener('resize', onHeightCheck);

}

export {navScroll}
