(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/dts-css-modules-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/dts-css-modules-loader??ref--5-1!./node_modules/css-loader/dist/cjs.js??ref--5-2!./node_modules/postcss-loader/src??ref--5-3!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss ***!
  \***************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ":root {\n  --litepickerBgColor: #fff;\n  --litepickerMonthButton: #9e9e9e;\n  --litepickerMonthButtonHover: #2196f3;\n  --litepickerWeekdayColor: #9e9e9e;\n  --litepickerDayColor: #333;\n  --litepickerDayColorHover: #2196f3;\n  --litepickerDayIsTodayColor: #f44336;\n  --litepickerDayIsInRange:#bbdefb;\n  --litepickerDayIsLockedColor: #9e9e9e;\n  --litepickerDayIsBookedColor: #9e9e9e;\n  --litepickerDayIsStartColor: #fff;\n  --litepickerDayIsStartBg: #2196f3;\n  --litepickerDayIsEndColor: #fff;\n  --litepickerDayIsEndBg: #2196f3;\n  --litepickerButtonCancelColor: #fff;\n  --litepickerButtonCancelBg: #9e9e9e;\n  --litepickerButtonApplyColor: #fff;\n  --litepickerButtonApplyBg: #2196f3; }\n\n._1Hn3XK5zCMdV183-QmJiMc {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 0.8em;\n  display: none; }\n  ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ {\n    display: grid;\n    background-color: var(--litepickerBgColor);\n    border-radius: 5px;\n    -webkit-box-shadow: 0 0 5px #ddd;\n            box-shadow: 0 0 5px #ddd; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ._3yCgny1mbtL5VvTLLowtFo {\n      grid-template-columns: repeat(2, 1fr); }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ.qDtdarb4IQWOnHrstuTRW {\n      grid-template-columns: repeat(3, 1fr); }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ._2Cl7nDPdNEjOQwbGWBHbTs {\n      grid-template-columns: repeat(4, 1fr); }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ._3Qf_HYqQebcgYJ2D61KteF .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB,\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ._3Qf_HYqQebcgYJ2D61KteF .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB {\n      visibility: visible; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM {\n      padding: 5px 0; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: space-evenly;\n            -ms-flex-pack: space-evenly;\n                justify-content: space-evenly;\n        font-weight: 500;\n        padding: 10px 5px;\n        text-align: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB,\n        ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB {\n          visibility: hidden;\n          text-decoration: none;\n          color: var(--litepickerMonthButton);\n          padding: 3px 5px;\n          border-radius: 3px;\n          -webkit-transition: color 0.3s, border 0.3s;\n          transition: color 0.3s, border 0.3s;\n          cursor: default; }\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB > svg,\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB > img,\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB > svg,\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB > img {\n            fill: var(--litepickerMonthButton);\n            pointer-events: none; }\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB:hover,\n          ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB:hover {\n            color: var(--litepickerMonthButtonHover); }\n            ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._1DjTnqKn6cOy17CdpYA1OB:hover > svg,\n            ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .MoJmnh58VG16OcySVFlUJ ._38t4MIvz_F8jLJqXffcjyB:hover > svg {\n              fill: var(--litepickerMonthButtonHover); }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ ._3RNHHNUGhQ-NpbLrnVDa8s {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        justify-self: center;\n        color: var(--litepickerWeekdayColor);\n        padding: 0 5px; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ ._3RNHHNUGhQ-NpbLrnVDa8s > div {\n          padding: 5px;\n          font-size: 85%; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM:first-child ._1DjTnqKn6cOy17CdpYA1OB {\n        visibility: visible; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM:last-child ._38t4MIvz_F8jLJqXffcjyB {\n        visibility: visible; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM._25biuLg69MCnmV6J8fqKD4 ._1DjTnqKn6cOy17CdpYA1OB {\n        visibility: hidden; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM._2kXkJpz7IeM9a7gTXA_PCo ._38t4MIvz_F8jLJqXffcjyB {\n        visibility: hidden; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM.Ux5F6qTF6ZGExo276xndw ._3RNHHNUGhQ-NpbLrnVDa8s,\n      ._1Hn3XK5zCMdV183-QmJiMc ._1GaIWDB6QXdrLKd3z7NcAQ .ojlBo4qgLXnai63rSt8mM.Ux5F6qTF6ZGExo276xndw ._1e3ju2CAS5ZTTaEOvax5ns {\n        grid-template-columns: repeat(8, 1fr); }\n  ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    text-align: center;\n    padding: 0 5px; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6 {\n      color: var(--litepickerDayColor);\n      text-align: center;\n      text-decoration: none;\n      padding: 5px;\n      border-radius: 3px;\n      -webkit-transition: color 0.3s, border 0.3s;\n      transition: color 0.3s, border 0.3s;\n      cursor: default; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6:hover {\n        color: var(--litepickerDayColorHover);\n        -webkit-box-shadow: inset 0 0 0 1px var(--litepickerDayColorHover);\n                box-shadow: inset 0 0 0 1px var(--litepickerDayColorHover); }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2x_w74okZ9NwCcPIspzu4G {\n        color: var(--litepickerDayIsTodayColor); }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2CguzoMvitxdFkSfaWOxfO {\n        color: var(--litepickerDayIsLockedColor);\n        pointer-events: none; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2CguzoMvitxdFkSfaWOxfO:hover {\n          color: var(--litepickerDayIsLockedColor);\n          -webkit-box-shadow: none;\n                  box-shadow: none;\n          cursor: default; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2mdNnpCkTZRg_Hzk_FmKri {\n        color: var(--litepickerDayIsBookedColor);\n        pointer-events: none; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2mdNnpCkTZRg_Hzk_FmKri:hover {\n          color: var(--litepickerDayIsBookedColor);\n          -webkit-box-shadow: none;\n                  box-shadow: none;\n          cursor: default; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._2GwHJiKhBT5D_Ta_i7YzxH {\n        background-color: var(--litepickerDayIsInRange);\n        border-radius: 0; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._1MeR60xSRFo-1icQfXRRWD {\n        color: var(--litepickerDayIsStartColor);\n        background-color: var(--litepickerDayIsStartBg);\n        border-top-left-radius: 5px;\n        border-bottom-left-radius: 5px;\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._1MeR60xSRFo-1icQfXRRWD._2Fj7hQd92iBMoX2fVl4Vyf {\n          border-top-left-radius: 0;\n          border-bottom-left-radius: 0;\n          border-top-right-radius: 5px;\n          border-bottom-right-radius: 5px; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._13eCxGtGRKlrYxL0O0j2Rw {\n        color: var(--litepickerDayIsEndColor);\n        background-color: var(--litepickerDayIsEndBg);\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n        border-top-right-radius: 5px;\n        border-bottom-right-radius: 5px; }\n        ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._13eCxGtGRKlrYxL0O0j2Rw._2Fj7hQd92iBMoX2fVl4Vyf {\n          border-top-left-radius: 5px;\n          border-bottom-left-radius: 5px;\n          border-top-right-radius: 0;\n          border-bottom-right-radius: 0; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._2spBVUVEWX03LfL9d2duQ6._1MeR60xSRFo-1icQfXRRWD._13eCxGtGRKlrYxL0O0j2Rw {\n        border-top-left-radius: 5px;\n        border-bottom-left-radius: 5px;\n        border-top-right-radius: 5px;\n        border-bottom-right-radius: 5px; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._1e3ju2CAS5ZTTaEOvax5ns ._28-qR2XC9Gf45KyXZL0AMF {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      color: #9e9e9e;\n      font-size: 85%; }\n  ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU {\n    text-align: right;\n    padding: 10px 5px;\n    margin: 0 5px;\n    background-color: #fafafa;\n    -webkit-box-shadow: inset 0px 3px 3px 0px #ddd;\n            box-shadow: inset 0px 3px 3px 0px #ddd;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU ._33jcyrNQ0TnERGF3aCha7i {\n      margin-right: 10px;\n      font-size: 90%; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU .ns6SMy-deagXq02KxexEc {\n      background-color: var(--litepickerButtonCancelBg);\n      color: var(--litepickerButtonCancelColor);\n      border: 0;\n      padding: 3px 7px 4px;\n      border-radius: 3px; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU .ns6SMy-deagXq02KxexEc > svg,\n      ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU .ns6SMy-deagXq02KxexEc > img {\n        pointer-events: none; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU ._3WpCIne2pS6pB9oRlrQLhw {\n      background-color: var(--litepickerButtonApplyBg);\n      color: var(--litepickerButtonApplyColor);\n      border: 0;\n      padding: 3px 7px 4px;\n      border-radius: 3px;\n      margin-left: 10px;\n      margin-right: 10px; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU ._3WpCIne2pS6pB9oRlrQLhw:disabled {\n        opacity: 0.7; }\n      ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU ._3WpCIne2pS6pB9oRlrQLhw > svg,\n      ._1Hn3XK5zCMdV183-QmJiMc ._2ejJenNzhNLW0HWZz-1bUU ._3WpCIne2pS6pB9oRlrQLhw > img {\n        pointer-events: none; }\n  ._1Hn3XK5zCMdV183-QmJiMc ._2d7hkT581CcY11t4tV58bm {\n    position: absolute;\n    margin-top: -4px;\n    padding: 4px 8px;\n    border-radius: 4px;\n    background-color: #fff;\n    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    white-space: nowrap;\n    font-size: 11px;\n    pointer-events: none;\n    visibility: hidden; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._2d7hkT581CcY11t4tV58bm:before {\n      position: absolute;\n      bottom: -5px;\n      left: calc(50% - 5px);\n      border-top: 5px solid rgba(0, 0, 0, 0.12);\n      border-right: 5px solid transparent;\n      border-left: 5px solid transparent;\n      content: \"\"; }\n    ._1Hn3XK5zCMdV183-QmJiMc ._2d7hkT581CcY11t4tV58bm:after {\n      position: absolute;\n      bottom: -4px;\n      left: calc(50% - 4px);\n      border-top: 4px solid #fff;\n      border-right: 4px solid transparent;\n      border-left: 4px solid transparent;\n      content: \"\"; }\n", ""]);
// Exports
exports.locals = {
	"litepicker": "_1Hn3XK5zCMdV183-QmJiMc",
	"containerMonths": "_1GaIWDB6QXdrLKd3z7NcAQ",
	"columns2": "_3yCgny1mbtL5VvTLLowtFo",
	"columns3": "qDtdarb4IQWOnHrstuTRW",
	"columns4": "_2Cl7nDPdNEjOQwbGWBHbTs",
	"splitView": "_3Qf_HYqQebcgYJ2D61KteF",
	"monthItemHeader": "MoJmnh58VG16OcySVFlUJ",
	"buttonPreviousMonth": "_1DjTnqKn6cOy17CdpYA1OB",
	"buttonNextMonth": "_38t4MIvz_F8jLJqXffcjyB",
	"monthItem": "ojlBo4qgLXnai63rSt8mM",
	"monthItemWeekdaysRow": "_3RNHHNUGhQ-NpbLrnVDa8s",
	"noPreviousMonth": "_25biuLg69MCnmV6J8fqKD4",
	"noNextMonth": "_2kXkJpz7IeM9a7gTXA_PCo",
	"showWeekNumbers": "Ux5F6qTF6ZGExo276xndw",
	"containerDays": "_1e3ju2CAS5ZTTaEOvax5ns",
	"dayItem": "_2spBVUVEWX03LfL9d2duQ6",
	"isToday": "_2x_w74okZ9NwCcPIspzu4G",
	"isLocked": "_2CguzoMvitxdFkSfaWOxfO",
	"isBooked": "_2mdNnpCkTZRg_Hzk_FmKri",
	"isInRange": "_2GwHJiKhBT5D_Ta_i7YzxH",
	"isStartDate": "_1MeR60xSRFo-1icQfXRRWD",
	"isFlipped": "_2Fj7hQd92iBMoX2fVl4Vyf",
	"isEndDate": "_13eCxGtGRKlrYxL0O0j2Rw",
	"weekNumber": "_28-qR2XC9Gf45KyXZL0AMF",
	"containerFooter": "_2ejJenNzhNLW0HWZz-1bUU",
	"previewDateRange": "_33jcyrNQ0TnERGF3aCha7i",
	"buttonCancel": "ns6SMy-deagXq02KxexEc",
	"buttonApply": "_3WpCIne2pS6pB9oRlrQLhw",
	"containerTooltip": "_2d7hkT581CcY11t4tV58bm"
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./src/calendar.ts":
/*!*************************!*\
  !*** ./src/calendar.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const datetime_1 = __webpack_require__(/*! ./datetime */ "./src/datetime.ts");
