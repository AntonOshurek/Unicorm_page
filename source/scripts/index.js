import {navScroll} from './blocks/nav-scroll.js';
import {setCurrentMenuItem} from './blocks/set-current-menu-item.js';
import {mobileMenu} from './blocks/mobile-menu.js';
import {showServices} from './blocks/show-services.js';
import {footerMapLink} from './blocks/footer-map-link.js';


window.addEventListener('DOMContentLoaded', () => {
  navScroll();
  setCurrentMenuItem();
  mobileMenu();
  showServices();
	footerMapLink();
});

