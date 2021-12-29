const navScroll = () => {

  const header = document.querySelector('.header__wrap')
  const coverBlock = document.querySelector('.cover');

  const headerHeight = window.getComputedStyle(header).height.replace(/\D+/, '')
  const coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');

  console.log(coverHeight)

  window.onscroll = () => {
    console.log(window.scrollY)
    if (window.scrollY > coverHeight - (headerHeight / 2)) {
      header.classList.add('header__wrap--scroll');
    } else {
      header.classList.remove('header__wrap--scroll');
    }
  };

}

export {navScroll}
