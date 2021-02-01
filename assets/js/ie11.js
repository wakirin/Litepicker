//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#polyfill
//
if (!Array.prototype.filter) {
  Array.prototype.filter = function (func, thisArg) {
    'use strict';
    if (!((typeof func === 'Function' || typeof func === 'function') && this))
      throw new TypeError();

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    }
    else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}

//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#polyfill
//
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
      var symbolIterator;
      try {
          symbolIterator = Symbol.iterator
              ? Symbol.iterator
              : 'Symbol(Symbol.iterator)';
      } catch (e) {
          symbolIterator = 'Symbol(Symbol.iterator)';
      }

      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
          return (
              typeof fn === 'function' ||
              toStr.call(fn) === '[object Function]'
          );
      };
      var toInteger = function (value) {
          var number = Number(value);
          if (isNaN(number)) return 0;
          if (number === 0 || !isFinite(number)) return number;
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      var setGetItemHandler = function setGetItemHandler(isIterator, items) {
          var iterator = isIterator && items[symbolIterator]();
          return function getItem(k) {
              return isIterator ? iterator.next() : items[k];
          };
      };

      var getArray = function getArray(
          T,
          A,
          len,
          getItem,
          isIterator,
          mapFn
      ) {
          // 16. Let k be 0.
          var k = 0;

          // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
          while (k < len || isIterator) {
              var item = getItem(k);
              var kValue = isIterator ? item.value : item;

              if (isIterator && item.done) {
                  return A;
              } else {
                  if (mapFn) {
                      A[k] =
                          typeof T === 'undefined'
                              ? mapFn(kValue, k)
                              : mapFn.call(T, kValue, k);
                  } else {
                      A[k] = kValue;
                  }
              }
              k += 1;
          }

          if (isIterator) {
              throw new TypeError(
                  'Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1'
              );
          } else {
              A.length = len;
          }

          return A;
      };

      // The length property of the from method is 1.
      return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
          // 1. Let C be the this value.
          var C = this;

          // 2. Let items be ToObject(arrayLikeOrIterator).
          var items = Object(arrayLikeOrIterator);
          var isIterator = isCallable(items[symbolIterator]);

          // 3. ReturnIfAbrupt(items).
          if (arrayLikeOrIterator == null && !isIterator) {
              throw new TypeError(
                  'Array.from requires an array-like object or iterator - not null or undefined'
              );
          }

          // 4. If mapfn is undefined, then let mapping be false.
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
              // 5. else
              // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
              if (!isCallable(mapFn)) {
                  throw new TypeError(
                      'Array.from: when provided, the second argument must be a function'
                  );
              }

              // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
              if (arguments.length > 2) {
                  T = arguments[2];
              }
          }

          // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).
          var len = toLength(items.length);

          // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method
          // of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);

          return getArray(
              T,
              A,
              len,
              setGetItemHandler(isIterator, items),
              isIterator,
              mapFn
          );
      };
  })();
}

//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
//
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

