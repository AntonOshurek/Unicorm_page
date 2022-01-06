/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/blocks/mobile-menu.js":
/*!**********************************************!*\
  !*** ./source/scripts/blocks/mobile-menu.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mobileMenu": function() { return /* binding */ mobileMenu; }
/* harmony export */ });
const mobileMenu = () => {
  const navButton = document.querySelector('.nav-button');
  const navBlock = document.querySelector('.nav');
  const navButtonSvg = document.querySelector('.ham');
  const body = document.querySelector('.body');
  const menuBackground = document.querySelector('.header__menu-bg');
  const navItem = document.querySelectorAll('.nav__item');
  let menuOpen = false;

  const closeMenu = () => {
    menuOpen = false;
    navBlock.classList.remove('nav--open');
    navButtonSvg.classList.remove('active');
    menuBackground.classList.remove('header__menu-bg--open');
    body.classList.remove('body--scrolloff');
    menuBackground.removeEventListener('click', onMenuBGCloseMenu);
    navItem.forEach(link => {
      link.removeEventListener('click', closeMenu);
    });
  };

  const onMenuBGCloseMenu = () => {
    closeMenu();
  };

  const openMenu = () => {
    menuOpen = true;
    navBlock.classList.add('nav--open');
    navButtonSvg.classList.add('active');
    menuBackground.classList.add('header__menu-bg--open');
    body.classList.add('body--scrolloff');
    menuBackground.addEventListener('click', onMenuBGCloseMenu);
    navItem.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  };

  const onMobileMenuToogle = evt => {
    menuOpen ? closeMenu() : openMenu();
  };

  navButton.addEventListener('click', onMobileMenuToogle);
};



/***/ }),

/***/ "./source/scripts/blocks/nav-scroll.js":
/*!*********************************************!*\
  !*** ./source/scripts/blocks/nav-scroll.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "navScroll": function() { return /* binding */ navScroll; }
/* harmony export */ });
const TABLET_WIDTH = 900;

const navScroll = () => {
  const header = document.querySelector('.header__wrap');
  const coverBlock = document.querySelector('.cover');
  const navButtonSvg = document.querySelector('.ham');
  const headerHeight = window.getComputedStyle(header).height.replace(/\D+/, '');
  let coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');
  let navButton = false;

  const onScrollCheck = () => {
    if (window.scrollY > coverHeight - headerHeight / 2) {
      header.classList.add('header__wrap--scroll');

      if (navButton) {
        navButtonSvg.classList.add('ham--black');
      }
    } else {
      header.classList.remove('header__wrap--scroll');

      if (navButton) {
        navButtonSvg.classList.remove('ham--black');
      }
    }
  };

  if (window.getComputedStyle(header).width.replace(/\D+/, '') < TABLET_WIDTH) {
    navButton = true;
    onScrollCheck();
  }

  const onHeightCheck = () => {
    coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');
    onScrollCheck();
  };

  window.addEventListener('scroll', onScrollCheck);
  window.addEventListener('resize', onHeightCheck);
};



/***/ }),

/***/ "./source/scripts/blocks/set-current-menu-item.js":
/*!********************************************************!*\
  !*** ./source/scripts/blocks/set-current-menu-item.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCurrentMenuItem": function() { return /* binding */ setCurrentMenuItem; }
/* harmony export */ });
const setCurrentMenuItem = () => {
  const isScrolledIntoView = elem => {
    const rect = elem.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop < window.innerHeight / 2 && Math.sign(elemTop) != -1 || elemBottom > window.innerHeight / 2 && elemBottom < window.innerHeight;
    return isVisible;
  };

  const allSections = document.querySelectorAll('section');
  const allNavLinks = document.querySelectorAll('.nav__link');
  const footerBlock = document.querySelector('.footer');
  const secArr = [...allSections, footerBlock];

  const markCurrentMenuItem = () => {
    secArr.forEach(section => {
      let sectionClass;

      if (isScrolledIntoView(section)) {
        sectionClass = section.className;
        allNavLinks.forEach(link => {
          link.classList.remove('nav__link--current');

          if (link.getAttribute('data-nav-name') === sectionClass) {
            link.classList.add('nav__link--current');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', markCurrentMenuItem);
};



/***/ }),

/***/ "./source/scripts/blocks/show-services.js":
/*!************************************************!*\
  !*** ./source/scripts/blocks/show-services.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showServices": function() { return /* binding */ showServices; }
/* harmony export */ });
const showServices = () => {
  let imageItems = [...document.querySelectorAll('.services__img-wrap')];
  let options = {
    rootMargin: '0px',
    threshold: .2
  };

  let setItemActive = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('services__img-wrap--active');
      }
    });
  };

  let observer = new IntersectionObserver(setItemActive, options);
  imageItems.forEach(item => {
    observer.observe(item);
  });
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************!*\
  !*** ./source/scripts/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_nav_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/nav-scroll */ "./source/scripts/blocks/nav-scroll.js");
/* harmony import */ var _blocks_set_current_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/set-current-menu-item */ "./source/scripts/blocks/set-current-menu-item.js");
/* harmony import */ var _blocks_mobile_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/mobile-menu */ "./source/scripts/blocks/mobile-menu.js");
/* harmony import */ var _blocks_show_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/show-services */ "./source/scripts/blocks/show-services.js");




window.addEventListener('DOMContentLoaded', () => {
  (0,_blocks_nav_scroll__WEBPACK_IMPORTED_MODULE_0__.navScroll)();
  (0,_blocks_set_current_menu_item__WEBPACK_IMPORTED_MODULE_1__.setCurrentMenuItem)();
  (0,_blocks_mobile_menu__WEBPACK_IMPORTED_MODULE_2__.mobileMenu)();
  (0,_blocks_show_services__WEBPACK_IMPORTED_MODULE_3__.showServices)();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map