const style = __importStar(__webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss"));
class Calendar {
    constructor() {
        this.options = {
            element: null,
            elementEnd: null,
            parentEl: null,
            firstDay: 1,
            format: 'YYYY-MM-DD',
            lang: 'en-US',
            numberOfMonths: 1,
            numberOfColumns: 1,
            startDate: null,
            endDate: null,
            zIndex: 9999,
            minDate: null,
            maxDate: null,
            minDays: null,
            maxDays: null,
            selectForward: false,
            selectBackward: false,
            splitView: false,
            inlineMode: false,
            singleMode: true,
            autoApply: true,
            allowRepick: false,
            showWeekNumbers: false,
            showTooltip: true,
            hotelMode: false,
            disableWeekends: false,
            scrollToDate: true,
            lockDaysFormat: 'YYYY-MM-DD',
            lockDays: [],
            disallowLockDaysInRange: false,
            bookedDaysFormat: 'YYYY-MM-DD',
            bookedDays: [],
            buttonText: {
                apply: 'Apply',
                cancel: 'Cancel',
                previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
                nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
            },
            tooltipText: {
                one: 'day',
                other: 'days',
            },
            // Events
            onShow: null,
            onHide: null,
            onSelect: null,
            onError: null,
            onChangeMonth: null,
            onChangeYear: null,
        };
        this.calendars = [];
        this.datePicked = [];
    }
    render() {
        const months = document.createElement('div');
        months.className = style.containerMonths;
        if (style[`columns${this.options.numberOfColumns}`]) {
            months.classList.add(style[`columns${this.options.numberOfColumns}`]);
        }
        if (this.options.splitView) {
            months.classList.add(style.splitView);
        }
        const startDate = this.calendars[0].clone();
        const startMonthIdx = startDate.getMonth();
        const totalMonths = startDate.getMonth() + this.options.numberOfMonths;
        let calendarIdx = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let idx = startMonthIdx; idx < totalMonths; idx += 1) {
            let dateIterator = startDate.clone();
            if (this.options.splitView) {
                dateIterator = this.calendars[calendarIdx].clone();
            }
            else {
                dateIterator.setMonth(idx);
            }
            months.appendChild(this.renderMonth(dateIterator));
            calendarIdx += 1;
        }
        this.picker.innerHTML = '';
        this.picker.appendChild(months);
        if (!this.options.autoApply || this.options.footerHTML) {
            this.picker.appendChild(this.renderFooter());
        }
        if (this.options.showTooltip) {
            this.picker.appendChild(this.renderTooltip());
        }
    }
    renderMonth(date) {
        const startDate = date.clone();
        startDate.setDate(1);
        const totalDays = 32 - new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();
        const month = document.createElement('div');
        month.className = style.monthItem;
        if (this.options.showWeekNumbers) {
            month.classList.add(style.showWeekNumbers);
        }
        const monthHeader = document.createElement('div');
        monthHeader.className = style.monthItemHeader;
        monthHeader.innerHTML = `
      <a href="#" class="${style.buttonPreviousMonth}">${this.options.buttonText.previousMonth}</a>
      <div>
        <strong>${date.toLocaleString(this.options.lang, { month: 'long' })}</strong>
        ${date.getFullYear()}
      </div>
      <a href="#" class="${style.buttonNextMonth}">${this.options.buttonText.nextMonth}</a>
    `;
        if (this.options.minDate
            && startDate.isSameOrBefore(new datetime_1.DateTime(this.options.minDate), 'month')) {
            month.classList.add(style.noPreviousMonth);
        }
        if (this.options.maxDate
            && startDate.isSameOrAfter(new datetime_1.DateTime(this.options.maxDate), 'month')) {
            month.classList.add(style.noNextMonth);
        }
        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = style.monthItemWeekdaysRow;
        if (this.options.showWeekNumbers) {
            weekdaysRow.innerHTML = '<div>W</div>';
        }
        for (let w = 1; w <= 7; w += 1) {
            // 7 days, 4 is «Thursday» (new Date(1970, 0, 1, 12, 0, 0, 0))
            const dayIdx = 7 - 4 + this.options.firstDay + w;
            const weekday = document.createElement('div');
            weekday.innerHTML = this.weekdayName(dayIdx);
            weekday.title = this.weekdayName(dayIdx, 'long');
            weekdaysRow.appendChild(weekday);
        }
        const days = document.createElement('div');
        days.className = style.containerDays;
        const skipDays = this.calcSkipDays(startDate);
        if (this.options.showWeekNumbers && skipDays) {
            days.appendChild(this.renderWeekNumber(startDate));
        }
        for (let idx = 0; idx < skipDays; idx += 1) {
            const dummy = document.createElement('div');
            days.appendChild(dummy);
        }
        // tslint:disable-next-line: prefer-for-of
        for (let idx = 1; idx <= totalDays; idx += 1) {
            startDate.setDate(idx);
            if (this.options.showWeekNumbers && startDate.getDay() === this.options.firstDay) {
                days.appendChild(this.renderWeekNumber(startDate));
            }
            days.appendChild(this.renderDay(startDate));
        }
        month.appendChild(monthHeader);
        month.appendChild(weekdaysRow);
        month.appendChild(days);
        return month;
    }
    renderDay(date) {
        const day = document.createElement('a');
        day.href = '#';
        day.className = style.dayItem;
        day.innerHTML = String(date.getDate());
        day.dataset.time = String(date.getTime());
        if (date.toDateString() === (new Date()).toDateString()) {
            day.classList.add(style.isToday);
        }
        if (this.datePicked.length) {
            if (this.datePicked[0].toDateString() === date.toDateString()) {
                day.classList.add(style.isStartDate);
                if (this.options.singleMode) {
                    day.classList.add(style.isEndDate);
                }
            }
            if (this.datePicked.length === 2
                && this.datePicked[1].toDateString() === date.toDateString()) {
                day.classList.add(style.isEndDate);
            }
            if (this.datePicked.length === 2) {
                if (date.isBetween(this.datePicked[0], this.datePicked[1])) {
                    day.classList.add(style.isInRange);
                }
            }
        }
        else if (this.options.startDate) {
            if (this.options.startDate.toDateString() === date.toDateString()) {
                day.classList.add(style.isStartDate);
                if (this.options.singleMode) {
                    day.classList.add(style.isEndDate);
                }
            }
            if (this.options.endDate && this.options.endDate.toDateString() === date.toDateString()) {
                day.classList.add(style.isEndDate);
            }
            if (this.options.startDate && this.options.endDate) {
                if (date.isBetween(this.options.startDate, this.options.endDate)) {
                    day.classList.add(style.isInRange);
                }
            }
        }
        if (this.options.minDate && date.isBefore(new datetime_1.DateTime(this.options.minDate))) {
            day.classList.add(style.isLocked);
        }
        if (this.options.maxDate && date.isAfter(new datetime_1.DateTime(this.options.maxDate))) {
            day.classList.add(style.isLocked);
        }
        if (this.options.minDays
            && this.datePicked.length === 1) {
            const left = this.datePicked[0].clone().subtract(this.options.minDays, 'day');
            const right = this.datePicked[0].clone().add(this.options.minDays, 'day');
            if (date.isBetween(left, this.datePicked[0], '(]')) {
                day.classList.add(style.isLocked);
            }
            if (date.isBetween(this.datePicked[0], right, '[)')) {
                day.classList.add(style.isLocked);
            }
        }
        if (this.options.maxDays
            && this.datePicked.length === 1) {
            const left = this.datePicked[0].clone().subtract(this.options.maxDays, 'day');
            const right = this.datePicked[0].clone().add(this.options.maxDays, 'day');
            if (date.isBefore(left)) {
                day.classList.add(style.isLocked);
            }
            if (date.isAfter(right)) {
                day.classList.add(style.isLocked);
            }
        }
        if (this.options.selectForward
            && this.datePicked.length === 1
            && date.isBefore(this.datePicked[0])) {
            day.classList.add(style.isLocked);
        }
        if (this.options.selectBackward
            && this.datePicked.length === 1
            && date.isAfter(this.datePicked[0])) {
            day.classList.add(style.isLocked);
        }
        if (this.options.lockDays.length) {
            const locked = this.options.lockDays
                .filter((d) => {
                if (d instanceof Array) {
                    return date.isBetween(d[0], d[1]);
                }
                return d.isSame(date, 'day');
            }).length;
            if (locked) {
                day.classList.add(style.isLocked);
            }
        }
        if (this.datePicked.length <= 1
            && this.options.bookedDays.length) {
            const locked = this.options.bookedDays
                .filter((d) => {
                if (d instanceof Array) {
                    return date.isBetween(d[0], d[1]);
                }
                return d.isSame(date, 'day');
            }).length;
            const isBefore = this.datePicked.length === 0
                || date.isBefore(this.datePicked[0]);
            if (locked && isBefore) {
                day.classList.add(style.isBooked);
            }
        }
        if (this.options.disableWeekends
            && (date.getDay() === 6 || date.getDay() === 0)) {
            day.classList.add(style.isLocked);
        }
        return day;
    }
    renderFooter() {
        const footer = document.createElement('div');
        footer.className = style.containerFooter;
        if (this.options.footerHTML) {
            footer.innerHTML = this.options.footerHTML;
        }
        else {
            footer.innerHTML = `
      <span class="${style.previewDateRange}"></span>
      <button type="button" class="${style.buttonCancel}">${this.options.buttonText.cancel}</button>
      <button type="button" class="${style.buttonApply}">${this.options.buttonText.apply}</button>
      `;
        }
        if (this.options.singleMode) {
            if (this.datePicked.length === 1) {
                const startValue = this.datePicked[0].format(this.options.format, this.options.lang);
                footer.querySelector(`.${style.previewDateRange}`).innerHTML = startValue;
            }
        }
        else {
            if (this.datePicked.length === 1) {
                footer.querySelector(`.${style.buttonApply}`).setAttribute('disabled', '');
            }
            if (this.datePicked.length === 2) {
                const startValue = this.datePicked[0].format(this.options.format, this.options.lang);
                const endValue = this.datePicked[1].format(this.options.format, this.options.lang);
                footer.querySelector(`.${style.previewDateRange}`)
                    .innerHTML = `${startValue} - ${endValue}`;
            }
        }
        return footer;
    }
    renderWeekNumber(date) {
        const wn = document.createElement('div');
        wn.className = style.weekNumber;
        wn.innerHTML = date.getWeek(this.options.firstDay);
        return wn;
    }
    renderTooltip() {
        const t = document.createElement('div');
        t.className = style.containerTooltip;
        return t;
    }
    weekdayName(day, representation = 'short') {
        return new Date(1970, 0, day, 12, 0, 0, 0)
            .toLocaleString(this.options.lang, { weekday: representation });
    }
    calcSkipDays(date) {
        let total = date.getDay() - this.options.firstDay;
        if (total < 0)
            total += 7;
        return total;
    }
}
exports.Calendar = Calendar;


/***/ }),

/***/ "./src/datetime.ts":
/*!*************************!*\
  !*** ./src/datetime.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DateTime extends Date {
    constructor(date = null, format = null, lang = 'en-US') {
        if (format) {
            super(DateTime.parseDateTime(date, format, lang));
        }
        else if (date) {
            super(DateTime.parseDateTime(date));
        }
        else {
            super();
        }
        this.lang = lang;
    }
    static parseDateTime(date, format = 'YYYY-MM-DD', lang = 'en-US') {
        if (!date)
            return new Date(NaN);
        if (date instanceof Date)
            return new Date(date);
        if (/^\d{10,}$/.test(date))
            return new Date(Number(date));
        if (typeof date === 'string') {
            const match = format.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);
            if (match) {
                const datePattern = {
                    year: 1,
                    month: 2,
                    day: 3,
                    value: '',
                };
                let shortMonths = null;
                let longMonths = null;
                if (match.includes('MMM')) {
                    shortMonths = [...Array(12).keys()]
                        .map(x => new Date(2019, x).toLocaleString(lang, { month: 'short' }));
                }
                if (match.includes('MMMM')) {
                    longMonths = [...Array(12).keys()]
                        .map(x => new Date(2019, x).toLocaleString(lang, { month: 'long' }));
                }
                for (const [k, v] of Object.entries(match)) {
                    const key = Number(k);
                    const value = String(v);
                    if (key > 0)
                        datePattern.value += '.*?'; // any delimiter
                    switch (value) {
                        case 'YY':
                        case 'YYYY':
                            datePattern.year = key + 1;
                            datePattern.value += `(\\d{${value.length}})`;
                            break;
                        case 'M':
                            datePattern.month = key + 1;
                            datePattern.value += '(\\d{1,2})';
                            break;
                        case 'MM':
                            datePattern.month = key + 1;
                            datePattern.value += `(\\d{${value.length}})`;
                            break;
                        case 'MMM':
                            datePattern.month = key + 1;
                            datePattern.value += `(${shortMonths.join('|')})`;
                            break;
                        case 'MMMM':
                            datePattern.month = key + 1;
                            datePattern.value += `(${longMonths.join('|')})`;
                            break;
                        case 'D':
                            datePattern.day = key + 1;
                            datePattern.value += '(\\d{1,2})';
                            break;
                        case 'DD':
                            datePattern.day = key + 1;
                            datePattern.value += `(\\d{${value.length}})`;
                            break;
                    }
                }
                const dateRegex = new RegExp(`^${datePattern.value}$`);
                if (dateRegex.test(date)) {
                    const d = dateRegex.exec(date);
                    const year = Number(d[datePattern.year]);
                    let month = Number(d[datePattern.month]) - 1;
                    if (shortMonths) {
                        month = shortMonths.indexOf(d[datePattern.month]);
                    }
                    else if (longMonths) {
                        month = longMonths.indexOf(d[datePattern.month]);
                    }
                    const day = Number(d[datePattern.day]) || 1;
                    return new Date(year, month, day);
                }
            }
        }
        return new Date(date);
    }
    static convertArray(array, format) {
        return array
            .map((d) => {
            if (d instanceof Array) {
                return d.map(d1 => new DateTime(d1, format));
            }
            return new DateTime(d, format);
        });
    }
    getWeek(firstDay) {
        const target = new Date(this.getTime());
        const dayNr = (this.getDay() + (7 - firstDay)) % 7;
        target.setDate(target.getDate() - dayNr);
        const startWeekday = target.getTime();
        target.setMonth(0, 1);
        if (target.getDay() !== firstDay) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((startWeekday - target.getTime()) / 604800000);
    }
    clone() {
        return new DateTime(this.getTime());
    }
    isBetween(date1, date2, check = '()') {
        switch (check) {
            default:
            case '()':
                return this.getTime() > date1.getTime() && this.getTime() < date2.getTime();
            case '[)':
                return this.getTime() >= date1.getTime() && this.getTime() < date2.getTime();
            case '(]':
                return this.getTime() > date1.getTime() && this.getTime() <= date2.getTime();
            case '[]':
                return this.getTime() >= date1.getTime() && this.getTime() <= date2.getTime();
        }
    }
    isBefore(date, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                return date.getTime() > this.getTime();
            case 'day':
            case 'days':
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
                    > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
            case 'month':
            case 'months':
                return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
                    > new Date(this.getFullYear(), this.getMonth(), 1).getTime();
        }
        throw new Error('isBefore: Invalid unit!');
    }
    isSameOrBefore(date, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                return date.getTime() >= this.getTime();
            case 'day':
            case 'days':
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
                    >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
            case 'month':
            case 'months':
                return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
                    >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
        }
        throw new Error('isSameOrBefore: Invalid unit!');
    }
    isAfter(date, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                return this.getTime() > date.getTime();
            case 'day':
            case 'days':
                return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
                    > new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            case 'month':
            case 'months':
                return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
                    > new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        }
        throw new Error('isAfter: Invalid unit!');
    }
    isSameOrAfter(date, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                return this.getTime() >= date.getTime();
            case 'day':
            case 'days':
                return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
                    >= new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            case 'month':
            case 'months':
                return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
                    >= new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        }
        throw new Error('isSameOrAfter: Invalid unit!');
    }
    isSame(date, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                return this.getTime() === date.getTime();
            case 'day':
            case 'days':
                return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
                    === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            case 'month':
            case 'months':
                return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
                    === new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        }
        throw new Error('isSame: Invalid unit!');
    }
    add(duration, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                this.setSeconds(this.getSeconds() + duration);
                break;
            case 'day':
            case 'days':
                this.setDate(this.getDate() + duration);
                break;
            case 'month':
            case 'months':
                this.setMonth(this.getMonth() + duration);
                break;
        }
        return this;
    }
    subtract(duration, unit = 'seconds') {
        switch (unit) {
            case 'second':
            case 'seconds':
                this.setSeconds(this.getSeconds() - duration);
                break;
            case 'day':
            case 'days':
                this.setDate(this.getDate() - duration);
                break;
            case 'month':
            case 'months':
                this.setMonth(this.getMonth() - duration);
                break;
        }
        return this;
    }
    diff(date, unit = 'seconds') {
        const oneDay = 1000 * 60 * 60 * 24;
        switch (unit) {
            default:
            case 'second':
            case 'seconds':
                return this.getTime() - date.getTime();
            case 'day':
            case 'days':
                return (this.getTime() - date.getTime()) / oneDay;
            case 'month':
            case 'months':
            // @TODO
        }
    }
    format(format, lang = 'en-US') {
        let response = '';
        const match = format.match(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}/g);
        if (match) {
            let shortMonths = null;
            let longMonths = null;
            if (match.includes('MMM')) {
                shortMonths = [...Array(12).keys()]
                    .map(x => new Date(2019, x).toLocaleString(lang, { month: 'short' }));
            }
            if (match.includes('MMMM')) {
                longMonths = [...Array(12).keys()]
                    .map(x => new Date(2019, x).toLocaleString(lang, { month: 'long' }));
            }
            for (const [k, v] of Object.entries(match)) {
                const key = Number(k);
                const value = String(v);
                if (key > 0) {
                    const prev = match[key - 1];
                    response += format.substring(format.indexOf(prev) + prev.length, format.indexOf(value));
                }
                switch (value) {
                    case 'YY':
                        response += String(this.getFullYear()).slice(-2);
                        break;
                    case 'YYYY':
                        response += String(this.getFullYear());
                        break;
                    case 'M':
                        response += String(this.getMonth() + 1);
                        break;
                    case 'MM':
                        response += `0${this.getMonth() + 1}`.slice(-2);
                        break;
                    case 'MMM':
                        response += shortMonths[this.getMonth()];
                        break;
                    case 'MMMM':
                        response += longMonths[this.getMonth()];
                        break;
                    case 'D':
                        response += String(this.getDate());
                        break;
                    case 'DD':
                        response += `0${this.getDate()}`.slice(-2);
                        break;
                }
            }
        }
        return response;
    }
}
exports.DateTime = DateTime;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const litepicker_1 = __webpack_require__(/*! ./litepicker */ "./src/litepicker.ts");
exports.Litepicker = litepicker_1.Litepicker;
__webpack_require__(/*! ./methods */ "./src/methods.ts");


/***/ }),

/***/ "./src/litepicker.ts":
/*!***************************!*\
  !*** ./src/litepicker.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const calendar_1 = __webpack_require__(/*! ./calendar */ "./src/calendar.ts");