//
// https://github.com/github/fetch/blob/master/fetch.js
//
/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/whatwg-fetch@3.0.1/dist/fetch.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.WHATWGFetch={})}(this,function(t){"use strict";var e={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(e.arrayBuffer)var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(t){return t&&r.indexOf(Object.prototype.toString.call(t))>-1};function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!=typeof t&&(t=String(t)),t}function s(t){var r={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return e.iterable&&(r[Symbol.iterator]=function(){return r}),r}function a(t){this.map={},t instanceof a?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function f(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function h(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function u(t){var e=new FileReader,r=h(e);return e.readAsArrayBuffer(t),r}function d(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){var r;this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:e.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:e.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():e.arrayBuffer&&e.blob&&((r=t)&&DataView.prototype.isPrototypeOf(r))?(this._bodyArrayBuffer=d(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):e.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||o(t))?this._bodyArrayBuffer=d(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},e.blob&&(this.blob=function(){var t=f(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var t,e,r,o=f(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=h(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},e.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}a.prototype.append=function(t,e){t=n(t),e=i(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},a.prototype.delete=function(t){delete this.map[n(t)]},a.prototype.get=function(t){return t=n(t),this.has(t)?this.map[t]:null},a.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},a.prototype.set=function(t,e){this.map[n(t)]=i(e)},a.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},a.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),s(t)},a.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},a.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),s(t)},e.iterable&&(a.prototype[Symbol.iterator]=a.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function l(t,e){var r,o,n=(e=e||{}).body;if(t instanceof l){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new a(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new a(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),y.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function b(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"",this.headers=new a(e.headers),this.url=e.url||"",this._initBody(t)}l.prototype.clone=function(){return new l(this,{body:this._bodyInit})},c.call(l.prototype),c.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new a(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var m=[301,302,303,307,308];b.redirect=function(t,e){if(-1===m.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.DOMException=self.DOMException;try{new t.DOMException}catch(e){t.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function w(r,o){return new Promise(function(n,i){var s=new l(r,o);if(s.signal&&s.signal.aborted)return i(new t.DOMException("Aborted","AbortError"));var f=new XMLHttpRequest;function h(){f.abort()}f.onload=function(){var t,e,r={status:f.status,statusText:f.statusText,headers:(t=f.getAllResponseHeaders()||"",e=new a,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e)};r.url="responseURL"in f?f.responseURL:r.headers.get("X-Request-URL");var o="response"in f?f.response:f.responseText;setTimeout(function(){n(new b(o,r))},0)},f.onerror=function(){setTimeout(function(){i(new TypeError("Network request failed"))},0)},f.ontimeout=function(){setTimeout(function(){i(new TypeError("Network request failed"))},0)},f.onabort=function(){setTimeout(function(){i(new t.DOMException("Aborted","AbortError"))},0)},f.open(s.method,function(t){try{return""===t&&self.location.href?self.location.href:t}catch(e){return t}}(s.url),!0),"include"===s.credentials?f.withCredentials=!0:"omit"===s.credentials&&(f.withCredentials=!1),"responseType"in f&&(e.blob?f.responseType="blob":e.arrayBuffer&&s.headers.get("Content-Type")&&-1!==s.headers.get("Content-Type").indexOf("application/octet-stream")&&(f.responseType="arraybuffer")),s.headers.forEach(function(t,e){f.setRequestHeader(e,t)}),s.signal&&(s.signal.addEventListener("abort",h),f.onreadystatechange=function(){4===f.readyState&&s.signal.removeEventListener("abort",h)}),f.send(void 0===s._bodyInit?null:s._bodyInit)})}w.polyfill=!0,self.fetch||(self.fetch=w,self.Headers=a,self.Request=l,self.Response=b),t.Headers=a,t.Request=l,t.Response=b,t.fetch=w,Object.defineProperty(t,"__esModule",{value:!0})});

//
// https://www.npmjs.com/package/promise-polyfill
//
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}function t(e){return new this(function(t,n){function o(e,n){if(n&&("object"==typeof n||"function"==typeof n)){var f=n.then;if("function"==typeof f)return void f.call(n,function(t){o(e,t)},function(n){r[e]={status:"rejected",reason:n},0==--i&&t(r)})}r[e]={status:"fulfilled",value:n},0==--i&&t(r)}if(!e||"undefined"==typeof e.length)return n(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})}function n(e){return!(!e||"undefined"==typeof e.length)}function o(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],l(e,this)}function i(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(r){return void u(t.promise,r)}f(t.promise,o)}else(1===e._state?f:u)(t.promise,e._value)})):e._deferreds.push(t)}function f(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void l(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(o){u(e,o)}}function u(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)i(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,f(t,e))},function(e){n||(n=!0,u(t,e))})}catch(o){if(n)return;n=!0,u(t,o)}}var a=setTimeout;r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(o);return i(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},r.prototype["finally"]=e,r.all=function(e){return new r(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(t){r(e,t)},o)}i[e]=n,0==--f&&t(i)}catch(c){o(c)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},r.allSettled=t,r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,o){if(!n(e))return o(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)r.resolve(e[i]).then(t,o)})},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},r._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var s=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"function"!=typeof s.Promise?s.Promise=r:s.Promise.prototype["finally"]?s.Promise.allSettled||(s.Promise.allSettled=t):s.Promise.prototype["finally"]=e});