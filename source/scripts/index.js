import {buttonAnimate} from './blocks/button';
import {navScroll} from './blocks/nav-scroll';
import {setCurrentMenuItem} from './blocks/set-current-menu-item';


window.addEventListener('DOMContentLoaded', () => {
  buttonAnimate();
  navScroll();
  setCurrentMenuItem();
});