const datetime_1 = __webpack_require__(/*! ./datetime */ "./src/datetime.ts");
const style = __importStar(__webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss"));
class Litepicker extends calendar_1.Calendar {
    constructor(options) {
        super();
        this.options = Object.assign(Object.assign({}, this.options), options);
        if ((this.options.allowRepick && this.options.inlineMode)
            || !this.options.elementEnd) {
            this.options.allowRepick = false;
        }
        if (this.options.lockDays.length) {
            this.options.lockDays = datetime_1.DateTime.convertArray(this.options.lockDays, this.options.lockDaysFormat);
        }
        if (this.options.bookedDays.length) {
            this.options.bookedDays = datetime_1.DateTime.convertArray(this.options.bookedDays, this.options.bookedDaysFormat);
        }
        let [startValue, endValue] = this.parseInput();
        if (this.options.startDate) {
            if (this.options.singleMode || this.options.endDate) {
                startValue = new datetime_1.DateTime(this.options.startDate);
            }
        }
        if (startValue && this.options.endDate) {
            endValue = new datetime_1.DateTime(this.options.endDate);
        }
        if (startValue instanceof Date && !isNaN(startValue.getTime())) {
            this.options.startDate = new datetime_1.DateTime(startValue, this.options.format, this.options.lang);
        }
        if (this.options.startDate && endValue instanceof Date && !isNaN(endValue.getTime())) {
            this.options.endDate = new datetime_1.DateTime(endValue, this.options.format, this.options.lang);
        }
        for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
            const date = this.options.startDate
                ? this.options.startDate.clone()
                : new datetime_1.DateTime();
            date.setMonth(date.getMonth() + idx);
            this.calendars[idx] = date;
        }
        this.onInit();
    }
    onInit() {
        document.addEventListener('click', e => this.onClick(e), true);
        this.picker = document.createElement('div');
        this.picker.className = style.litepicker;
        this.picker.style.display = 'none';
        this.picker.addEventListener('keydown', e => this.onKeyDown(e), true);
        this.picker.addEventListener('mouseenter', e => this.onMouseEnter(e), true);
        this.picker.addEventListener('mouseleave', e => this.onMouseLeave(e), false);
        if (this.options.element instanceof HTMLElement) {
            this.options.element.addEventListener('change', e => this.onInput(e), true);
        }
        if (this.options.elementEnd instanceof HTMLElement) {
            this.options.elementEnd.addEventListener('change', e => this.onInput(e), true);
        }
        this.render();
        if (this.options.parentEl) {
            if (this.options.parentEl instanceof HTMLElement) {
                this.options.parentEl.appendChild(this.picker);
            }
            else {
                document.querySelector(this.options.parentEl).appendChild(this.picker);
            }
        }
        else {
            if (this.options.inlineMode) {
                if (this.options.element instanceof HTMLInputElement) {
                    this.options.element.parentNode.appendChild(this.picker);
                }
                else {
                    this.options.element.appendChild(this.picker);
                }
            }
            else {
                document.body.appendChild(this.picker);
            }
        }
        if (this.options.inlineMode) {
            this.show();
        }
        this.updateInput();
    }
    parseInput() {
        if (this.options.elementEnd) {
            if (this.options.element instanceof HTMLElement
                && this.options.element.value.length
                && this.options.elementEnd instanceof HTMLElement
                && this.options.elementEnd.value.length) {
                return [
                    new datetime_1.DateTime(this.options.element.value),
                    new datetime_1.DateTime(this.options.elementEnd.value),
                ];
            }
        }
        else if (this.options.singleMode) {
            if (this.options.element instanceof HTMLElement
                && this.options.element.value.length) {
                return [
                    new datetime_1.DateTime(this.options.element.value),
                ];
            }
        }
        else if (/\s\-\s/.test(this.options.element.value)) {
            const values = this.options.element.value.split(' - ');
            if (values.length === 2) {
                return [
                    new datetime_1.DateTime(values[0]),
                    new datetime_1.DateTime(values[1]),
                ];
            }
        }
        return [];
    }
    updateInput() {
        if (!(this.options.element instanceof HTMLInputElement))
            return;
        if (this.options.singleMode && this.options.startDate) {
            this.options.element.value = this.options.startDate
                .format(this.options.format, this.options.lang);
        }
        else if (!this.options.singleMode && this.options.startDate && this.options.endDate) {
            const startValue = this.options.startDate
                .format(this.options.format, this.options.lang);
            const endValue = this.options.endDate
                .format(this.options.format, this.options.lang);
            if (this.options.elementEnd) {
                this.options.element.value = startValue;
                this.options.elementEnd.value = endValue;
            }
            else {
                this.options.element.value = `${startValue} - ${endValue}`;
            }
        }
    }
    isSamePicker(el) {
        const picker = el.closest(`.${style.litepicker}`);
        return picker === this.picker;
    }
    shouldShown(el) {
        return el === this.options.element
            || (this.options.elementEnd && el === this.options.elementEnd);
    }
    shouldResetDatePicked() {
        return this.options.singleMode || this.datePicked.length === 2;
    }
    shouldSwapDatePicked() {
        return this.datePicked.length === 2
            && this.datePicked[0].getTime() > this.datePicked[1].getTime();
    }
    shouldCheckLockDays() {
        return this.options.disallowLockDaysInRange
            && this.options.lockDays.length
            && this.datePicked.length === 2;
    }
    onClick(e) {
        const target = e.target;
        if (!target || !this.picker) {
            return;
        }
        // Click on element
        if (this.shouldShown(target)) {
            this.show(target);
            return;
        }
        // Click outside picker
        if (!target.closest(`.${style.litepicker}`)) {
            this.hide();
            return;
        }
        // Click on date
        if (target.classList.contains(style.dayItem)) {
            e.preventDefault();
            if (!this.isSamePicker(target)) {
                return;
            }
            if (target.classList.contains(style.isLocked)) {
                return;
            }
            if (target.classList.contains(style.isBooked)) {
                return;
            }
            if (this.shouldResetDatePicked()) {
                this.datePicked.length = 0;
            }
            this.datePicked[this.datePicked.length] = new datetime_1.DateTime(target.dataset.time);
            if (this.shouldSwapDatePicked()) {
                const tempDate = this.datePicked[1].clone();
                this.datePicked[1] = this.datePicked[0].clone();
                this.datePicked[0] = tempDate.clone();
            }
            if (this.shouldCheckLockDays()) {
                const locked = this.options.lockDays
                    .filter((d) => {
                    if (d instanceof Array) {
                        return d[0].isBetween(this.datePicked[0], this.datePicked[1])
                            || d[1].isBetween(this.datePicked[0], this.datePicked[1]);
                    }
                    return d.isBetween(this.datePicked[0], this.datePicked[1]);
                }).length;
                if (locked) {
                    this.datePicked.length = 0;
                    if (typeof this.options.onError === 'function') {
                        this.options.onError.call(this, 'INVALID_RANGE');
                    }
                }
            }
            this.render();
            if (this.options.autoApply) {
                if (this.options.singleMode && this.datePicked.length) {
                    this.setDate(this.datePicked[0]);
                    this.hide();
                }
                else if (!this.options.singleMode && this.datePicked.length === 2) {
                    this.setDateRange(this.datePicked[0], this.datePicked[1]);
                    this.hide();
                }
            }
            return;
        }
        // Click on button previous month
        if (target.classList.contains(style.buttonPreviousMonth)) {
            e.preventDefault();
            if (!this.isSamePicker(target)) {
                return;
            }
            let idx = 0;
            let numberOfMonths = this.options.numberOfMonths;
            if (this.options.splitView) {
                const monthItem = target.closest(`.${style.monthItem}`);
                idx = [...monthItem.parentNode.childNodes].findIndex(el => el === monthItem);
                numberOfMonths = 1;
            }
            this.calendars[idx].setMonth(this.calendars[idx].getMonth() - numberOfMonths);
            this.gotoDate(this.calendars[idx], idx);
            if (typeof this.options.onChangeMonth === 'function') {
                this.options.onChangeMonth.call(this, this.calendars[idx], idx);
            }
            return;
        }
        // Click on button next month
        if (target.classList.contains(style.buttonNextMonth)) {
            e.preventDefault();
            if (!this.isSamePicker(target)) {
                return;
            }
            let idx = 0;
            let numberOfMonths = this.options.numberOfMonths;
            if (this.options.splitView) {
                const monthItem = target.closest(`.${style.monthItem}`);
                idx = [...monthItem.parentNode.childNodes].findIndex(el => el === monthItem);
                numberOfMonths = 1;
            }
            this.calendars[idx].setMonth(this.calendars[idx].getMonth() + numberOfMonths);
            this.gotoDate(this.calendars[idx], idx);
            if (typeof this.options.onChangeMonth === 'function') {
                this.options.onChangeMonth.call(this, this.calendars[idx], idx);
            }
            return;
        }
        // Click on button cancel
        if (target.classList.contains(style.buttonCancel)) {
            e.preventDefault();
            if (!this.isSamePicker(target)) {
                return;
            }
            this.hide();
        }
        // Click on button apple
        if (target.classList.contains(style.buttonApply)) {
            e.preventDefault();
            if (!this.isSamePicker(target)) {
                return;
            }
            if (this.options.singleMode && this.datePicked.length) {
                this.setDate(this.datePicked[0]);
            }
            else if (!this.options.singleMode && this.datePicked.length === 2) {
                this.setDateRange(this.datePicked[0], this.datePicked[1]);
            }
            this.hide();
        }
    }
    showTooltip(element, text) {
        const tooltip = this.picker.querySelector(`.${style.containerTooltip}`);
        tooltip.style.visibility = 'visible';
        tooltip.innerHTML = text;
        const pickerBCR = this.picker.getBoundingClientRect();
        const tooltipBCR = tooltip.getBoundingClientRect();
        const dayBCR = element.getBoundingClientRect();
        let top = dayBCR.top;
        let left = dayBCR.left;
        if (this.options.inlineMode && this.options.parentEl) {
            const parentBCR = this.picker.parentNode.getBoundingClientRect();
            top -= parentBCR.top;
            left -= parentBCR.left;
        }
        else {
            top -= pickerBCR.top;
            left -= pickerBCR.left;
        }
        // let top = dayR.top - pickerR.top - tooltipR.height;
        // let left = (dayR.left - pickerR.left) - (tooltipR.width / 2) + (dayR.width / 2);
        top -= tooltipBCR.height;
        left -= tooltipBCR.width / 2;
        left += dayBCR.width / 2;
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    hideTooltip() {
        const tooltip = this.picker.querySelector(`.${style.containerTooltip}`);
        tooltip.style.visibility = 'hidden';
    }
    shouldAllowMouseEnter(el) {
        return !this.options.singleMode
            && el.classList.contains(style.dayItem)
            && !el.classList.contains(style.isLocked)
            && !el.classList.contains(style.isBooked);
    }
    shouldAllowRepick() {
        return this.options.elementEnd
            && this.options.allowRepick
            && this.options.startDate
            && this.options.endDate;
    }
    onMouseEnter(event) {
        const target = event.target;
        if (this.shouldAllowMouseEnter(target)) {
            if (this.shouldAllowRepick()) {
                if (this.triggerElement === this.options.element) {
                    this.datePicked[0] = this.options.endDate.clone();
                }
                else {
                    this.datePicked[0] = this.options.startDate.clone();
                }
            }
            if (this.datePicked.length !== 1) {
                return;
            }
            const startDateElement = this.picker
                .querySelector(`.${style.dayItem}[data-time="${this.datePicked[0].getTime()}"]`);
            let date1 = this.datePicked[0].clone();
            let date2 = new datetime_1.DateTime(target.dataset.time);
            let isFlipped = false;
            if (date1.getTime() > date2.getTime()) {
                const tempDate = date1.clone();
                date1 = date2.clone();
                date2 = tempDate.clone();
                isFlipped = true;
            }
            [...this.picker.querySelectorAll(`.${style.dayItem}`)].forEach((d) => {
                const date = new datetime_1.DateTime(d.dataset.time);
                const day = this.renderDay(date);
                if (date.isBetween(date1, date2)) {
                    day.classList.add(style.isInRange);
                }
                d.className = day.className;
            });
            target.classList.add(style.isEndDate);
            if (isFlipped) {
                if (startDateElement) {
                    startDateElement.classList.add(style.isFlipped);
                }
                target.classList.add(style.isFlipped);
            }
            else {
                if (startDateElement) {
                    startDateElement.classList.remove(style.isFlipped);
                }
                target.classList.remove(style.isFlipped);
            }
            if (this.options.showTooltip) {
                const pr = new Intl.PluralRules(this.options.lang);
                let days = date2.diff(date1, 'day');
                if (!this.options.hotelMode) {
                    days += 1;
                }
                if (days > 0) {
                    const pluralName = pr.select(days);
                    const pluralText = this.options.tooltipText[pluralName]
                        ? this.options.tooltipText[pluralName]
                        : `[${pluralName}]`;
                    const text = `${days} ${pluralText}`;
                    this.showTooltip(target, text);
                }
                else {
                    this.hideTooltip();
                }
            }
        }
    }
    onMouseLeave(event) {
        const target = event.target;
        if (!this.options.allowRepick) {
            return;
        }
        this.datePicked.length = 0;
        this.render();
    }
    onKeyDown(event) {
        const target = event.target;
        switch (event.code) {
            case 'ArrowUp':
                if (target.classList.contains(style.dayItem)) {
                    event.preventDefault();
                    const idx = [...target.parentNode.childNodes].findIndex(el => el === target) - 7;
                    if (idx > 0 && target.parentNode.childNodes[idx]) {
                        target.parentNode.childNodes[idx].focus();
                    }
                }
                break;
            case 'ArrowLeft':
                if (target.classList.contains(style.dayItem) && target.previousSibling) {
                    event.preventDefault();
                    target.previousSibling.focus();
                }
                break;
            case 'ArrowRight':
                if (target.classList.contains(style.dayItem) && target.nextSibling) {
                    event.preventDefault();
                    target.nextSibling.focus();
                }
                break;
            case 'ArrowDown':
                if (target.classList.contains(style.dayItem)) {
                    event.preventDefault();
                    const idx = [...target.parentNode.childNodes].findIndex(el => el === target) + 7;
                    if (idx > 0 && target.parentNode.childNodes[idx]) {
                        target.parentNode.childNodes[idx].focus();
                    }
                }
                break;
        }
    }
    onInput(event) {
        let [startValue, endValue] = this.parseInput();
        if (startValue instanceof Date && !isNaN(startValue.getTime())
            && endValue instanceof Date && !isNaN(endValue.getTime())) {
            if (startValue.getTime() > endValue.getTime()) {
                const tempDate = startValue.clone();
                startValue = endValue.clone();
                endValue = tempDate.clone();
            }
            this.options.startDate = new datetime_1.DateTime(startValue, this.options.format, this.options.lang);
            if (this.options.startDate) {
                this.options.endDate = new datetime_1.DateTime(endValue, this.options.format, this.options.lang);
            }
            this.updateInput();
            this.render();
        }
    }
}
exports.Litepicker = Litepicker;


/***/ }),

/***/ "./src/methods.ts":
/*!************************!*\
  !*** ./src/methods.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const datetime_1 = __webpack_require__(/*! ./datetime */ "./src/datetime.ts");
const litepicker_1 = __webpack_require__(/*! ./litepicker */ "./src/litepicker.ts");
litepicker_1.Litepicker.prototype.show = function (el = null) {
    if (this.options.inlineMode) {
        this.picker.style.position = 'static';
        this.picker.style.display = 'inline-block';
        this.picker.style.top = null;
        this.picker.style.left = null;
        return;
    }
    if (this.options.scrollToDate) {
        if (this.options.startDate && (!el || el === this.options.element)) {
            this.calendars[0] = this.options.startDate.clone();
        }
        else if (el && this.options.endDate && el === this.options.elementEnd) {
            this.calendars[0] = this.options.endDate.clone();
        }
    }
    this.render();
    this.picker.style.position = 'absolute';
    this.picker.style.display = 'block';
    this.picker.style.zIndex = this.options.zIndex;
    const element = el ? el : this.options.element;
    const elBCR = element.getBoundingClientRect();
    const pickerBCR = this.picker.getBoundingClientRect();
    let top = elBCR.bottom;
    let left = elBCR.left;
    let scrollX = 0;
    let scrollY = 0;
    let topAlt = 0;
    let leftAlt = 0;
    if (this.options.parentEl) {
        const parentBCR = this.picker.parentNode.getBoundingClientRect();
        top -= parentBCR.bottom;
        top += elBCR.height;
        if (top + pickerBCR.height > window.innerHeight
            && (elBCR.top - parentBCR.top) - elBCR.height > 0) {
            topAlt = (elBCR.top - parentBCR.top) - elBCR.height;
        }
        left -= parentBCR.left;
        if (left + pickerBCR.width > window.innerWidth
            && (elBCR.right - parentBCR.right) - pickerBCR.width > 0) {
            leftAlt = (elBCR.right - parentBCR.right) - pickerBCR.width;
        }
    }
    else {
        scrollX = window.scrollX;
        scrollY = window.scrollY;
        if (top + pickerBCR.height > window.innerHeight
            && elBCR.top - pickerBCR.height > 0) {
            topAlt = elBCR.top - pickerBCR.height;
        }
        if (left + pickerBCR.width > window.innerWidth
            && elBCR.right - pickerBCR.width > 0) {
            leftAlt = elBCR.right - pickerBCR.width;
        }
    }
    this.picker.style.top = `${(topAlt ? topAlt : top) + scrollY}px`;
    this.picker.style.left = `${(leftAlt ? leftAlt : left) + scrollX}px`;
    if (typeof this.options.onShow === 'function') {
        this.options.onShow.call(this);
    }
    this.triggerElement = element;
};
litepicker_1.Litepicker.prototype.hide = function () {
    if (this.picker.style.display === 'none') {
        return;
    }
    this.datePicked.length = 0;
    this.updateInput();
    if (this.options.inlineMode) {
        this.render();
        return;
    }
    this.picker.style.display = 'none';
    if (typeof this.options.onHide === 'function') {
        this.options.onHide.call(this);
    }
};
litepicker_1.Litepicker.prototype.getDate = function () {
    return this.getStartDate();
};
litepicker_1.Litepicker.prototype.getStartDate = function () {
    if (this.options.startDate) {
        return this.options.startDate.clone();
    }
    return null;
};
litepicker_1.Litepicker.prototype.getEndDate = function () {
    if (this.options.endDate) {
        return this.options.endDate.clone();
    }
    return null;
};
litepicker_1.Litepicker.prototype.setDate = function (date) {
    this.setStartDate(date);
    if (typeof this.options.onSelect === 'function') {
        this.options.onSelect.call(this, this.getDate());
    }
};
litepicker_1.Litepicker.prototype.setStartDate = function (date) {
    if (!date)
        return;
    this.options.startDate = new datetime_1.DateTime(date, this.options.format, this.options.lang);
};
litepicker_1.Litepicker.prototype.setEndDate = function (date) {
    if (!date)
        return;
    if (this.options.startDate.getTime() > date.getTime()) {
        this.options.endDate = this.options.startDate.clone();
        this.options.startDate = new datetime_1.DateTime(date, this.options.format, this.options.lang);
    }
    else {
        this.options.endDate = new datetime_1.DateTime(date, this.options.format, this.options.lang);
    }
};
litepicker_1.Litepicker.prototype.setDateRange = function (date1, date2) {
    this.setStartDate(date1);
    this.setEndDate(date2);
    if (typeof this.options.onSelect === 'function') {
        this.options.onSelect.call(this, this.getStartDate(), this.getEndDate());
    }
};
litepicker_1.Litepicker.prototype.gotoDate = function (date, idx = 0) {
    this.calendars[idx] = new datetime_1.DateTime(date);
    this.render();
};
litepicker_1.Litepicker.prototype.setLockDays = function (array) {
    this.options.lockDays = datetime_1.DateTime.convertArray(array, this.options.lockDaysFormat);
    this.render();
};
litepicker_1.Litepicker.prototype.setBookedDays = function (array) {
    this.options.bookedDays = datetime_1.DateTime.convertArray(array, this.options.bookedDaysFormat);
    this.render();
};
litepicker_1.Litepicker.prototype.setOptions = function (options) {
    delete options.element;
    delete options.elementEnd;
    delete options.parentEl;
    if (options.startDate) {
        options.startDate = new datetime_1.DateTime(options.startDate, this.options.format, this.options.lang);
    }
    if (options.endDate) {
        options.endDate = new datetime_1.DateTime(options.endDate, this.options.format, this.options.lang);
    }
    this.options = Object.assign(Object.assign({}, this.options), options);
    for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
        const date = this.options.startDate
            ? this.options.startDate.clone()
            : new datetime_1.DateTime();
        date.setMonth(date.getMonth() + idx);
        this.calendars[idx] = date;
    }
    this.render();
    if (this.options.inlineMode) {
        this.show();
    }
    this.updateInput();
};
litepicker_1.Litepicker.prototype.destroy = function () {
    if (this.picker.parentNode) {
        this.picker.parentNode.removeChild(this.picker);
        this.picker = null;
    }
};


