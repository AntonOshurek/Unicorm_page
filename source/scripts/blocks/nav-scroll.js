const navScroll = () => {

  const header = document.querySelector('.header__wrap')

  window.onscroll = () => {
    console.log(window.scrollY)
    if (window.scrollY > 795) {
      header.classList.add('header__wrap--scroll');
    } else {
      header.classList.remove('header__wrap--scroll');
    }
};
}

export {navScroll}
