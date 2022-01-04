import {navScroll} from './blocks/nav-scroll';
import {setCurrentMenuItem} from './blocks/set-current-menu-item';
import {mobileMenu} from './blocks/mobile-menu';


window.addEventListener('DOMContentLoaded', () => {
  navScroll();
  setCurrentMenuItem();
  mobileMenu();
});

