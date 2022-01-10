const TABLET_WIDTH = 900;
const SCROLL_OFFSET = 40;

const navScroll = () => {
  const header = document.querySelector('.header__wrap');
  const navButtonSvg = document.querySelector('.ham');
  let navButton = false;

  const onScrollCheck = () => {
		// console.log(window.scrollY);
		// console.log(navButton)
		if (window.scrollY > SCROLL_OFFSET) {
      header.classList.add('header__wrap--scroll');
      if(navButton) {
        navButtonSvg.classList.add('ham--black');
      }
    } else {
        header.classList.remove('header__wrap--scroll');
        if(navButton) {
          navButtonSvg.classList.remove('ham--black');
        }
    }
  }

	const onHeightCheck = () => {
		console.log('saf')
		if(window.getComputedStyle(header).width.replace(/\D+/, '') < TABLET_WIDTH) {
			console.log(window.getComputedStyle(header).width.replace(/\D+/, ''));
			navButton = true;
			onScrollCheck();
		} else {
			navButton = false;
		}
	}
	onHeightCheck();

  window.addEventListener('scroll', onScrollCheck);
  window.addEventListener('resize', onHeightCheck);
}

export {navScroll}
