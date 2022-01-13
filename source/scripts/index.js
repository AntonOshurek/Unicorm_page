import {navScroll} from './blocks/nav-scroll';
import {setCurrentMenuItem} from './blocks/set-current-menu-item';
import {mobileMenu} from './blocks/mobile-menu';
import {showServices} from './blocks/show-services';
import {footerMapLink} from './blocks/footer-map-link';


window.addEventListener('DOMContentLoaded', () => {
  navScroll();
  setCurrentMenuItem();
  mobileMenu();
  showServices();
	footerMapLink();
});