/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/dts-css-modules-loader??ref--5-1!../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../node_modules/postcss-loader/src??ref--5-3!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/dts-css-modules-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGVuZGFyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRldGltZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpdGVwaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvbWFpbi5zY3NzPzc5MDIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFdBQVcsS0FBSyxTQUFTO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGlCQUFpQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFz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O0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxxQkFBcUIsbUNBQW1DO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEtBLGNBQWMsbUJBQU8sQ0FBQyx1WkFBb087O0FBRTFQO0FBQ0EsY0FBYyxRQUFTO0FBQ3ZCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNKQUEyRTs7QUFFaEc7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwie1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW19pXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCIoXCIuY29uY2F0KGl0ZW1bMl0sIFwiKSBhbmQgKFwiKS5jb25jYXQobWVkaWFRdWVyeSwgXCIpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLWxpdGVwaWNrZXJCZ0NvbG9yOiAjZmZmO1xcbiAgLS1saXRlcGlja2VyTW9udGhCdXR0b246ICM5ZTllOWU7XFxuICAtLWxpdGVwaWNrZXJNb250aEJ1dHRvbkhvdmVyOiAjMjE5NmYzO1xcbiAgLS1saXRlcGlja2VyV2Vla2RheUNvbG9yOiAjOWU5ZTllO1xcbiAgLS1saXRlcGlja2VyRGF5Q29sb3I6ICMzMzM7XFxuICAtLWxpdGVwaWNrZXJEYXlDb2xvckhvdmVyOiAjMjE5NmYzO1xcbiAgLS1saXRlcGlja2VyRGF5SXNUb2RheUNvbG9yOiAjZjQ0MzM2O1xcbiAgLS1saXRlcGlja2VyRGF5SXNJblJhbmdlOiNiYmRlZmI7XFxuICAtLWxpdGVwaWNrZXJEYXlJc0xvY2tlZENvbG9yOiAjOWU5ZTllO1xcbiAgLS1saXRlcGlja2VyRGF5SXNCb29rZWRDb2xvcjogIzllOWU5ZTtcXG4gIC0tbGl0ZXBpY2tlckRheUlzU3RhcnRDb2xvcjogI2ZmZjtcXG4gIC0tbGl0ZXBpY2tlckRheUlzU3RhcnRCZzogIzIxOTZmMztcXG4gIC0tbGl0ZXBpY2tlckRheUlzRW5kQ29sb3I6ICNmZmY7XFxuICAtLWxpdGVwaWNrZXJEYXlJc0VuZEJnOiAjMjE5NmYzO1xcbiAgLS1saXRlcGlja2VyQnV0dG9uQ2FuY2VsQ29sb3I6ICNmZmY7XFxuICAtLWxpdGVwaWNrZXJCdXR0b25DYW5jZWxCZzogIzllOWU5ZTtcXG4gIC0tbGl0ZXBpY2tlckJ1dHRvbkFwcGx5Q29sb3I6ICNmZmY7XFxuICAtLWxpdGVwaWNrZXJCdXR0b25BcHBseUJnOiAjMjE5NmYzOyB9XFxuXFxuLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIHtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgQXJpYWwsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDAuOGVtO1xcbiAgZGlzcGxheTogbm9uZTsgfVxcbiAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpdGVwaWNrZXJCZ0NvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCA1cHggI2RkZDtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB4ICNkZGQ7IH1cXG4gICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUS5fM3lDZ255MW1idEw1VnZUTExvd3RGbyB7XFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTsgfVxcbiAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xR2FJV0RCNlFYZHJMS2QzejdOY0FRLnFEdGRhcmI0SVFXT25IcnN0dVRSVyB7XFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTsgfVxcbiAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xR2FJV0RCNlFYZHJMS2QzejdOY0FRLl8yQ2w3bkRQZE5Fak9Rd2JHV0JIYlRzIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpOyB9XFxuICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEuXzNRZl9IWXFRZWJjZ1lKMkQ2MUt0ZUYgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzFEalRucUtuNmNPeTE3Q2RwWUExT0IsXFxuICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEuXzNRZl9IWXFRZWJjZ1lKMkQ2MUt0ZUYgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzM4dDRNSXZ6X0Y4akxKcVhmZmNqeUIge1xcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cXG4gICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAub2psQm80cWdMWG5haTYzclN0OG1NIHtcXG4gICAgICBwYWRkaW5nOiA1cHggMDsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiB7XFxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIC13ZWJraXQtYm94LXBhY2s6IHNwYWNlLWV2ZW5seTtcXG4gICAgICAgICAgICAtbXMtZmxleC1wYWNrOiBzcGFjZS1ldmVubHk7XFxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgICAgIHBhZGRpbmc6IDEwcHggNXB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAgICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xR2FJV0RCNlFYZHJMS2QzejdOY0FRIC5Nb0ptbmg1OFZHMTZPY3lTVkZsVUogLl8xRGpUbnFLbjZjT3kxN0NkcFlBMU9CLFxcbiAgICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAuTW9KbW5oNThWRzE2T2N5U1ZGbFVKIC5fMzh0NE1JdnpfRjhqTEpxWGZmY2p5QiB7XFxuICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICAgICAgICBjb2xvcjogdmFyKC0tbGl0ZXBpY2tlck1vbnRoQnV0dG9uKTtcXG4gICAgICAgICAgcGFkZGluZzogM3B4IDVweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIDAuM3MsIGJvcmRlciAwLjNzO1xcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzLCBib3JkZXIgMC4zcztcXG4gICAgICAgICAgY3Vyc29yOiBkZWZhdWx0OyB9XFxuICAgICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzFEalRucUtuNmNPeTE3Q2RwWUExT0IgPiBzdmcsXFxuICAgICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzFEalRucUtuNmNPeTE3Q2RwWUExT0IgPiBpbWcsXFxuICAgICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzM4dDRNSXZ6X0Y4akxKcVhmZmNqeUIgPiBzdmcsXFxuICAgICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzM4dDRNSXZ6X0Y4akxKcVhmZmNqeUIgPiBpbWcge1xcbiAgICAgICAgICAgIGZpbGw6IHZhcigtLWxpdGVwaWNrZXJNb250aEJ1dHRvbik7XFxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG4gICAgICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAuTW9KbW5oNThWRzE2T2N5U1ZGbFVKIC5fMURqVG5xS242Y095MTdDZHBZQTFPQjpob3ZlcixcXG4gICAgICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAuTW9KbW5oNThWRzE2T2N5U1ZGbFVKIC5fMzh0NE1JdnpfRjhqTEpxWGZmY2p5Qjpob3ZlciB7XFxuICAgICAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJNb250aEJ1dHRvbkhvdmVyKTsgfVxcbiAgICAgICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLk1vSm1uaDU4VkcxNk9jeVNWRmxVSiAuXzFEalRucUtuNmNPeTE3Q2RwWUExT0I6aG92ZXIgPiBzdmcsXFxuICAgICAgICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAuTW9KbW5oNThWRzE2T2N5U1ZGbFVKIC5fMzh0NE1JdnpfRjhqTEpxWGZmY2p5Qjpob3ZlciA+IHN2ZyB7XFxuICAgICAgICAgICAgICBmaWxsOiB2YXIoLS1saXRlcGlja2VyTW9udGhCdXR0b25Ib3Zlcik7IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xR2FJV0RCNlFYZHJMS2QzejdOY0FRIC5fM1JOSEhOVUdoUS1OcGJMcm5WRGE4cyB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gICAgICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJXZWVrZGF5Q29sb3IpO1xcbiAgICAgICAgcGFkZGluZzogMCA1cHg7IH1cXG4gICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLl8zUk5ISE5VR2hRLU5wYkxyblZEYThzID4gZGl2IHtcXG4gICAgICAgICAgcGFkZGluZzogNXB4O1xcbiAgICAgICAgICBmb250LXNpemU6IDg1JTsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLm9qbEJvNHFnTFhuYWk2M3JTdDhtTTpmaXJzdC1jaGlsZCAuXzFEalRucUtuNmNPeTE3Q2RwWUExT0Ige1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLm9qbEJvNHFnTFhuYWk2M3JTdDhtTTpsYXN0LWNoaWxkIC5fMzh0NE1JdnpfRjhqTEpxWGZmY2p5QiB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XFxuICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMUdhSVdEQjZRWGRyTEtkM3o3TmNBUSAub2psQm80cWdMWG5haTYzclN0OG1NLl8yNWJpdUxnNjlNQ25tVjZKOGZxS0Q0IC5fMURqVG5xS242Y095MTdDZHBZQTFPQiB7XFxuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xR2FJV0RCNlFYZHJMS2QzejdOY0FRIC5vamxCbzRxZ0xYbmFpNjNyU3Q4bU0uXzJrWGtKcHo3SWVNOWE3Z1RYQV9QQ28gLl8zOHQ0TUl2el9GOGpMSnFYZmZjanlCIHtcXG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLm9qbEJvNHFnTFhuYWk2M3JTdDhtTS5VeDVGNnFURjZaR0V4bzI3NnhuZHcgLl8zUk5ISE5VR2hRLU5wYkxyblZEYThzLFxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFHYUlXREI2UVhkckxLZDN6N05jQVEgLm9qbEJvNHFnTFhuYWk2M3JTdDhtTS5VeDVGNnFURjZaR0V4bzI3NnhuZHcgLl8xZTNqdTJDQVM1WlRUYUVPdmF4NW5zIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7IH1cXG4gIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDAgNXB4OyB9XFxuICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2IHtcXG4gICAgICBjb2xvcjogdmFyKC0tbGl0ZXBpY2tlckRheUNvbG9yKTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDVweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAwLjNzLCBib3JkZXIgMC4zcztcXG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzLCBib3JkZXIgMC4zcztcXG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xZTNqdTJDQVM1WlRUYUVPdmF4NW5zIC5fMnNwQlZVVkVXWDAzTGZMOWQyZHVRNjpob3ZlciB7XFxuICAgICAgICBjb2xvcjogdmFyKC0tbGl0ZXBpY2tlckRheUNvbG9ySG92ZXIpO1xcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggdmFyKC0tbGl0ZXBpY2tlckRheUNvbG9ySG92ZXIpO1xcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggdmFyKC0tbGl0ZXBpY2tlckRheUNvbG9ySG92ZXIpOyB9XFxuICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMWUzanUyQ0FTNVpUVGFFT3ZheDVucyAuXzJzcEJWVVZFV1gwM0xmTDlkMmR1UTYuXzJ4X3c3NG9rWjlOd0NjUElzcHp1NEcge1xcbiAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc1RvZGF5Q29sb3IpOyB9XFxuICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMWUzanUyQ0FTNVpUVGFFT3ZheDVucyAuXzJzcEJWVVZFV1gwM0xmTDlkMmR1UTYuXzJDZ3V6b012aXR4ZEZrU2ZhV094Zk8ge1xcbiAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc0xvY2tlZENvbG9yKTtcXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuICAgICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xZTNqdTJDQVM1WlRUYUVPdmF4NW5zIC5fMnNwQlZVVkVXWDAzTGZMOWQyZHVRNi5fMkNndXpvTXZpdHhkRmtTZmFXT3hmTzpob3ZlciB7XFxuICAgICAgICAgIGNvbG9yOiB2YXIoLS1saXRlcGlja2VyRGF5SXNMb2NrZWRDb2xvcik7XFxuICAgICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8xZTNqdTJDQVM1WlRUYUVPdmF4NW5zIC5fMnNwQlZVVkVXWDAzTGZMOWQyZHVRNi5fMm1kTm5wQ2tUWlJnX0h6a19GbUtyaSB7XFxuICAgICAgICBjb2xvcjogdmFyKC0tbGl0ZXBpY2tlckRheUlzQm9va2VkQ29sb3IpO1xcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG4gICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2Ll8ybWRObnBDa1RaUmdfSHprX0ZtS3JpOmhvdmVyIHtcXG4gICAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc0Jvb2tlZENvbG9yKTtcXG4gICAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2Ll8yR3dISmlLaEJUNURfVGFfaTdZenhIIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc0luUmFuZ2UpO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2Ll8xTWVSNjB4U1JGby0xaWNRZlhSUldEIHtcXG4gICAgICAgIGNvbG9yOiB2YXIoLS1saXRlcGlja2VyRGF5SXNTdGFydENvbG9yKTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc1N0YXJ0QmcpO1xcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDsgfVxcbiAgICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMWUzanUyQ0FTNVpUVGFFT3ZheDVucyAuXzJzcEJWVVZFV1gwM0xmTDlkMmR1UTYuXzFNZVI2MHhTUkZvLTFpY1FmWFJSV0QuXzJGajdoUWQ5MmlCTW9YMmZWbDRWeWYge1xcbiAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbiAgICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4OyB9XFxuICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMWUzanUyQ0FTNVpUVGFFT3ZheDVucyAuXzJzcEJWVVZFV1gwM0xmTDlkMmR1UTYuXzEzZUN4R3RHUktscll4TDBPMGoyUncge1xcbiAgICAgICAgY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc0VuZENvbG9yKTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpdGVwaWNrZXJEYXlJc0VuZEJnKTtcXG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XFxuICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7IH1cXG4gICAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2Ll8xM2VDeEd0R1JLbHJZeEwwTzBqMlJ3Ll8yRmo3aFFkOTJpQk1vWDJmVmw0VnlmIHtcXG4gICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xcbiAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDsgfVxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yc3BCVlVWRVdYMDNMZkw5ZDJkdVE2Ll8xTWVSNjB4U1JGby0xaWNRZlhSUldELl8xM2VDeEd0R1JLbHJZeEwwTzBqMlJ3IHtcXG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4OyB9XFxuICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzFlM2p1MkNBUzVaVFRhRU92YXg1bnMgLl8yOC1xUjJYQzlHZjQ1S3lYWkwwQU1GIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgY29sb3I6ICM5ZTllOWU7XFxuICAgICAgZm9udC1zaXplOiA4NSU7IH1cXG4gIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzJlakplbk56aE5MVzBIV1p6LTFiVVUge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgcGFkZGluZzogMTBweCA1cHg7XFxuICAgIG1hcmdpbjogMCA1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMHB4IDNweCAzcHggMHB4ICNkZGQ7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDNweCAzcHggMHB4ICNkZGQ7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDsgfVxcbiAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8yZWpKZW5OemhOTFcwSFdaei0xYlVVIC5fMzNqY3lyTlEwVG5FUkdGM2FDaGE3aSB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogOTAlOyB9XFxuICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzJlakplbk56aE5MVzBIV1p6LTFiVVUgLm5zNlNNeS1kZWFnWHEwMkt4ZXhFYyB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGl0ZXBpY2tlckJ1dHRvbkNhbmNlbEJnKTtcXG4gICAgICBjb2xvcjogdmFyKC0tbGl0ZXBpY2tlckJ1dHRvbkNhbmNlbENvbG9yKTtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgcGFkZGluZzogM3B4IDdweCA0cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogM3B4OyB9XFxuICAgICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMmVqSmVuTnpoTkxXMEhXWnotMWJVVSAubnM2U015LWRlYWdYcTAyS3hleEVjID4gc3ZnLFxcbiAgICAgIC5fMUhuM1hLNXpDTWRWMTgzLVFtSmlNYyAuXzJlakplbk56aE5MVzBIV1p6LTFiVVUgLm5zNlNNeS1kZWFnWHEwMkt4ZXhFYyA+IGltZyB7XFxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcbiAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8yZWpKZW5OemhOTFcwSFdaei0xYlVVIC5fM1dwQ0luZTJwUzZwQjlvUmxyUUxodyB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGl0ZXBpY2tlckJ1dHRvbkFwcGx5QmcpO1xcbiAgICAgIGNvbG9yOiB2YXIoLS1saXRlcGlja2VyQnV0dG9uQXBwbHlDb2xvcik7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIHBhZGRpbmc6IDNweCA3cHggNHB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgICBtYXJnaW4tbGVmdDogMTBweDtcXG4gICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8yZWpKZW5OemhOTFcwSFdaei0xYlVVIC5fM1dwQ0luZTJwUzZwQjlvUmxyUUxodzpkaXNhYmxlZCB7XFxuICAgICAgICBvcGFjaXR5OiAwLjc7IH1cXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8yZWpKZW5OemhOTFcwSFdaei0xYlVVIC5fM1dwQ0luZTJwUzZwQjlvUmxyUUxodyA+IHN2ZyxcXG4gICAgICAuXzFIbjNYSzV6Q01kVjE4My1RbUppTWMgLl8yZWpKZW5OemhOTFcwSFdaei0xYlVVIC5fM1dwQ0luZTJwUzZwQjlvUmxyUUxodyA+IGltZyB7XFxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcbiAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMmQ3aGtUNTgxQ2NZMTF0NHRWNThibSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWFyZ2luLXRvcDogLTRweDtcXG4gICAgcGFkZGluZzogNHB4IDhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBmb250LXNpemU6IDExcHg7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH1cXG4gICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMmQ3aGtUNTgxQ2NZMTF0NHRWNThibTpiZWZvcmUge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBib3R0b206IC01cHg7XFxuICAgICAgbGVmdDogY2FsYyg1MCUgLSA1cHgpO1xcbiAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgY29udGVudDogXFxcIlxcXCI7IH1cXG4gICAgLl8xSG4zWEs1ekNNZFYxODMtUW1KaU1jIC5fMmQ3aGtUNTgxQ2NZMTF0NHRWNThibTphZnRlciB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGJvdHRvbTogLTRweDtcXG4gICAgICBsZWZ0OiBjYWxjKDUwJSAtIDRweCk7XFxuICAgICAgYm9yZGVyLXRvcDogNHB4IHNvbGlkICNmZmY7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjsgfVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJsaXRlcGlja2VyXCI6IFwiXzFIbjNYSzV6Q01kVjE4My1RbUppTWNcIixcblx0XCJjb250YWluZXJNb250aHNcIjogXCJfMUdhSVdEQjZRWGRyTEtkM3o3TmNBUVwiLFxuXHRcImNvbHVtbnMyXCI6IFwiXzN5Q2dueTFtYnRMNVZ2VExMb3d0Rm9cIixcblx0XCJjb2x1bW5zM1wiOiBcInFEdGRhcmI0SVFXT25IcnN0dVRSV1wiLFxuXHRcImNvbHVtbnM0XCI6IFwiXzJDbDduRFBkTkVqT1F3YkdXQkhiVHNcIixcblx0XCJzcGxpdFZpZXdcIjogXCJfM1FmX0hZcVFlYmNnWUoyRDYxS3RlRlwiLFxuXHRcIm1vbnRoSXRlbUhlYWRlclwiOiBcIk1vSm1uaDU4VkcxNk9jeVNWRmxVSlwiLFxuXHRcImJ1dHRvblByZXZpb3VzTW9udGhcIjogXCJfMURqVG5xS242Y095MTdDZHBZQTFPQlwiLFxuXHRcImJ1dHRvbk5leHRNb250aFwiOiBcIl8zOHQ0TUl2el9GOGpMSnFYZmZjanlCXCIsXG5cdFwibW9udGhJdGVtXCI6IFwib2psQm80cWdMWG5haTYzclN0OG1NXCIsXG5cdFwibW9udGhJdGVtV2Vla2RheXNSb3dcIjogXCJfM1JOSEhOVUdoUS1OcGJMcm5WRGE4c1wiLFxuXHRcIm5vUHJldmlvdXNNb250aFwiOiBcIl8yNWJpdUxnNjlNQ25tVjZKOGZxS0Q0XCIsXG5cdFwibm9OZXh0TW9udGhcIjogXCJfMmtYa0pwejdJZU05YTdnVFhBX1BDb1wiLFxuXHRcInNob3dXZWVrTnVtYmVyc1wiOiBcIlV4NUY2cVRGNlpHRXhvMjc2eG5kd1wiLFxuXHRcImNvbnRhaW5lckRheXNcIjogXCJfMWUzanUyQ0FTNVpUVGFFT3ZheDVuc1wiLFxuXHRcImRheUl0ZW1cIjogXCJfMnNwQlZVVkVXWDAzTGZMOWQyZHVRNlwiLFxuXHRcImlzVG9kYXlcIjogXCJfMnhfdzc0b2taOU53Q2NQSXNwenU0R1wiLFxuXHRcImlzTG9ja2VkXCI6IFwiXzJDZ3V6b012aXR4ZEZrU2ZhV094Zk9cIixcblx0XCJpc0Jvb2tlZFwiOiBcIl8ybWRObnBDa1RaUmdfSHprX0ZtS3JpXCIsXG5cdFwiaXNJblJhbmdlXCI6IFwiXzJHd0hKaUtoQlQ1RF9UYV9pN1l6eEhcIixcblx0XCJpc1N0YXJ0RGF0ZVwiOiBcIl8xTWVSNjB4U1JGby0xaWNRZlhSUldEXCIsXG5cdFwiaXNGbGlwcGVkXCI6IFwiXzJGajdoUWQ5MmlCTW9YMmZWbDRWeWZcIixcblx0XCJpc0VuZERhdGVcIjogXCJfMTNlQ3hHdEdSS2xyWXhMME8wajJSd1wiLFxuXHRcIndlZWtOdW1iZXJcIjogXCJfMjgtcVIyWEM5R2Y0NUt5WFpMMEFNRlwiLFxuXHRcImNvbnRhaW5lckZvb3RlclwiOiBcIl8yZWpKZW5OemhOTFcwSFdaei0xYlVVXCIsXG5cdFwicHJldmlld0RhdGVSYW5nZVwiOiBcIl8zM2pjeXJOUTBUbkVSR0YzYUNoYTdpXCIsXG5cdFwiYnV0dG9uQ2FuY2VsXCI6IFwibnM2U015LWRlYWdYcTAyS3hleEVjXCIsXG5cdFwiYnV0dG9uQXBwbHlcIjogXCJfM1dwQ0luZTJwUzZwQjlvUmxyUUxod1wiLFxuXHRcImNvbnRhaW5lclRvb2x0aXBcIjogXCJfMmQ3aGtUNTgxQ2NZMTF0NHRWNThibVwiXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZXMgPSBbXTtcbiAgdmFyIG5ld1N0eWxlcyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY3NzID0gaXRlbVsxXTtcbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdO1xuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH07XG5cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcGFydHM6IFtwYXJ0XVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXTtcbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcbiAgICB2YXIgaiA9IDA7XG5cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrKztcblxuICAgICAgZm9yICg7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtcbiAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgIHJlZnM6IDEsXG4gICAgICAgIHBhcnRzOiBwYXJ0c1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBvcHRpb25zLmF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhvcHRpb25zLmF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIG9wdGlvbnMuYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLmF0dHJpYnV0ZXMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAnb2JqZWN0JyA/IG9wdGlvbnMuYXR0cmlidXRlcyA6IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXTtcbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG4gICAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgICAgZG9tU3R5bGUucmVmcy0tO1xuICAgICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgICBhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtYXlSZW1vdmUubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2RvbVN0eWxlID0gbWF5UmVtb3ZlW19pXTtcblxuICAgICAgaWYgKF9kb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2RvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgX2RvbVN0eWxlLnBhcnRzW2pdKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bX2RvbVN0eWxlLmlkXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGF0ZXRpbWVfMSA9IHJlcXVpcmUoXCIuL2RhdGV0aW1lXCIpO1xuY29uc3Qgc3R5bGUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc2Nzcy9tYWluLnNjc3NcIikpO1xuY2xhc3MgQ2FsZW5kYXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgZWxlbWVudEVuZDogbnVsbCxcbiAgICAgICAgICAgIHBhcmVudEVsOiBudWxsLFxuICAgICAgICAgICAgZmlyc3REYXk6IDEsXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREJyxcbiAgICAgICAgICAgIGxhbmc6ICdlbi1VUycsXG4gICAgICAgICAgICBudW1iZXJPZk1vbnRoczogMSxcbiAgICAgICAgICAgIG51bWJlck9mQ29sdW1uczogMSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcbiAgICAgICAgICAgIGVuZERhdGU6IG51bGwsXG4gICAgICAgICAgICB6SW5kZXg6IDk5OTksXG4gICAgICAgICAgICBtaW5EYXRlOiBudWxsLFxuICAgICAgICAgICAgbWF4RGF0ZTogbnVsbCxcbiAgICAgICAgICAgIG1pbkRheXM6IG51bGwsXG4gICAgICAgICAgICBtYXhEYXlzOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0Rm9yd2FyZDogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RCYWNrd2FyZDogZmFsc2UsXG4gICAgICAgICAgICBzcGxpdFZpZXc6IGZhbHNlLFxuICAgICAgICAgICAgaW5saW5lTW9kZTogZmFsc2UsXG4gICAgICAgICAgICBzaW5nbGVNb2RlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0FwcGx5OiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dSZXBpY2s6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXJzOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dUb29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgaG90ZWxNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIGRpc2FibGVXZWVrZW5kczogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxUb0RhdGU6IHRydWUsXG4gICAgICAgICAgICBsb2NrRGF5c0Zvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICAgICAgbG9ja0RheXM6IFtdLFxuICAgICAgICAgICAgZGlzYWxsb3dMb2NrRGF5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgYm9va2VkRGF5c0Zvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICAgICAgYm9va2VkRGF5czogW10sXG4gICAgICAgICAgICBidXR0b25UZXh0OiB7XG4gICAgICAgICAgICAgICAgYXBwbHk6ICdBcHBseScsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgICAgICBwcmV2aW91c01vbnRoOiAnPHN2ZyB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiMTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk03LjkxOSAwbDIuNzQ4IDIuNjY3TDUuMzMzIDhsNS4zMzQgNS4zMzNMNy45MTkgMTYgMCA4elwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIi8+PC9zdmc+JyxcbiAgICAgICAgICAgICAgICBuZXh0TW9udGg6ICc8c3ZnIHdpZHRoPVwiMTFcIiBoZWlnaHQ9XCIxNlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIuNzQ4IDE2TDAgMTMuMzMzIDUuMzMzIDggMCAyLjY2NyAyLjc0OCAwbDcuOTE5IDh6XCIgZmlsbC1ydWxlPVwibm9uemVyb1wiLz48L3N2Zz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXBUZXh0OiB7XG4gICAgICAgICAgICAgICAgb25lOiAnZGF5JyxcbiAgICAgICAgICAgICAgICBvdGhlcjogJ2RheXMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIEV2ZW50c1xuICAgICAgICAgICAgb25TaG93OiBudWxsLFxuICAgICAgICAgICAgb25IaWRlOiBudWxsLFxuICAgICAgICAgICAgb25TZWxlY3Q6IG51bGwsXG4gICAgICAgICAgICBvbkVycm9yOiBudWxsLFxuICAgICAgICAgICAgb25DaGFuZ2VNb250aDogbnVsbCxcbiAgICAgICAgICAgIG9uQ2hhbmdlWWVhcjogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWxlbmRhcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VkID0gW107XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgbW9udGhzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1vbnRocy5jbGFzc05hbWUgPSBzdHlsZS5jb250YWluZXJNb250aHM7XG4gICAgICAgIGlmIChzdHlsZVtgY29sdW1ucyR7dGhpcy5vcHRpb25zLm51bWJlck9mQ29sdW1uc31gXSkge1xuICAgICAgICAgICAgbW9udGhzLmNsYXNzTGlzdC5hZGQoc3R5bGVbYGNvbHVtbnMke3RoaXMub3B0aW9ucy5udW1iZXJPZkNvbHVtbnN9YF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3BsaXRWaWV3KSB7XG4gICAgICAgICAgICBtb250aHMuY2xhc3NMaXN0LmFkZChzdHlsZS5zcGxpdFZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuY2FsZW5kYXJzWzBdLmNsb25lKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0TW9udGhJZHggPSBzdGFydERhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgdG90YWxNb250aHMgPSBzdGFydERhdGUuZ2V0TW9udGgoKSArIHRoaXMub3B0aW9ucy5udW1iZXJPZk1vbnRocztcbiAgICAgICAgbGV0IGNhbGVuZGFySWR4ID0gMDtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGlkeCA9IHN0YXJ0TW9udGhJZHg7IGlkeCA8IHRvdGFsTW9udGhzOyBpZHggKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRhdGVJdGVyYXRvciA9IHN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zcGxpdFZpZXcpIHtcbiAgICAgICAgICAgICAgICBkYXRlSXRlcmF0b3IgPSB0aGlzLmNhbGVuZGFyc1tjYWxlbmRhcklkeF0uY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGVJdGVyYXRvci5zZXRNb250aChpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9udGhzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyTW9udGgoZGF0ZUl0ZXJhdG9yKSk7XG4gICAgICAgICAgICBjYWxlbmRhcklkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGlja2VyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnBpY2tlci5hcHBlbmRDaGlsZChtb250aHMpO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdXRvQXBwbHkgfHwgdGhpcy5vcHRpb25zLmZvb3RlckhUTUwpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyRm9vdGVyKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd1Rvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyVG9vbHRpcCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJNb250aChkYXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IGRhdGUuY2xvbmUoKTtcbiAgICAgICAgc3RhcnREYXRlLnNldERhdGUoMSk7XG4gICAgICAgIGNvbnN0IHRvdGFsRGF5cyA9IDMyIC0gbmV3IERhdGUoc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIHN0YXJ0RGF0ZS5nZXRNb250aCgpLCAzMikuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBtb250aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtb250aC5jbGFzc05hbWUgPSBzdHlsZS5tb250aEl0ZW07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd1dlZWtOdW1iZXJzKSB7XG4gICAgICAgICAgICBtb250aC5jbGFzc0xpc3QuYWRkKHN0eWxlLnNob3dXZWVrTnVtYmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGhIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbW9udGhIZWFkZXIuY2xhc3NOYW1lID0gc3R5bGUubW9udGhJdGVtSGVhZGVyO1xuICAgICAgICBtb250aEhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiJHtzdHlsZS5idXR0b25QcmV2aW91c01vbnRofVwiPiR7dGhpcy5vcHRpb25zLmJ1dHRvblRleHQucHJldmlvdXNNb250aH08L2E+XG4gICAgICA8ZGl2PlxuICAgICAgICA8c3Ryb25nPiR7ZGF0ZS50b0xvY2FsZVN0cmluZyh0aGlzLm9wdGlvbnMubGFuZywgeyBtb250aDogJ2xvbmcnIH0pfTwvc3Ryb25nPlxuICAgICAgICAke2RhdGUuZ2V0RnVsbFllYXIoKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIiR7c3R5bGUuYnV0dG9uTmV4dE1vbnRofVwiPiR7dGhpcy5vcHRpb25zLmJ1dHRvblRleHQubmV4dE1vbnRofTwvYT5cbiAgICBgO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1pbkRhdGVcbiAgICAgICAgICAgICYmIHN0YXJ0RGF0ZS5pc1NhbWVPckJlZm9yZShuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZSh0aGlzLm9wdGlvbnMubWluRGF0ZSksICdtb250aCcpKSB7XG4gICAgICAgICAgICBtb250aC5jbGFzc0xpc3QuYWRkKHN0eWxlLm5vUHJldmlvdXNNb250aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tYXhEYXRlXG4gICAgICAgICAgICAmJiBzdGFydERhdGUuaXNTYW1lT3JBZnRlcihuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZSh0aGlzLm9wdGlvbnMubWF4RGF0ZSksICdtb250aCcpKSB7XG4gICAgICAgICAgICBtb250aC5jbGFzc0xpc3QuYWRkKHN0eWxlLm5vTmV4dE1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3ZWVrZGF5c1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB3ZWVrZGF5c1Jvdy5jbGFzc05hbWUgPSBzdHlsZS5tb250aEl0ZW1XZWVrZGF5c1JvdztcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93V2Vla051bWJlcnMpIHtcbiAgICAgICAgICAgIHdlZWtkYXlzUm93LmlubmVySFRNTCA9ICc8ZGl2Plc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHcgPSAxOyB3IDw9IDc7IHcgKz0gMSkge1xuICAgICAgICAgICAgLy8gNyBkYXlzLCA0IGlzIMKrVGh1cnNkYXnCuyAobmV3IERhdGUoMTk3MCwgMCwgMSwgMTIsIDAsIDAsIDApKVxuICAgICAgICAgICAgY29uc3QgZGF5SWR4ID0gNyAtIDQgKyB0aGlzLm9wdGlvbnMuZmlyc3REYXkgKyB3O1xuICAgICAgICAgICAgY29uc3Qgd2Vla2RheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgd2Vla2RheS5pbm5lckhUTUwgPSB0aGlzLndlZWtkYXlOYW1lKGRheUlkeCk7XG4gICAgICAgICAgICB3ZWVrZGF5LnRpdGxlID0gdGhpcy53ZWVrZGF5TmFtZShkYXlJZHgsICdsb25nJyk7XG4gICAgICAgICAgICB3ZWVrZGF5c1Jvdy5hcHBlbmRDaGlsZCh3ZWVrZGF5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXlzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRheXMuY2xhc3NOYW1lID0gc3R5bGUuY29udGFpbmVyRGF5cztcbiAgICAgICAgY29uc3Qgc2tpcERheXMgPSB0aGlzLmNhbGNTa2lwRGF5cyhzdGFydERhdGUpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dXZWVrTnVtYmVycyAmJiBza2lwRGF5cykge1xuICAgICAgICAgICAgZGF5cy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcldlZWtOdW1iZXIoc3RhcnREYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2tpcERheXM7IGlkeCArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBkdW1teSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGF5cy5hcHBlbmRDaGlsZChkdW1teSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8PSB0b3RhbERheXM7IGlkeCArPSAxKSB7XG4gICAgICAgICAgICBzdGFydERhdGUuc2V0RGF0ZShpZHgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93V2Vla051bWJlcnMgJiYgc3RhcnREYXRlLmdldERheSgpID09PSB0aGlzLm9wdGlvbnMuZmlyc3REYXkpIHtcbiAgICAgICAgICAgICAgICBkYXlzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyV2Vla051bWJlcihzdGFydERhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRheXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJEYXkoc3RhcnREYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbW9udGguYXBwZW5kQ2hpbGQobW9udGhIZWFkZXIpO1xuICAgICAgICBtb250aC5hcHBlbmRDaGlsZCh3ZWVrZGF5c1Jvdyk7XG4gICAgICAgIG1vbnRoLmFwcGVuZENoaWxkKGRheXMpO1xuICAgICAgICByZXR1cm4gbW9udGg7XG4gICAgfVxuICAgIHJlbmRlckRheShkYXRlKSB7XG4gICAgICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZGF5LmhyZWYgPSAnIyc7XG4gICAgICAgIGRheS5jbGFzc05hbWUgPSBzdHlsZS5kYXlJdGVtO1xuICAgICAgICBkYXkuaW5uZXJIVE1MID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgZGF5LmRhdGFzZXQudGltZSA9IFN0cmluZyhkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIGlmIChkYXRlLnRvRGF0ZVN0cmluZygpID09PSAobmV3IERhdGUoKSkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzVG9kYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VkWzBdLnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNTdGFydERhdGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0VuZERhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZWQubGVuZ3RoID09PSAyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5kYXRlUGlja2VkWzFdLnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNFbmREYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZWQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNCZXR3ZWVuKHRoaXMuZGF0ZVBpY2tlZFswXSwgdGhpcy5kYXRlUGlja2VkWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0luUmFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzU3RhcnREYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNFbmREYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVuZERhdGUgJiYgdGhpcy5vcHRpb25zLmVuZERhdGUudG9EYXRlU3RyaW5nKCkgPT09IGRhdGUudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0VuZERhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdGFydERhdGUgJiYgdGhpcy5vcHRpb25zLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc0JldHdlZW4odGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSwgdGhpcy5vcHRpb25zLmVuZERhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzSW5SYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWluRGF0ZSAmJiBkYXRlLmlzQmVmb3JlKG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHRoaXMub3B0aW9ucy5taW5EYXRlKSkpIHtcbiAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzTG9ja2VkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1heERhdGUgJiYgZGF0ZS5pc0FmdGVyKG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHRoaXMub3B0aW9ucy5tYXhEYXRlKSkpIHtcbiAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzTG9ja2VkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1pbkRheXNcbiAgICAgICAgICAgICYmIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLmRhdGVQaWNrZWRbMF0uY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLm9wdGlvbnMubWluRGF5cywgJ2RheScpO1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmRhdGVQaWNrZWRbMF0uY2xvbmUoKS5hZGQodGhpcy5vcHRpb25zLm1pbkRheXMsICdkYXknKTtcbiAgICAgICAgICAgIGlmIChkYXRlLmlzQmV0d2VlbihsZWZ0LCB0aGlzLmRhdGVQaWNrZWRbMF0sICcoXScpKSB7XG4gICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNMb2NrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGUuaXNCZXR3ZWVuKHRoaXMuZGF0ZVBpY2tlZFswXSwgcmlnaHQsICdbKScpKSB7XG4gICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNMb2NrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RGF5c1xuICAgICAgICAgICAgJiYgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpLnN1YnRyYWN0KHRoaXMub3B0aW9ucy5tYXhEYXlzLCAnZGF5Jyk7XG4gICAgICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpLmFkZCh0aGlzLm9wdGlvbnMubWF4RGF5cywgJ2RheScpO1xuICAgICAgICAgICAgaWYgKGRhdGUuaXNCZWZvcmUobGVmdCkpIHtcbiAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0xvY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0ZS5pc0FmdGVyKHJpZ2h0KSkge1xuICAgICAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzTG9ja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNlbGVjdEZvcndhcmRcbiAgICAgICAgICAgICYmIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGRhdGUuaXNCZWZvcmUodGhpcy5kYXRlUGlja2VkWzBdKSkge1xuICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoc3R5bGUuaXNMb2NrZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2VsZWN0QmFja3dhcmRcbiAgICAgICAgICAgICYmIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIGRhdGUuaXNBZnRlcih0aGlzLmRhdGVQaWNrZWRbMF0pKSB7XG4gICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0xvY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2NrRGF5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2tlZCA9IHRoaXMub3B0aW9ucy5sb2NrRGF5c1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmlzQmV0d2VlbihkWzBdLCBkWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgICAgICAgICAgIH0pLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0xvY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPD0gMVxuICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLmJvb2tlZERheXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NrZWQgPSB0aGlzLm9wdGlvbnMuYm9va2VkRGF5c1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmlzQmV0d2VlbihkWzBdLCBkWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgICAgICAgICAgIH0pLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGlzQmVmb3JlID0gdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgIHx8IGRhdGUuaXNCZWZvcmUodGhpcy5kYXRlUGlja2VkWzBdKTtcbiAgICAgICAgICAgIGlmIChsb2NrZWQgJiYgaXNCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0Jvb2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlV2Vla2VuZHNcbiAgICAgICAgICAgICYmIChkYXRlLmdldERheSgpID09PSA2IHx8IGRhdGUuZ2V0RGF5KCkgPT09IDApKSB7XG4gICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0xvY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRheTtcbiAgICB9XG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9vdGVyLmNsYXNzTmFtZSA9IHN0eWxlLmNvbnRhaW5lckZvb3RlcjtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb290ZXJIVE1MKSB7XG4gICAgICAgICAgICBmb290ZXIuaW5uZXJIVE1MID0gdGhpcy5vcHRpb25zLmZvb3RlckhUTUw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb290ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCIke3N0eWxlLnByZXZpZXdEYXRlUmFuZ2V9XCI+PC9zcGFuPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N0eWxlLmJ1dHRvbkNhbmNlbH1cIj4ke3RoaXMub3B0aW9ucy5idXR0b25UZXh0LmNhbmNlbH08L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzdHlsZS5idXR0b25BcHBseX1cIj4ke3RoaXMub3B0aW9ucy5idXR0b25UZXh0LmFwcGx5fTwvYnV0dG9uPlxuICAgICAgYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRWYWx1ZSA9IHRoaXMuZGF0ZVBpY2tlZFswXS5mb3JtYXQodGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgICAgICAgICAgICAgIGZvb3Rlci5xdWVyeVNlbGVjdG9yKGAuJHtzdHlsZS5wcmV2aWV3RGF0ZVJhbmdlfWApLmlubmVySFRNTCA9IHN0YXJ0VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGZvb3Rlci5xdWVyeVNlbGVjdG9yKGAuJHtzdHlsZS5idXR0b25BcHBseX1gKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFZhbHVlID0gdGhpcy5kYXRlUGlja2VkWzBdLmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMubGFuZyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kVmFsdWUgPSB0aGlzLmRhdGVQaWNrZWRbMV0uZm9ybWF0KHRoaXMub3B0aW9ucy5mb3JtYXQsIHRoaXMub3B0aW9ucy5sYW5nKTtcbiAgICAgICAgICAgICAgICBmb290ZXIucXVlcnlTZWxlY3RvcihgLiR7c3R5bGUucHJldmlld0RhdGVSYW5nZX1gKVxuICAgICAgICAgICAgICAgICAgICAuaW5uZXJIVE1MID0gYCR7c3RhcnRWYWx1ZX0gLSAke2VuZFZhbHVlfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvb3RlcjtcbiAgICB9XG4gICAgcmVuZGVyV2Vla051bWJlcihkYXRlKSB7XG4gICAgICAgIGNvbnN0IHduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHduLmNsYXNzTmFtZSA9IHN0eWxlLndlZWtOdW1iZXI7XG4gICAgICAgIHduLmlubmVySFRNTCA9IGRhdGUuZ2V0V2Vlayh0aGlzLm9wdGlvbnMuZmlyc3REYXkpO1xuICAgICAgICByZXR1cm4gd247XG4gICAgfVxuICAgIHJlbmRlclRvb2x0aXAoKSB7XG4gICAgICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdC5jbGFzc05hbWUgPSBzdHlsZS5jb250YWluZXJUb29sdGlwO1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG4gICAgd2Vla2RheU5hbWUoZGF5LCByZXByZXNlbnRhdGlvbiA9ICdzaG9ydCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIGRheSwgMTIsIDAsIDAsIDApXG4gICAgICAgICAgICAudG9Mb2NhbGVTdHJpbmcodGhpcy5vcHRpb25zLmxhbmcsIHsgd2Vla2RheTogcmVwcmVzZW50YXRpb24gfSk7XG4gICAgfVxuICAgIGNhbGNTa2lwRGF5cyhkYXRlKSB7XG4gICAgICAgIGxldCB0b3RhbCA9IGRhdGUuZ2V0RGF5KCkgLSB0aGlzLm9wdGlvbnMuZmlyc3REYXk7XG4gICAgICAgIGlmICh0b3RhbCA8IDApXG4gICAgICAgICAgICB0b3RhbCArPSA3O1xuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxufVxuZXhwb3J0cy5DYWxlbmRhciA9IENhbGVuZGFyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBEYXRlVGltZSBleHRlbmRzIERhdGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGUgPSBudWxsLCBmb3JtYXQgPSBudWxsLCBsYW5nID0gJ2VuLVVTJykge1xuICAgICAgICBpZiAoZm9ybWF0KSB7XG4gICAgICAgICAgICBzdXBlcihEYXRlVGltZS5wYXJzZURhdGVUaW1lKGRhdGUsIGZvcm1hdCwgbGFuZykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIHN1cGVyKERhdGVUaW1lLnBhcnNlRGF0ZVRpbWUoZGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhbmcgPSBsYW5nO1xuICAgIH1cbiAgICBzdGF0aWMgcGFyc2VEYXRlVGltZShkYXRlLCBmb3JtYXQgPSAnWVlZWS1NTS1ERCcsIGxhbmcgPSAnZW4tVVMnKSB7XG4gICAgICAgIGlmICghZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIGlmICgvXlxcZHsxMCx9JC8udGVzdChkYXRlKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShOdW1iZXIoZGF0ZSkpO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGZvcm1hdC5tYXRjaCgvXFxbKFteXFxdXSspXXxZezIsNH18TXsxLDR9fER7MSwyfXxkezEsNH0vZyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlUGF0dGVybiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogMSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIGRheTogMyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IHNob3J0TW9udGhzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbG9uZ01vbnRocyA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoLmluY2x1ZGVzKCdNTU0nKSkge1xuICAgICAgICAgICAgICAgICAgICBzaG9ydE1vbnRocyA9IFsuLi5BcnJheSgxMikua2V5cygpXVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh4ID0+IG5ldyBEYXRlKDIwMTksIHgpLnRvTG9jYWxlU3RyaW5nKGxhbmcsIHsgbW9udGg6ICdzaG9ydCcgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2guaW5jbHVkZXMoJ01NTU0nKSkge1xuICAgICAgICAgICAgICAgICAgICBsb25nTW9udGhzID0gWy4uLkFycmF5KDEyKS5rZXlzKCldXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKHggPT4gbmV3IERhdGUoMjAxOSwgeCkudG9Mb2NhbGVTdHJpbmcobGFuZywgeyBtb250aDogJ2xvbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IE51bWJlcihrKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBTdHJpbmcodik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4udmFsdWUgKz0gJy4qPyc7IC8vIGFueSBkZWxpbWl0ZXJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnWVknOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnWVlZWSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4ueWVhciA9IGtleSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4udmFsdWUgKz0gYChcXFxcZHske3ZhbHVlLmxlbmd0aH19KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUGF0dGVybi5tb250aCA9IGtleSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4udmFsdWUgKz0gJyhcXFxcZHsxLDJ9KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4ubW9udGggPSBrZXkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVQYXR0ZXJuLnZhbHVlICs9IGAoXFxcXGR7JHt2YWx1ZS5sZW5ndGh9fSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTU1NJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUGF0dGVybi5tb250aCA9IGtleSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4udmFsdWUgKz0gYCgke3Nob3J0TW9udGhzLmpvaW4oJ3wnKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ01NTU0nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVQYXR0ZXJuLm1vbnRoID0ga2V5ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUGF0dGVybi52YWx1ZSArPSBgKCR7bG9uZ01vbnRocy5qb2luKCd8Jyl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUGF0dGVybi5kYXkgPSBrZXkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVQYXR0ZXJuLnZhbHVlICs9ICcoXFxcXGR7MSwyfSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnREQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVQYXR0ZXJuLmRheSA9IGtleSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm4udmFsdWUgKz0gYChcXFxcZHske3ZhbHVlLmxlbmd0aH19KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7ZGF0ZVBhdHRlcm4udmFsdWV9JGApO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlUmVnZXgudGVzdChkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gZGF0ZVJlZ2V4LmV4ZWMoZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoZFtkYXRlUGF0dGVybi55ZWFyXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb250aCA9IE51bWJlcihkW2RhdGVQYXR0ZXJuLm1vbnRoXSkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvcnRNb250aHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gc2hvcnRNb250aHMuaW5kZXhPZihkW2RhdGVQYXR0ZXJuLm1vbnRoXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobG9uZ01vbnRocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBsb25nTW9udGhzLmluZGV4T2YoZFtkYXRlUGF0dGVybi5tb250aF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IE51bWJlcihkW2RhdGVQYXR0ZXJuLmRheV0pIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xuICAgIH1cbiAgICBzdGF0aWMgY29udmVydEFycmF5KGFycmF5LCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgICAgICAgICAubWFwKChkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFwKGQxID0+IG5ldyBEYXRlVGltZShkMSwgZm9ybWF0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKGQsIGZvcm1hdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRXZWVrKGZpcnN0RGF5KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKTtcbiAgICAgICAgY29uc3QgZGF5TnIgPSAodGhpcy5nZXREYXkoKSArICg3IC0gZmlyc3REYXkpKSAlIDc7XG4gICAgICAgIHRhcmdldC5zZXREYXRlKHRhcmdldC5nZXREYXRlKCkgLSBkYXlOcik7XG4gICAgICAgIGNvbnN0IHN0YXJ0V2Vla2RheSA9IHRhcmdldC5nZXRUaW1lKCk7XG4gICAgICAgIHRhcmdldC5zZXRNb250aCgwLCAxKTtcbiAgICAgICAgaWYgKHRhcmdldC5nZXREYXkoKSAhPT0gZmlyc3REYXkpIHtcbiAgICAgICAgICAgIHRhcmdldC5zZXRNb250aCgwLCAxICsgKCg0IC0gdGFyZ2V0LmdldERheSgpKSArIDcpICUgNyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDEgKyBNYXRoLmNlaWwoKHN0YXJ0V2Vla2RheSAtIHRhcmdldC5nZXRUaW1lKCkpIC8gNjA0ODAwMDAwKTtcbiAgICB9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUodGhpcy5nZXRUaW1lKCkpO1xuICAgIH1cbiAgICBpc0JldHdlZW4oZGF0ZTEsIGRhdGUyLCBjaGVjayA9ICcoKScpIHtcbiAgICAgICAgc3dpdGNoIChjaGVjaykge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhc2UgJygpJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW1lKCkgPiBkYXRlMS5nZXRUaW1lKCkgJiYgdGhpcy5nZXRUaW1lKCkgPCBkYXRlMi5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICdbKSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGltZSgpID49IGRhdGUxLmdldFRpbWUoKSAmJiB0aGlzLmdldFRpbWUoKSA8IGRhdGUyLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJyhdJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW1lKCkgPiBkYXRlMS5nZXRUaW1lKCkgJiYgdGhpcy5nZXRUaW1lKCkgPD0gZGF0ZTIuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnW10nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRpbWUoKSA+PSBkYXRlMS5nZXRUaW1lKCkgJiYgdGhpcy5nZXRUaW1lKCkgPD0gZGF0ZTIuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzQmVmb3JlKGRhdGUsIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpID4gdGhpcy5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpXG4gICAgICAgICAgICAgICAgICAgID4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSkuZ2V0VGltZSgpXG4gICAgICAgICAgICAgICAgICAgID4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIDEpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzQmVmb3JlOiBJbnZhbGlkIHVuaXQhJyk7XG4gICAgfVxuICAgIGlzU2FtZU9yQmVmb3JlKGRhdGUsIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpID49IHRoaXMuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgICAgICA+PSBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksIHRoaXMuZ2V0TW9udGgoKSwgdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPj0gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIDEpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzU2FtZU9yQmVmb3JlOiBJbnZhbGlkIHVuaXQhJyk7XG4gICAgfVxuICAgIGlzQWZ0ZXIoZGF0ZSwgdW5pdCA9ICdzZWNvbmRzJykge1xuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSwgdGhpcy5nZXRNb250aCgpLCAxKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSkuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaXNBZnRlcjogSW52YWxpZCB1bml0IScpO1xuICAgIH1cbiAgICBpc1NhbWVPckFmdGVyKGRhdGUsIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGltZSgpID49IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksIHRoaXMuZ2V0TW9udGgoKSwgdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgICAgICA+PSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSwgdGhpcy5nZXRNb250aCgpLCAxKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPj0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzU2FtZU9yQWZ0ZXI6IEludmFsaWQgdW5pdCEnKTtcbiAgICB9XG4gICAgaXNTYW1lKGRhdGUsIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGltZSgpID09PSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPT09IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIDEpLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgICAgICA9PT0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzU2FtZTogSW52YWxpZCB1bml0IScpO1xuICAgIH1cbiAgICBhZGQoZHVyYXRpb24sIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWNvbmRzKHRoaXMuZ2V0U2Vjb25kcygpICsgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh0aGlzLmdldERhdGUoKSArIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCh0aGlzLmdldE1vbnRoKCkgKyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN1YnRyYWN0KGR1cmF0aW9uLCB1bml0ID0gJ3NlY29uZHMnKSB7XG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vjb25kcyh0aGlzLmdldFNlY29uZHMoKSAtIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUodGhpcy5nZXREYXRlKCkgLSBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9udGgodGhpcy5nZXRNb250aCgpIC0gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkaWZmKGRhdGUsIHVuaXQgPSAnc2Vjb25kcycpIHtcbiAgICAgICAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRpbWUoKSAtIGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5nZXRUaW1lKCkgLSBkYXRlLmdldFRpbWUoKSkgLyBvbmVEYXk7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgLy8gQFRPRE9cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3JtYXQoZm9ybWF0LCBsYW5nID0gJ2VuLVVTJykge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSAnJztcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBmb3JtYXQubWF0Y2goL1xcWyhbXlxcXV0rKV18WXsyLDR9fE17MSw0fXxEezEsMn18ZHsxLDR9L2cpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGxldCBzaG9ydE1vbnRocyA9IG51bGw7XG4gICAgICAgICAgICBsZXQgbG9uZ01vbnRocyA9IG51bGw7XG4gICAgICAgICAgICBpZiAobWF0Y2guaW5jbHVkZXMoJ01NTScpKSB7XG4gICAgICAgICAgICAgICAgc2hvcnRNb250aHMgPSBbLi4uQXJyYXkoMTIpLmtleXMoKV1cbiAgICAgICAgICAgICAgICAgICAgLm1hcCh4ID0+IG5ldyBEYXRlKDIwMTksIHgpLnRvTG9jYWxlU3RyaW5nKGxhbmcsIHsgbW9udGg6ICdzaG9ydCcgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoLmluY2x1ZGVzKCdNTU1NJykpIHtcbiAgICAgICAgICAgICAgICBsb25nTW9udGhzID0gWy4uLkFycmF5KDEyKS5rZXlzKCldXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoeCA9PiBuZXcgRGF0ZSgyMDE5LCB4KS50b0xvY2FsZVN0cmluZyhsYW5nLCB7IG1vbnRoOiAnbG9uZycgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTnVtYmVyKGspO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gU3RyaW5nKHYpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXYgPSBtYXRjaFtrZXkgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgKz0gZm9ybWF0LnN1YnN0cmluZyhmb3JtYXQuaW5kZXhPZihwcmV2KSArIHByZXYubGVuZ3RoLCBmb3JtYXQuaW5kZXhPZih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1lZJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlICs9IFN0cmluZyh0aGlzLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlICs9IFN0cmluZyh0aGlzLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgKz0gU3RyaW5nKHRoaXMuZ2V0TW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlICs9IGAwJHt0aGlzLmdldE1vbnRoKCkgKyAxfWAuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ01NTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSArPSBzaG9ydE1vbnRoc1t0aGlzLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ01NTU0nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgKz0gbG9uZ01vbnRoc1t0aGlzLmdldE1vbnRoKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgKz0gU3RyaW5nKHRoaXMuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdERCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSArPSBgMCR7dGhpcy5nZXREYXRlKCl9YC5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGF0ZVRpbWUgPSBEYXRlVGltZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbGl0ZXBpY2tlcl8xID0gcmVxdWlyZShcIi4vbGl0ZXBpY2tlclwiKTtcbmV4cG9ydHMuTGl0ZXBpY2tlciA9IGxpdGVwaWNrZXJfMS5MaXRlcGlja2VyO1xucmVxdWlyZShcIi4vbWV0aG9kc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsZW5kYXJfMSA9IHJlcXVpcmUoXCIuL2NhbGVuZGFyXCIpO1xuY29uc3QgZGF0ZXRpbWVfMSA9IHJlcXVpcmUoXCIuL2RhdGV0aW1lXCIpO1xuY29uc3Qgc3R5bGUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc2Nzcy9tYWluLnNjc3NcIikpO1xuY2xhc3MgTGl0ZXBpY2tlciBleHRlbmRzIGNhbGVuZGFyXzEuQ2FsZW5kYXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCh0aGlzLm9wdGlvbnMuYWxsb3dSZXBpY2sgJiYgdGhpcy5vcHRpb25zLmlubGluZU1vZGUpXG4gICAgICAgICAgICB8fCAhdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbGxvd1JlcGljayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubG9ja0RheXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubG9ja0RheXMgPSBkYXRldGltZV8xLkRhdGVUaW1lLmNvbnZlcnRBcnJheSh0aGlzLm9wdGlvbnMubG9ja0RheXMsIHRoaXMub3B0aW9ucy5sb2NrRGF5c0Zvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ib29rZWREYXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmJvb2tlZERheXMgPSBkYXRldGltZV8xLkRhdGVUaW1lLmNvbnZlcnRBcnJheSh0aGlzLm9wdGlvbnMuYm9va2VkRGF5cywgdGhpcy5vcHRpb25zLmJvb2tlZERheXNGb3JtYXQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBbc3RhcnRWYWx1ZSwgZW5kVmFsdWVdID0gdGhpcy5wYXJzZUlucHV0KCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1vZGUgfHwgdGhpcy5vcHRpb25zLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICBzdGFydFZhbHVlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0VmFsdWUgJiYgdGhpcy5vcHRpb25zLmVuZERhdGUpIHtcbiAgICAgICAgICAgIGVuZFZhbHVlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUodGhpcy5vcHRpb25zLmVuZERhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4oc3RhcnRWYWx1ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3RhcnREYXRlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUoc3RhcnRWYWx1ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3RhcnREYXRlICYmIGVuZFZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4oZW5kVmFsdWUuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVuZERhdGUgPSBuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZShlbmRWYWx1ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMub3B0aW9ucy5udW1iZXJPZk1vbnRoczsgaWR4ICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLm9wdGlvbnMuc3RhcnREYXRlXG4gICAgICAgICAgICAgICAgPyB0aGlzLm9wdGlvbnMuc3RhcnREYXRlLmNsb25lKClcbiAgICAgICAgICAgICAgICA6IG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKCk7XG4gICAgICAgICAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIGlkeCk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1tpZHhdID0gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uSW5pdCgpO1xuICAgIH1cbiAgICBvbkluaXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB0aGlzLm9uQ2xpY2soZSksIHRydWUpO1xuICAgICAgICB0aGlzLnBpY2tlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBpY2tlci5jbGFzc05hbWUgPSBzdHlsZS5saXRlcGlja2VyO1xuICAgICAgICB0aGlzLnBpY2tlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnBpY2tlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB0aGlzLm9uS2V5RG93bihlKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHRoaXMub25Nb3VzZUVudGVyKGUpLCB0cnVlKTtcbiAgICAgICAgdGhpcy5waWNrZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGUgPT4gdGhpcy5vbk1vdXNlTGVhdmUoZSksIGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4gdGhpcy5vbklucHV0KGUpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB0aGlzLm9uSW5wdXQoZSksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50RWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0aW9ucy5wYXJlbnRFbCkuYXBwZW5kQ2hpbGQodGhpcy5waWNrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbmxpbmVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMucGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucGlja2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlubGluZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXQoKTtcbiAgICB9XG4gICAgcGFyc2VJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aFxuICAgICAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZSh0aGlzLm9wdGlvbnMuZWxlbWVudC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9cXHNcXC1cXHMvLnRlc3QodGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5zcGxpdCgnIC0gJyk7XG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHZhbHVlc1swXSksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKHZhbHVlc1sxXSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHVwZGF0ZUlucHV0KCkge1xuICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1vZGUgJiYgdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUgPSB0aGlzLm9wdGlvbnMuc3RhcnREYXRlXG4gICAgICAgICAgICAgICAgLmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMubGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5zaW5nbGVNb2RlICYmIHRoaXMub3B0aW9ucy5zdGFydERhdGUgJiYgdGhpcy5vcHRpb25zLmVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSB0aGlzLm9wdGlvbnMuc3RhcnREYXRlXG4gICAgICAgICAgICAgICAgLmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMubGFuZyk7XG4gICAgICAgICAgICBjb25zdCBlbmRWYWx1ZSA9IHRoaXMub3B0aW9ucy5lbmREYXRlXG4gICAgICAgICAgICAgICAgLmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMubGFuZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWxlbWVudC52YWx1ZSA9IHN0YXJ0VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUgPSBlbmRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlID0gYCR7c3RhcnRWYWx1ZX0gLSAke2VuZFZhbHVlfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNTYW1lUGlja2VyKGVsKSB7XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IGVsLmNsb3Nlc3QoYC4ke3N0eWxlLmxpdGVwaWNrZXJ9YCk7XG4gICAgICAgIHJldHVybiBwaWNrZXIgPT09IHRoaXMucGlja2VyO1xuICAgIH1cbiAgICBzaG91bGRTaG93bihlbCkge1xuICAgICAgICByZXR1cm4gZWwgPT09IHRoaXMub3B0aW9ucy5lbGVtZW50XG4gICAgICAgICAgICB8fCAodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgJiYgZWwgPT09IHRoaXMub3B0aW9ucy5lbGVtZW50RW5kKTtcbiAgICB9XG4gICAgc2hvdWxkUmVzZXREYXRlUGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpbmdsZU1vZGUgfHwgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMjtcbiAgICB9XG4gICAgc2hvdWxkU3dhcERhdGVQaWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVQaWNrZWQubGVuZ3RoID09PSAyXG4gICAgICAgICAgICAmJiB0aGlzLmRhdGVQaWNrZWRbMF0uZ2V0VGltZSgpID4gdGhpcy5kYXRlUGlja2VkWzFdLmdldFRpbWUoKTtcbiAgICB9XG4gICAgc2hvdWxkQ2hlY2tMb2NrRGF5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNhbGxvd0xvY2tEYXlzSW5SYW5nZVxuICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLmxvY2tEYXlzLmxlbmd0aFxuICAgICAgICAgICAgJiYgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMjtcbiAgICB9XG4gICAgb25DbGljayhlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAoIXRhcmdldCB8fCAhdGhpcy5waWNrZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDbGljayBvbiBlbGVtZW50XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFNob3duKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsaWNrIG91dHNpZGUgcGlja2VyXG4gICAgICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoYC4ke3N0eWxlLmxpdGVwaWNrZXJ9YCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsaWNrIG9uIGRhdGVcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoc3R5bGUuZGF5SXRlbSkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NhbWVQaWNrZXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHN0eWxlLmlzTG9ja2VkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHN0eWxlLmlzQm9va2VkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFJlc2V0RGF0ZVBpY2tlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZWRbdGhpcy5kYXRlUGlja2VkLmxlbmd0aF0gPSBuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZSh0YXJnZXQuZGF0YXNldC50aW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFN3YXBEYXRlUGlja2VkKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZSA9IHRoaXMuZGF0ZVBpY2tlZFsxXS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlZFsxXSA9IHRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlZFswXSA9IHRlbXBEYXRlLmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRDaGVja0xvY2tEYXlzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NrZWQgPSB0aGlzLm9wdGlvbnMubG9ja0RheXNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFswXS5pc0JldHdlZW4odGhpcy5kYXRlUGlja2VkWzBdLCB0aGlzLmRhdGVQaWNrZWRbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgZFsxXS5pc0JldHdlZW4odGhpcy5kYXRlUGlja2VkWzBdLCB0aGlzLmRhdGVQaWNrZWRbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmlzQmV0d2Vlbih0aGlzLmRhdGVQaWNrZWRbMF0sIHRoaXMuZGF0ZVBpY2tlZFsxXSk7XG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uRXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkVycm9yLmNhbGwodGhpcywgJ0lOVkFMSURfUkFOR0UnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9BcHBseSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2luZ2xlTW9kZSAmJiB0aGlzLmRhdGVQaWNrZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh0aGlzLmRhdGVQaWNrZWRbMF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5zaW5nbGVNb2RlICYmIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5kYXRlUGlja2VkWzBdLCB0aGlzLmRhdGVQaWNrZWRbMV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xpY2sgb24gYnV0dG9uIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHN0eWxlLmJ1dHRvblByZXZpb3VzTW9udGgpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTYW1lUGlja2VyKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICAgIGxldCBudW1iZXJPZk1vbnRocyA9IHRoaXMub3B0aW9ucy5udW1iZXJPZk1vbnRocztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3BsaXRWaWV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhJdGVtID0gdGFyZ2V0LmNsb3Nlc3QoYC4ke3N0eWxlLm1vbnRoSXRlbX1gKTtcbiAgICAgICAgICAgICAgICBpZHggPSBbLi4ubW9udGhJdGVtLnBhcmVudE5vZGUuY2hpbGROb2Rlc10uZmluZEluZGV4KGVsID0+IGVsID09PSBtb250aEl0ZW0pO1xuICAgICAgICAgICAgICAgIG51bWJlck9mTW9udGhzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2lkeF0uc2V0TW9udGgodGhpcy5jYWxlbmRhcnNbaWR4XS5nZXRNb250aCgpIC0gbnVtYmVyT2ZNb250aHMpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLmNhbGVuZGFyc1tpZHhdLCBpZHgpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25DaGFuZ2VNb250aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZU1vbnRoLmNhbGwodGhpcywgdGhpcy5jYWxlbmRhcnNbaWR4XSwgaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDbGljayBvbiBidXR0b24gbmV4dCBtb250aFxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5idXR0b25OZXh0TW9udGgpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTYW1lUGlja2VyKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICAgIGxldCBudW1iZXJPZk1vbnRocyA9IHRoaXMub3B0aW9ucy5udW1iZXJPZk1vbnRocztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3BsaXRWaWV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhJdGVtID0gdGFyZ2V0LmNsb3Nlc3QoYC4ke3N0eWxlLm1vbnRoSXRlbX1gKTtcbiAgICAgICAgICAgICAgICBpZHggPSBbLi4ubW9udGhJdGVtLnBhcmVudE5vZGUuY2hpbGROb2Rlc10uZmluZEluZGV4KGVsID0+IGVsID09PSBtb250aEl0ZW0pO1xuICAgICAgICAgICAgICAgIG51bWJlck9mTW9udGhzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2lkeF0uc2V0TW9udGgodGhpcy5jYWxlbmRhcnNbaWR4XS5nZXRNb250aCgpICsgbnVtYmVyT2ZNb250aHMpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLmNhbGVuZGFyc1tpZHhdLCBpZHgpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25DaGFuZ2VNb250aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZU1vbnRoLmNhbGwodGhpcywgdGhpcy5jYWxlbmRhcnNbaWR4XSwgaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDbGljayBvbiBidXR0b24gY2FuY2VsXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHN0eWxlLmJ1dHRvbkNhbmNlbCkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NhbWVQaWNrZXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsaWNrIG9uIGJ1dHRvbiBhcHBsZVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5idXR0b25BcHBseSkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NhbWVQaWNrZXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2luZ2xlTW9kZSAmJiB0aGlzLmRhdGVQaWNrZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKHRoaXMuZGF0ZVBpY2tlZFswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5vcHRpb25zLnNpbmdsZU1vZGUgJiYgdGhpcy5kYXRlUGlja2VkLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZVJhbmdlKHRoaXMuZGF0ZVBpY2tlZFswXSwgdGhpcy5kYXRlUGlja2VkWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dUb29sdGlwKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IHRoaXMucGlja2VyLnF1ZXJ5U2VsZWN0b3IoYC4ke3N0eWxlLmNvbnRhaW5lclRvb2x0aXB9YCk7XG4gICAgICAgIHRvb2x0aXAuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgdG9vbHRpcC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICBjb25zdCBwaWNrZXJCQ1IgPSB0aGlzLnBpY2tlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgdG9vbHRpcEJDUiA9IHRvb2x0aXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGRheUJDUiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCB0b3AgPSBkYXlCQ1IudG9wO1xuICAgICAgICBsZXQgbGVmdCA9IGRheUJDUi5sZWZ0O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlubGluZU1vZGUgJiYgdGhpcy5vcHRpb25zLnBhcmVudEVsKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRCQ1IgPSB0aGlzLnBpY2tlci5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdG9wIC09IHBhcmVudEJDUi50b3A7XG4gICAgICAgICAgICBsZWZ0IC09IHBhcmVudEJDUi5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9wIC09IHBpY2tlckJDUi50b3A7XG4gICAgICAgICAgICBsZWZ0IC09IHBpY2tlckJDUi5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGxldCB0b3AgPSBkYXlSLnRvcCAtIHBpY2tlclIudG9wIC0gdG9vbHRpcFIuaGVpZ2h0O1xuICAgICAgICAvLyBsZXQgbGVmdCA9IChkYXlSLmxlZnQgLSBwaWNrZXJSLmxlZnQpIC0gKHRvb2x0aXBSLndpZHRoIC8gMikgKyAoZGF5Ui53aWR0aCAvIDIpO1xuICAgICAgICB0b3AgLT0gdG9vbHRpcEJDUi5oZWlnaHQ7XG4gICAgICAgIGxlZnQgLT0gdG9vbHRpcEJDUi53aWR0aCAvIDI7XG4gICAgICAgIGxlZnQgKz0gZGF5QkNSLndpZHRoIC8gMjtcbiAgICAgICAgdG9vbHRpcC5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuICAgICAgICB0b29sdGlwLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcbiAgICB9XG4gICAgaGlkZVRvb2x0aXAoKSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSB0aGlzLnBpY2tlci5xdWVyeVNlbGVjdG9yKGAuJHtzdHlsZS5jb250YWluZXJUb29sdGlwfWApO1xuICAgICAgICB0b29sdGlwLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgc2hvdWxkQWxsb3dNb3VzZUVudGVyKGVsKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5vcHRpb25zLnNpbmdsZU1vZGVcbiAgICAgICAgICAgICYmIGVsLmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5kYXlJdGVtKVxuICAgICAgICAgICAgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5pc0xvY2tlZClcbiAgICAgICAgICAgICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMoc3R5bGUuaXNCb29rZWQpO1xuICAgIH1cbiAgICBzaG91bGRBbGxvd1JlcGljaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5lbGVtZW50RW5kXG4gICAgICAgICAgICAmJiB0aGlzLm9wdGlvbnMuYWxsb3dSZXBpY2tcbiAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5zdGFydERhdGVcbiAgICAgICAgICAgICYmIHRoaXMub3B0aW9ucy5lbmREYXRlO1xuICAgIH1cbiAgICBvbk1vdXNlRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5zaG91bGRBbGxvd01vdXNlRW50ZXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkQWxsb3dSZXBpY2soKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWdnZXJFbGVtZW50ID09PSB0aGlzLm9wdGlvbnMuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVQaWNrZWRbMF0gPSB0aGlzLm9wdGlvbnMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VkWzBdID0gdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZWQubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlRWxlbWVudCA9IHRoaXMucGlja2VyXG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke3N0eWxlLmRheUl0ZW19W2RhdGEtdGltZT1cIiR7dGhpcy5kYXRlUGlja2VkWzBdLmdldFRpbWUoKX1cIl1gKTtcbiAgICAgICAgICAgIGxldCBkYXRlMSA9IHRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO1xuICAgICAgICAgICAgbGV0IGRhdGUyID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUodGFyZ2V0LmRhdGFzZXQudGltZSk7XG4gICAgICAgICAgICBsZXQgaXNGbGlwcGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZGF0ZTEuZ2V0VGltZSgpID4gZGF0ZTIuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcERhdGUgPSBkYXRlMS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGRhdGUxID0gZGF0ZTIuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBkYXRlMiA9IHRlbXBEYXRlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgaXNGbGlwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFsuLi50aGlzLnBpY2tlci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtzdHlsZS5kYXlJdGVtfWApXS5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKGQuZGF0YXNldC50aW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSB0aGlzLnJlbmRlckRheShkYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc0JldHdlZW4oZGF0ZTEsIGRhdGUyKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmFkZChzdHlsZS5pc0luUmFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkLmNsYXNzTmFtZSA9IGRheS5jbGFzc05hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzRW5kRGF0ZSk7XG4gICAgICAgICAgICBpZiAoaXNGbGlwcGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0RGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzRmxpcHBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHN0eWxlLmlzRmxpcHBlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnREYXRlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc3R5bGUuaXNGbGlwcGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoc3R5bGUuaXNGbGlwcGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd1Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwciA9IG5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMub3B0aW9ucy5sYW5nKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF5cyA9IGRhdGUyLmRpZmYoZGF0ZTEsICdkYXknKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5ob3RlbE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5cyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF5cyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGx1cmFsTmFtZSA9IHByLnNlbGVjdChkYXlzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGx1cmFsVGV4dCA9IHRoaXMub3B0aW9ucy50b29sdGlwVGV4dFtwbHVyYWxOYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLm9wdGlvbnMudG9vbHRpcFRleHRbcGx1cmFsTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogYFske3BsdXJhbE5hbWV9XWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgJHtkYXlzfSAke3BsdXJhbFRleHR9YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VG9vbHRpcCh0YXJnZXQsIHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlVG9vbHRpcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbGxvd1JlcGljaykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHN0eWxlLmRheUl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IFsuLi50YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzXS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IHRhcmdldCkgLSA3O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID4gMCAmJiB0YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2lkeF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmNoaWxkTm9kZXNbaWR4XS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5kYXlJdGVtKSAmJiB0YXJnZXQucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wcmV2aW91c1NpYmxpbmcuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5kYXlJdGVtKSAmJiB0YXJnZXQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Lm5leHRTaWJsaW5nLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhzdHlsZS5kYXlJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBbLi4udGFyZ2V0LnBhcmVudE5vZGUuY2hpbGROb2Rlc10uZmluZEluZGV4KGVsID0+IGVsID09PSB0YXJnZXQpICsgNztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+IDAgJiYgdGFyZ2V0LnBhcmVudE5vZGUuY2hpbGROb2Rlc1tpZHhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2lkeF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbklucHV0KGV2ZW50KSB7XG4gICAgICAgIGxldCBbc3RhcnRWYWx1ZSwgZW5kVmFsdWVdID0gdGhpcy5wYXJzZUlucHV0KCk7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4oc3RhcnRWYWx1ZS5nZXRUaW1lKCkpXG4gICAgICAgICAgICAmJiBlbmRWYWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKGVuZFZhbHVlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGlmIChzdGFydFZhbHVlLmdldFRpbWUoKSA+IGVuZFZhbHVlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBEYXRlID0gc3RhcnRWYWx1ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHN0YXJ0VmFsdWUgPSBlbmRWYWx1ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGVuZFZhbHVlID0gdGVtcERhdGUuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdGFydERhdGUgPSBuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZShzdGFydFZhbHVlLCB0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMubGFuZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lbmREYXRlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUoZW5kVmFsdWUsIHRoaXMub3B0aW9ucy5mb3JtYXQsIHRoaXMub3B0aW9ucy5sYW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkxpdGVwaWNrZXIgPSBMaXRlcGlja2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkYXRldGltZV8xID0gcmVxdWlyZShcIi4vZGF0ZXRpbWVcIik7XG5jb25zdCBsaXRlcGlja2VyXzEgPSByZXF1aXJlKFwiLi9saXRlcGlja2VyXCIpO1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoZWwgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbmxpbmVNb2RlKSB7XG4gICAgICAgIHRoaXMucGlja2VyLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgIHRoaXMucGlja2VyLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgdGhpcy5waWNrZXIuc3R5bGUudG9wID0gbnVsbDtcbiAgICAgICAgdGhpcy5waWNrZXIuc3R5bGUubGVmdCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zY3JvbGxUb0RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdGFydERhdGUgJiYgKCFlbCB8fCBlbCA9PT0gdGhpcy5vcHRpb25zLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXSA9IHRoaXMub3B0aW9ucy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbCAmJiB0aGlzLm9wdGlvbnMuZW5kRGF0ZSAmJiBlbCA9PT0gdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdID0gdGhpcy5vcHRpb25zLmVuZERhdGUuY2xvbmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMucGlja2VyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB0aGlzLnBpY2tlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLnBpY2tlci5zdHlsZS56SW5kZXggPSB0aGlzLm9wdGlvbnMuekluZGV4O1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbCA/IGVsIDogdGhpcy5vcHRpb25zLmVsZW1lbnQ7XG4gICAgY29uc3QgZWxCQ1IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBpY2tlckJDUiA9IHRoaXMucGlja2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB0b3AgPSBlbEJDUi5ib3R0b207XG4gICAgbGV0IGxlZnQgPSBlbEJDUi5sZWZ0O1xuICAgIGxldCBzY3JvbGxYID0gMDtcbiAgICBsZXQgc2Nyb2xsWSA9IDA7XG4gICAgbGV0IHRvcEFsdCA9IDA7XG4gICAgbGV0IGxlZnRBbHQgPSAwO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50RWwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50QkNSID0gdGhpcy5waWNrZXIucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdG9wIC09IHBhcmVudEJDUi5ib3R0b207XG4gICAgICAgIHRvcCArPSBlbEJDUi5oZWlnaHQ7XG4gICAgICAgIGlmICh0b3AgKyBwaWNrZXJCQ1IuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAmJiAoZWxCQ1IudG9wIC0gcGFyZW50QkNSLnRvcCkgLSBlbEJDUi5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICB0b3BBbHQgPSAoZWxCQ1IudG9wIC0gcGFyZW50QkNSLnRvcCkgLSBlbEJDUi5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVmdCAtPSBwYXJlbnRCQ1IubGVmdDtcbiAgICAgICAgaWYgKGxlZnQgKyBwaWNrZXJCQ1Iud2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgJiYgKGVsQkNSLnJpZ2h0IC0gcGFyZW50QkNSLnJpZ2h0KSAtIHBpY2tlckJDUi53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIGxlZnRBbHQgPSAoZWxCQ1IucmlnaHQgLSBwYXJlbnRCQ1IucmlnaHQpIC0gcGlja2VyQkNSLndpZHRoO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzY3JvbGxYID0gd2luZG93LnNjcm9sbFg7XG4gICAgICAgIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgaWYgKHRvcCArIHBpY2tlckJDUi5oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICYmIGVsQkNSLnRvcCAtIHBpY2tlckJDUi5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICB0b3BBbHQgPSBlbEJDUi50b3AgLSBwaWNrZXJCQ1IuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZWZ0ICsgcGlja2VyQkNSLndpZHRoID4gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgICYmIGVsQkNSLnJpZ2h0IC0gcGlja2VyQkNSLndpZHRoID4gMCkge1xuICAgICAgICAgICAgbGVmdEFsdCA9IGVsQkNSLnJpZ2h0IC0gcGlja2VyQkNSLndpZHRoO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMucGlja2VyLnN0eWxlLnRvcCA9IGAkeyh0b3BBbHQgPyB0b3BBbHQgOiB0b3ApICsgc2Nyb2xsWX1weGA7XG4gICAgdGhpcy5waWNrZXIuc3R5bGUubGVmdCA9IGAkeyhsZWZ0QWx0ID8gbGVmdEFsdCA6IGxlZnQpICsgc2Nyb2xsWH1weGA7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25TaG93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vblNob3cuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyRWxlbWVudCA9IGVsZW1lbnQ7XG59O1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlja2VyLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGggPSAwO1xuICAgIHRoaXMudXBkYXRlSW5wdXQoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmlubGluZU1vZGUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBpY2tlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uSGlkZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9wdGlvbnMub25IaWRlLmNhbGwodGhpcyk7XG4gICAgfVxufTtcbmxpdGVwaWNrZXJfMS5MaXRlcGlja2VyLnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFN0YXJ0RGF0ZSgpO1xufTtcbmxpdGVwaWNrZXJfMS5MaXRlcGlja2VyLnByb3RvdHlwZS5nZXRTdGFydERhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGFydERhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLmdldEVuZERhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbmREYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW5kRGF0ZS5jbG9uZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5saXRlcGlja2VyXzEuTGl0ZXBpY2tlci5wcm90b3R5cGUuc2V0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdGhpcy5zZXRTdGFydERhdGUoZGF0ZSk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXREYXRlKCkpO1xuICAgIH1cbn07XG5saXRlcGlja2VyXzEuTGl0ZXBpY2tlci5wcm90b3R5cGUuc2V0U3RhcnREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBpZiAoIWRhdGUpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLm9wdGlvbnMuc3RhcnREYXRlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUoZGF0ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xufTtcbmxpdGVwaWNrZXJfMS5MaXRlcGlja2VyLnByb3RvdHlwZS5zZXRFbmREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICBpZiAoIWRhdGUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZW5kRGF0ZSA9IHRoaXMub3B0aW9ucy5zdGFydERhdGUuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSA9IG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKGRhdGUsIHRoaXMub3B0aW9ucy5mb3JtYXQsIHRoaXMub3B0aW9ucy5sYW5nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5lbmREYXRlID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUoZGF0ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgIH1cbn07XG5saXRlcGlja2VyXzEuTGl0ZXBpY2tlci5wcm90b3R5cGUuc2V0RGF0ZVJhbmdlID0gZnVuY3Rpb24gKGRhdGUxLCBkYXRlMikge1xuICAgIHRoaXMuc2V0U3RhcnREYXRlKGRhdGUxKTtcbiAgICB0aGlzLnNldEVuZERhdGUoZGF0ZTIpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vblNlbGVjdC5jYWxsKHRoaXMsIHRoaXMuZ2V0U3RhcnREYXRlKCksIHRoaXMuZ2V0RW5kRGF0ZSgpKTtcbiAgICB9XG59O1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLmdvdG9EYXRlID0gZnVuY3Rpb24gKGRhdGUsIGlkeCA9IDApIHtcbiAgICB0aGlzLmNhbGVuZGFyc1tpZHhdID0gbmV3IGRhdGV0aW1lXzEuRGF0ZVRpbWUoZGF0ZSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbn07XG5saXRlcGlja2VyXzEuTGl0ZXBpY2tlci5wcm90b3R5cGUuc2V0TG9ja0RheXMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICB0aGlzLm9wdGlvbnMubG9ja0RheXMgPSBkYXRldGltZV8xLkRhdGVUaW1lLmNvbnZlcnRBcnJheShhcnJheSwgdGhpcy5vcHRpb25zLmxvY2tEYXlzRm9ybWF0KTtcbiAgICB0aGlzLnJlbmRlcigpO1xufTtcbmxpdGVwaWNrZXJfMS5MaXRlcGlja2VyLnByb3RvdHlwZS5zZXRCb29rZWREYXlzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgdGhpcy5vcHRpb25zLmJvb2tlZERheXMgPSBkYXRldGltZV8xLkRhdGVUaW1lLmNvbnZlcnRBcnJheShhcnJheSwgdGhpcy5vcHRpb25zLmJvb2tlZERheXNGb3JtYXQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG59O1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGRlbGV0ZSBvcHRpb25zLmVsZW1lbnQ7XG4gICAgZGVsZXRlIG9wdGlvbnMuZWxlbWVudEVuZDtcbiAgICBkZWxldGUgb3B0aW9ucy5wYXJlbnRFbDtcbiAgICBpZiAob3B0aW9ucy5zdGFydERhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5zdGFydERhdGUgPSBuZXcgZGF0ZXRpbWVfMS5EYXRlVGltZShvcHRpb25zLnN0YXJ0RGF0ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5lbmREYXRlKSB7XG4gICAgICAgIG9wdGlvbnMuZW5kRGF0ZSA9IG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKG9wdGlvbnMuZW5kRGF0ZSwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmxhbmcpO1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMub3B0aW9ucy5udW1iZXJPZk1vbnRoczsgaWR4ICs9IDEpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMub3B0aW9ucy5zdGFydERhdGVcbiAgICAgICAgICAgID8gdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS5jbG9uZSgpXG4gICAgICAgICAgICA6IG5ldyBkYXRldGltZV8xLkRhdGVUaW1lKCk7XG4gICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgaWR4KTtcbiAgICAgICAgdGhpcy5jYWxlbmRhcnNbaWR4XSA9IGRhdGU7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbmxpbmVNb2RlKSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUlucHV0KCk7XG59O1xubGl0ZXBpY2tlcl8xLkxpdGVwaWNrZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlja2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5waWNrZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnBpY2tlcik7XG4gICAgICAgIHRoaXMucGlja2VyID0gbnVsbDtcbiAgICB9XG59O1xuIiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZHRzLWNzcy1tb2R1bGVzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS0zIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uc2Nzc1wiKTtcblxuaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG59XG5cbnZhciBvcHRpb25zID0ge31cblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYgKGNvbnRlbnQubG9jYWxzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9