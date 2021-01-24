import './style.css';

Litepicker.add('mobilefriendly', {
  init: function (picker) {
    const options = picker.options;

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

    picker.on('init', () => {
      if (options.inlineMode && isMobile()) {
        // force trigger orientationchange
        window.dispatchEvent(new Event('orientationchange'));
        window.dispatchEvent(new Event('resize'));
      }
    });

    picker.on('before:show', (el) => {
      console.log('before:show');
      picker.triggerElement = el;

      if (isMobile()) {
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
      }
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
  }
});