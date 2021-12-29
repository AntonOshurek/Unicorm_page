/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/blocks/button.js":
/*!*****************************************!*\
  !*** ./source/scripts/blocks/button.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buttonAnimate": function() { return /* binding */ buttonAnimate; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const buttonAnimate = () => {
  const LiquidButton = class LiquidButton {
    constructor(svg) {
      _defineProperty(this, "link", document.querySelector('.foo'));

      const options = svg.dataset;
      this.id = this.constructor.id || (this.constructor.id = 1);
      this.constructor.id++;
      this.xmlns = 'http://www.w3.org/2000/svg';
      this.tension = options.tension * 1 || 0.4;
      this.width = options.width * 1 || 200;
      this.height = options.height * 1 || 50;
      this.margin = options.margin || 40;
      this.hoverFactor = options.hoverFactor || -0.1;
      this.gap = options.gap || 5;
      this.debug = options.debug || false;
      this.forceFactor = options.forceFactor || 0.2;
      this.color1 = options.color1 || '#36DFE7';
      this.color2 = options.color2 || '#8F17E1';
      this.color3 = options.color3 || '#BF09E6';
      this.textColor = options.textColor || '#fff';
      this.text = options.text || 'Button';
      this.svg = svg;
      this.layers = [{
        points: [],
        viscosity: 0.5,
        mouseForce: 100,
        forceLimit: 2
      }, {
        points: [],
        viscosity: 0.8,
        mouseForce: 150,
        forceLimit: 3
      }];

      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        layer.viscosity = options['layer-' + (layerIndex + 1) + 'Viscosity'] * 1 || layer.viscosity;
        layer.mouseForce = options['layer-' + (layerIndex + 1) + 'MouseForce'] * 1 || layer.mouseForce;
        layer.forceLimit = options['layer-' + (layerIndex + 1) + 'ForceLimit'] * 1 || layer.forceLimit;
        layer.path = document.createElementNS(this.xmlns, 'path');
        this.svg.appendChild(layer.path);
      }

      this.wrapperElement = options.wrapperElement || document.body;

      if (!this.svg.parentElement) {
        this.wrapperElement.append(this.svg);
      }

      this.svgText = document.createElementNS(this.xmlns, 'text');
      this.svgText.setAttribute('x', '50%');
      this.svgText.setAttribute('y', '50%');
      this.svgText.setAttribute('dy', ~~(this.height / 8) + 'px');
      this.svgText.setAttribute('font-size', ~~(this.height / 3));
      this.svgText.style.fontFamily = 'sans-serif';
      this.svgText.setAttribute('text-anchor', 'middle');
      this.svgText.setAttribute('pointer-events', 'none');
      this.svg.appendChild(this.svgText);
      this.svgDefs = document.createElementNS(this.xmlns, 'defs');
      this.svg.appendChild(this.svgDefs);
      this.touches = [];
      this.noise = options.noise || 0;
      this.link.addEventListener('touchstart', this.touchHandler);
      this.link.addEventListener('touchmove', this.touchHandler);
      this.link.addEventListener('touchend', this.clearHandler);
      this.link.addEventListener('touchcancel', this.clearHandler);
      this.svg.addEventListener('mousemove', this.mouseHandler);
      this.svg.addEventListener('mouseout', this.clearHandler);
      this.initOrigins();
      this.animate();
    }

    get mouseHandler() {
      return e => {
        this.touches = [{
          x: e.offsetX,
          y: e.offsetY,
          force: 1
        }];
      };
    }

    get touchHandler() {
      return e => {
        this.touches = [];
        const rect = this.svg.getBoundingClientRect();

        for (let touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
          const touch = e.changedTouches[touchIndex];
          const x = touch.pageX - rect.left;
          const y = touch.pageY - rect.top;

          if (x > 0 && y > 0 && x < this.svgWidth && y < this.svgHeight) {
            this.touches.push({
              x,
              y,
              force: touch.force || 1
            });
          }
        }

        e.preventDefault();
      };
    }

    get clearHandler() {
      return e => {
        this.touches = [];
      };
    }

    get raf() {
      return this.__raf || (this.__raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        setTimeout(callback, 10);
      }).bind(window));
    }

    distance(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    update() {
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = layer.points;

        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const point = points[pointIndex];
          const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
          const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
          const d = Math.sqrt(dx * dx + dy * dy);
          const f = d * this.forceFactor;
          point.vx += f * (dx / d || 0);
          point.vy += f * (dy / d || 0);

          for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            const touch = this.touches[touchIndex];
            let mouseForce = layer.mouseForce;

            if (touch.x > this.margin && touch.x < this.margin + this.width && touch.y > this.margin && touch.y < this.margin + this.height) {
              mouseForce *= -this.hoverFactor;
            }

            const mx = point.x - touch.x;
            const my = point.y - touch.y;
            const md = Math.sqrt(mx * mx + my * my);
            const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, mouseForce * touch.force / md));
            point.vx += mf * (mx / md || 0);
            point.vy += mf * (my / md || 0);
          }

          point.vx *= layer.viscosity;
          point.vy *= layer.viscosity;
          point.x += point.vx;
          point.y += point.vy;
        }

        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const prev = points[(pointIndex + points.length - 1) % points.length];
          const point = points[pointIndex];
          const next = points[(pointIndex + points.length + 1) % points.length];
          const dPrev = this.distance(point, prev);
          const dNext = this.distance(point, next);
          const line = {
            x: next.x - prev.x,
            y: next.y - prev.y
          };
          const dLine = Math.sqrt(line.x * line.x + line.y * line.y);
          point.cPrev = {
            x: point.x - line.x / dLine * dPrev * this.tension,
            y: point.y - line.y / dLine * dPrev * this.tension
          };
          point.cNext = {
            x: point.x + line.x / dLine * dNext * this.tension,
            y: point.y + line.y / dLine * dNext * this.tension
          };
        }
      }
    }

    animate() {
      this.raf(() => {
        this.update();
        this.draw();
        this.animate();
      });
    }

    get svgWidth() {
      return this.width + this.margin * 2;
    }

    get svgHeight() {
      return this.height + this.margin * 2;
    }

    draw() {
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];

        if (layerIndex === 1) {
          if (this.touches.length > 0) {
            while (this.svgDefs.firstChild) {
              this.svgDefs.removeChild(this.svgDefs.firstChild);
            }

            for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
              const touch = this.touches[touchIndex];
              const gradient = document.createElementNS(this.xmlns, 'radialGradient');
              gradient.id = 'liquid-gradient-' + this.id + '-' + touchIndex;
              const start = document.createElementNS(this.xmlns, 'stop');
              start.setAttribute('stop-color', this.color3);
              start.setAttribute('offset', '0%');
              const stop = document.createElementNS(this.xmlns, 'stop');
              stop.setAttribute('stop-color', this.color2);
              stop.setAttribute('offset', '100%');
              gradient.appendChild(start);
              gradient.appendChild(stop);
              this.svgDefs.appendChild(gradient);
              gradient.setAttribute('cx', touch.x / this.svgWidth);
              gradient.setAttribute('cy', touch.y / this.svgHeight);
              gradient.setAttribute('r', touch.force);
              layer.path.style.fill = 'url(#' + gradient.id + ')';
            }
          } else {
            layer.path.style.fill = this.color2;
          }
        } else {
          layer.path.style.fill = this.color1;
        }

        const points = layer.points;
        const commands = [];
        commands.push('M', points[0].x, points[0].y);

        for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
          commands.push('C', points[(pointIndex + 0) % points.length].cNext.x, points[(pointIndex + 0) % points.length].cNext.y, points[(pointIndex + 1) % points.length].cPrev.x, points[(pointIndex + 1) % points.length].cPrev.y, points[(pointIndex + 1) % points.length].x, points[(pointIndex + 1) % points.length].y);
        }

        commands.push('Z');
        layer.path.setAttribute('d', commands.join(' '));
      }

      this.svgText.textContent = this.text;
      this.svgText.style.fill = this.textColor;
    }

    createPoint(x, y) {
      return {
        x: x,
        y: y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0
      };
    }

    initOrigins() {
      this.svg.setAttribute('width', this.svgWidth);
      this.svg.setAttribute('height', this.svgHeight);

      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = [];

        for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
          points.push(this.createPoint(x + this.margin, this.margin));
        }

        for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
          const angle = Math.PI / ~~(this.height * 1.25) * alpha;
          points.push(this.createPoint(Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2, Math.cos(angle) * this.height / 2 + this.margin + this.height / 2));
        }

        for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
          points.push(this.createPoint(x + this.margin, this.margin + this.height));
        }

        for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
          const angle = Math.PI / ~~(this.height * 1.25) * alpha;
          points.push(this.createPoint(this.height - Math.sin(angle) * this.height / 2 + this.margin - this.height / 2, Math.cos(angle) * this.height / 2 + this.margin + this.height / 2));
        }

        layer.points = points;
      }
    }

  };

  const redraw = () => {
    button.initOrigins();
  };

  const buttons = document.getElementsByClassName('liquid-button');

  for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
    const button = buttons[buttonIndex];
    button.liquidButton = new LiquidButton(button);
  }
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
const navScroll = () => {
  const header = document.querySelector('.header__wrap');
  const coverBlock = document.querySelector('.cover');
  const headerHeight = window.getComputedStyle(header).height.replace(/\D+/, '');
  let coverHeight = window.getComputedStyle(coverBlock).height.replace(/\D+/, '');

  const onScrollCheck = () => {
    if (window.scrollY > coverHeight - headerHeight / 2) {
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
  const coverBlock = document.querySelector('.cover');
  const skillsBlock = document.querySelector('.skills');
  const aboutUsBlock = document.querySelector('.about-us');
  const navigateLinks = document.querySelectorAll('.nav__link'); // nav__link--current

  const startLink = document.querySelector('.nav__link--start');
  const skillsLink = document.querySelector('.nav__link--skills');
  const aboutLink = document.querySelector('.nav__link--aboutUs');

  const isScrolledIntoView = elem => {
    const rect = elem.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop < window.innerHeight / 2 && Math.sign(elemTop) != -1 || elemBottom > window.innerHeight / 2 && elemBottom < window.innerHeight;
    return isVisible;
  };

  window.addEventListener('scroll', () => {
    if (isScrolledIntoView(coverBlock)) {
      navigateLinks.forEach(item => {
        item.classList.remove('nav__link--current');
      });
      startLink.classList.add('nav__link--current');
    }

    if (isScrolledIntoView(skillsBlock)) {
      navigateLinks.forEach(item => {
        item.classList.remove('nav__link--current');
      });
      skillsLink.classList.add('nav__link--current');
    }

    if (isScrolledIntoView(aboutUsBlock)) {
      navigateLinks.forEach(item => {
        item.classList.remove('nav__link--current');
      });
      aboutLink.classList.add('nav__link--current');
    }
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
/* harmony import */ var _blocks_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/button */ "./source/scripts/blocks/button.js");
/* harmony import */ var _blocks_nav_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/nav-scroll */ "./source/scripts/blocks/nav-scroll.js");
/* harmony import */ var _blocks_set_current_menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/set-current-menu-item */ "./source/scripts/blocks/set-current-menu-item.js");



window.addEventListener('DOMContentLoaded', () => {
  (0,_blocks_button__WEBPACK_IMPORTED_MODULE_0__.buttonAnimate)();
  (0,_blocks_nav_scroll__WEBPACK_IMPORTED_MODULE_1__.navScroll)();
  (0,_blocks_set_current_menu_item__WEBPACK_IMPORTED_MODULE_2__.setCurrentMenuItem)();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map