import './style.css';

Litepicker.add('mobilefriendly', {
  init: function (picker) {
    const options = picker.options;

    const defaultOptions = {
      breakpoint: 480,
    };
    picker.options.mobilefriendly = { ...defaultOptions, ...options.mobilefriendly };

    Object.defineProperties(picker, {
      xTouchDown: {
        value: null,
        writable: true
      },
      yTouchDown: {
        value: null,
        writable: true
      },
      touchTargetMonth: {
        value: null,
        writable: true
      },
    });

    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) { }

    function isMobile() {
      const isPortrait = getOrientation() === 'portrait';
      return window.matchMedia(`(max-device-${isPortrait ? 'width' : 'height'}: ${picker.options.mobilefriendly.breakpoint}px)`).matches;
    }

    function getOrientation() {
      let orientation;

      if ('orientation' in window.screen && 'type' in window.screen.orientation) {
        orientation = window.screen.orientation.type.replace(/\-\w+$/, '');
      } else if (window.matchMedia('(orientation: portrait)').matches) {
        orientation = 'portrait';
      } else {
        orientation = 'landscape';
      }

      return orientation;
    }

    function fitNumberOfMonths() {
      if (getOrientation() === 'portrait') {
        picker.options.numberOfMonths = 1;
        picker.options.numberOfColumns = 1;
      } else {
        picker.options.numberOfMonths = 2;
        picker.options.numberOfColumns = 2;
      }
    }

    const swipe = {
      onTouchStart: (evt) => {
        const firstTouch = evt.touches[0];
        picker.xTouchDown = firstTouch.clientX;
        picker.yTouchDown = firstTouch.clientY;
      },
      onTouchMove: (evt) => {
        if (!picker.xTouchDown || !picker.yTouchDown) {
          return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = picker.xTouchDown - xUp;
        const yDiff = picker.yTouchDown - yUp;
        const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);
        const threshold = 100;

        const numberOfMonths = picker.options.numberOfMonths;
        let nextDate = null;
        let canSwipe = false;
        let touchTargetMonth = '';

        const monthItems = Array.from(picker.ui.querySelectorAll('.month-item'));
        if (isHorizontal) {
          const date = picker.DateTime(picker.ui.querySelector('.day-item').dataset.time);
          const opacityValue = Number(`${1 - (Math.abs(xDiff) / threshold)}`);
          let translateX = 0;

          if (xDiff > 0) {
            translateX = -Math.abs(xDiff);
            nextDate = date.clone().add(numberOfMonths, 'month');

            const maxDate = picker.options.maxDate;
            canSwipe = !maxDate || (nextDate.isSameOrBefore(picker.DateTime(maxDate), 'month'));
            touchTargetMonth = 'next';
          } else {
            translateX = Math.abs(xDiff);
            nextDate = date.clone().subtract(numberOfMonths, 'month');

            const minDate = picker.options.minDate;
            canSwipe = !minDate || (nextDate.isSameOrAfter(picker.DateTime(minDate), 'month'));
            touchTargetMonth = 'prev';
          }

          if (canSwipe) {
            monthItems.map(x => {
              x.style.opacity = opacityValue
              x.style.transform = `translateX(${translateX}px)`
            });
          }
        }

        if (Math.abs(xDiff) + Math.abs(yDiff) > threshold) {
          if (isHorizontal && nextDate && canSwipe) {
            picker.touchTargetMonth = touchTargetMonth;
            picker.gotoDate(nextDate);
          } else {
            if (yDiff > 0) {
              /* up swipe */
            } else {
              /* down swipe */
            }
          }

        }
      },
      onTouchEnd: (evt) => {
        if (!picker.touchTargetMonth) {
          const monthItems = Array.from(picker.ui.querySelectorAll('.month-item'));
          monthItems.map(x => {
            x.style.transform = `translateX(0px)`
            x.style.opacity = 1;
          });
        }

        /* reset values */
        picker.xTouchDown = null;
        picker.yTouchDown = null;
      }
    }

    picker.backdrop = document.createElement('div');
    picker.backdrop.className = 'litepicker-backdrop';
    picker.backdrop.addEventListener('click', picker.hide());
    if (options.element && options.element.parentNode) {
      options.element.parentNode.appendChild(picker.backdrop);
    }

    window.addEventListener('orientationchange', (evt) => {
      // replace to screen.orientation.angle when Safari will support
      // https://caniuse.com/#feat=screen-orientation

      // get correct viewport after changing orientation
      // https://stackoverflow.com/a/49383279/2873909
      const afterOrientationChange = () => {
        if (isMobile() && picker.isShowning()) {
          const orientation = getOrientation();

          switch (orientation) {
            case 'landscape':
              options.numberOfMonths = 2;
              options.numberOfColumns = 2;
              break;

            // portrait
            default:
              options.numberOfMonths = 1;
              options.numberOfColumns = 1;
              break;
          }

          picker.ui.classList.toggle('mobilefriendly-portrait', orientation === 'portrait');
          picker.ui.classList.toggle('mobilefriendly-landscape', orientation === 'landscape');

          picker.render();
        }

        window.removeEventListener('resize', afterOrientationChange);
      };

      window.addEventListener('resize', afterOrientationChange);
    });

    if (options.inlineMode && isMobile()) {
      // force trigger orientationchange
      window.dispatchEvent(new Event('orientationchange'));
      window.dispatchEvent(new Event('resize'));
    }

    picker.on('before:show', (el) => {
      picker.triggerElement = el;

      if (!picker.options.inlineMode && isMobile()) {
        picker.emit('mobilefriendly.before:show', el);

        picker.ui.style.position = 'fixed';
        picker.ui.style.display = 'block';

        fitNumberOfMonths();

        picker.scrollToDate(el);

        picker.render();

        const orientation = getOrientation();
        picker.ui.classList.add('mobilefriendly');
        picker.ui.classList.toggle('mobilefriendly-portrait', orientation === 'portrait');
        picker.ui.classList.toggle('mobilefriendly-landscape', orientation === 'landscape');
        picker.ui.style.top = '50%';
        picker.ui.style.left = '50%';
        picker.ui.style.right = null;
        picker.ui.style.bottom = null;
        picker.ui.style.zIndex = picker.options.zIndex;

        picker.backdrop.style.display = 'block';
        picker.backdrop.style.zIndex = picker.options.zIndex - 1;
        document.body.classList.add('litepicker-open');

        (el || picker.options.element).blur();

        picker.emit('mobilefriendly.show', el);
      } else if (isMobile()) {
        fitNumberOfMonths();

        picker.render();
      }
    });

    picker.on('render', (ui) => {
      if (picker.touchTargetMonth) {
        const monthItems = Array.from(picker.ui.querySelectorAll('.month-item'));
        monthItems.map(x => x.classList.add(`touch-target-${picker.touchTargetMonth}`));
      }

      picker.touchTargetMonth = null;
    });

    picker.on('hide', () => {
      document.body.classList.remove('litepicker-open');
      picker.backdrop.style.display = 'none';
      picker.ui.classList.remove('mobilefriendly', 'mobilefriendly-portrait', 'mobilefriendly-landscape');
    });

    picker.on('destroy', () => {
      if (picker.backdrop && picker.backdrop.parentNode) {
        picker.backdrop.parentNode.removeChild(picker.backdrop);
      }
    });

    picker.ui.addEventListener('touchstart', swipe.onTouchStart, supportsPassive ? { passive: true } : false);
    picker.ui.addEventListener('touchmove', swipe.onTouchMove, supportsPassive ? { passive: true } : false);
    picker.ui.addEventListener('touchend', swipe.onTouchEnd, supportsPassive ? { passive: true } : false);
  }
});