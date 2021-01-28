import './style.css';

Litepicker.add('mobilefriendly', {
  init: function (picker) {
    const options = picker.options;

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

    function isMobile() {
      const isPortrait = getOrientation() === 'portrait';
      return window.matchMedia(`(max-device-${isPortrait ? 'width' : 'height'}: ${480}px)`).matches;
    }

    function getOrientation() {
      let orientation;

      // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
      if ('orientation' in window.screen && 'type' in window.screen.orientation) {
        orientation = window.screen.orientation.type.replace(/\-\w+$/, '');
      } else if (window.matchMedia('(orientation: portrait)').matches) {
        orientation = 'portrait';
      } else {
        orientation = 'landscape';
      }

      return orientation;
    }

    const swipe = {
      onTouchStart: (evt) => {
        const firstTouch = evt.touches[0];
        picker.xTouchDown = firstTouch.clientX;
        picker.yTouchDown = firstTouch.clientY;
      },
      onTouchMove: (evt) => {
        if (picker.ui.style.position !== 'fixed') {
          return;
        }

        if (!picker.xTouchDown || !picker.yTouchDown) {
          return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = picker.xTouchDown - xUp;
        const yDiff = picker.yTouchDown - yUp;
        const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);
        const threshold = 100;

        const monthItem = picker.ui.querySelector('.month-item');
        if (isHorizontal) {
          monthItem.style.opacity = Number(`${1 - (Math.abs(xDiff) / threshold)}`);
          const scaleValue = Math.max(0.5, monthItem.style.opacity);

          if (xDiff > 0) {
            monthItem.style.transform = `translateX(${-Math.abs(xDiff)}px) scale(${scaleValue})`;
          } else {
            monthItem.style.transform = `translateX(${Math.abs(xDiff)}px) scale(${scaleValue})`;
          }
        }

        if (Math.abs(xDiff) + Math.abs(yDiff) > threshold) {
          if (isHorizontal) {
            const date = picker.DateTime(picker.ui.querySelector('.day-item').dataset.time);

            if (xDiff > 0) {
              picker.touchTargetMonth = 'next';
              picker.gotoDate(date.add(1, 'month').clone());
            } else {
              picker.touchTargetMonth = 'prev';
              picker.gotoDate(date.subtract(1, 'month').clone());
            }
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
          const monthItem = picker.ui.querySelector('.month-item');
          monthItem.style.opacity = 1;
          monthItem.style.transform = 'translateX(0px) scale(1)';
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
          switch (getOrientation()) {
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

          picker.render();

          if (!options.inlineMode) {
            const pickerBCR = picker.ui.getBoundingClientRect();
            picker.ui.style.top = `calc(50% - ${(pickerBCR.height / 2)}px)`;
            picker.ui.style.left = `calc(50% - ${(pickerBCR.width / 2)}px)`;
          }
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

      if (isMobile()) {
        picker.emit('mobilefriendly.before:show', el);

        picker.ui.style.position = 'fixed';
        picker.ui.style.display = 'block';

        if (getOrientation() === 'portrait') {
          picker.options.numberOfMonths = 1;
          picker.options.numberOfColumns = 1;
        } else {
          picker.options.numberOfMonths = 2;
          picker.options.numberOfColumns = 2;
        }

        picker.scrollToDate(el);

        picker.render();

        const pickerBCR = picker.ui.getBoundingClientRect();
        picker.ui.style.top = `calc(50% - ${(pickerBCR.height / 2)}px)`;
        picker.ui.style.left = `calc(50% - ${(pickerBCR.width / 2)}px)`;
        picker.ui.style.right = null;
        picker.ui.style.bottom = null;
        picker.ui.style.zIndex = picker.options.zIndex;

        picker.backdrop.style.display = 'block';
        picker.backdrop.style.zIndex = picker.options.zIndex - 1;
        document.body.classList.add('litepicker-open');

        (el || picker.options.element).blur();

        picker.emit('mobilefriendly.show', el);
      }
    });

    picker.on('render', (ui) => {
      if (picker.touchTargetMonth) {
        const monthItem = ui.querySelector('.month-item');
        monthItem.classList.add(`touch-target-${picker.touchTargetMonth}`);
      }

      picker.touchTargetMonth = null;
    });

    picker.on('hide', () => {
      document.body.classList.remove('litepicker-open');
      picker.backdrop.style.display = 'none';
    });

    picker.on('destroy', () => {
      if (picker.backdrop && picker.backdrop.parentNode) {
        picker.backdrop.parentNode.removeChild(picker.backdrop);
      }
    });

    picker.ui.addEventListener('touchstart', swipe.onTouchStart, false);
    picker.ui.addEventListener('touchmove', swipe.onTouchMove, false);
    picker.ui.addEventListener('touchend', swipe.onTouchEnd, false);
  }
});