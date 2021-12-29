const navScroll = () => {

  const header = document.querySelector('.header__wrap');
  const coverBlock = document.querySelector('.cover');

  const headerHeight = window.getComputedStyle(header).height.replace(/\D+/, '');
  let coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');

  const onScrollCheck = () => {
    if (window.scrollY > coverHeight - (headerHeight / 2)) {
      header.classList.add('header__wrap--scroll');
    } else {
      header.classList.remove('header__wrap--scroll');
    }
  };

  const onHeightCheck = () => {
    coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');
    onScrollCheck();
  };

  window.addEventListener('scroll', onScrollCheck);
  window.addEventListener('resize', onHeightCheck);

}

export {navScroll}
