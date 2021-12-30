import {buttonAnimate} from './blocks/button';
import {navScroll} from './blocks/nav-scroll';
import {setCurrentMenuItem} from './blocks/set-current-menu-item';
import {mobileMenu} from './blocks/mobile-menu';
import {showAboutUsBlock} from './blocks/show-about-us-block';


window.addEventListener('DOMContentLoaded', () => {
  buttonAnimate();
  navScroll();
  setCurrentMenuItem();
  mobileMenu();
  showAboutUsBlock();
});

