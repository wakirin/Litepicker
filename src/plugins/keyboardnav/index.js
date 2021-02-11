import './style.css';

Litepicker.add('keyboardnav', {
  init: function (picker) {

    Object.defineProperties(picker, {
      isMouseDown: {
        value: false,
        writable: true
      },
    });

    const defaultOptions = {
      firstTabIndex: 1,
    };
    picker.options.keyboardnav = { ...defaultOptions, ...picker.options.keyboardnav };

    function handleEnter(target, evt) {
      if (target.classList.contains('day-item')) {
        evt.preventDefault();
  
        document.activeElement.dispatchEvent(new Event('click'));
  
        setTimeout(() => {
          let focusEl = picker.ui.querySelector('.is-start-date[tabindex="2"]');
          if (!focusEl) {
            focusEl = picker.ui.querySelector('[tabindex="2"]');
          }
          focusEl.focus();
        });
      }
    }

    function handleTab(target, evt) {
      setTimeout(() => {
        const currentElement = document.activeElement;
  
        if (!currentElement.closest('.litepicker')) {
          let focusEl = picker.ui.querySelector('[tabindex="1"]');
  
          if (target === focusEl) {
            // @TODO bug: not focused to last day by Shift+Tab
            const elms = picker.ui.querySelectorAll('[tabindex="2"]');
            focusEl = elms[elms.length - 1];
          }
  
          focusEl.focus();
        }
      });
    }

    function handleArrowUpDown(target, evt) {
      if (target.classList.contains('day-item')) {
        evt.preventDefault();
  
        const nextElement = findAllowableDaySibling(picker.ui, target, (idx, targetIdx) => {
          // tslint:disable-next-line: no-parameter-reassignment
          targetIdx = evt.code === 'ArrowUp' ? targetIdx - 7 : targetIdx + 7;
          return idx === targetIdx;
        });
  
        if (nextElement) {
          nextElement.focus();
        }
      }
    }

    function handleArrowLeftRight(target, evt) {
      if (target.classList.contains('day-item')) {
        evt.preventDefault();
  
        const nextElement = findAllowableDaySibling(picker.ui, target, (idx, targetIdx) => {
          // tslint:disable-next-line: no-parameter-reassignment
          targetIdx = evt.code === 'ArrowLeft' ? targetIdx - 1 : targetIdx + 1;
          return idx === targetIdx;
        });
  
        if (nextElement) {
          nextElement.focus();
        } else {
          changeMonth(evt);
        }
      }
    }

    function changeMonth(evt) {
      const buttons = {
        ArrowLeft: '.button-previous-month',
        ArrowRight: '.button-next-month',
      };
  
      const button = picker.ui.querySelector(`${buttons[evt.code]}[tabindex="1"]`);
      if (button) {
        button.dispatchEvent(new Event('click'));
      }
  
      setTimeout(() => {
        let focusEl = null;
  
        switch (evt.code) {
          case 'ArrowLeft':
            const elms = picker.ui.querySelectorAll('[tabindex="2"]');
            focusEl = elms[elms.length - 1];
            break;
  
          case 'ArrowRight':
            focusEl = picker.ui.querySelector('[tabindex="2"]');
            break;
        }
  
        focusEl.focus();
      });
    }

    function findAllowableDaySibling(picker, target, isAllow) {
      const elms = Array.from(picker.querySelectorAll('.day-item[tabindex="2"]'));
      const targetIdx = elms.indexOf(target);
    
      return elms.filter((el, idx) => {
        return isAllow(idx, targetIdx) && el.tabIndex === 2;
      })[0];
    }

    function onKeyDown(evt) {
      const target = evt.target;
  
      setTimeout(() => {
        this.onMouseEnter({ target: document.activeElement });
      });
  
      switch (evt.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          handleArrowUpDown(target, evt);
          break;
  
        case 'ArrowLeft':
        case 'ArrowRight':
          handleArrowLeftRight(target, evt);
          break;
  
        case 'Tab':
          handleTab(target, evt);
          break;
  
        case 'Enter':
        case 'Space':
          handleEnter(target, evt);
          break;

        case 'Escape':
          picker.hide();
          break;
      }
    }

    function onMouseDown(evt) {
      picker.isMouseDown = true;
    }

    function onFocus(evt) {
      if (picker.isMouseDown) {
        picker.isMouseDown = false;
        return;
      }

      if (this.options.inlineMode) {
        return;
      }

      if (this.isShowning()) {
        return;
      }

      this.show(evt.target);

      const focusEl = this.ui.querySelector(`[tabindex="${picker.options.keyboardnav.firstTabIndex}"]`);
      focusEl.focus();
    }

    function onBlur(evt) {
      if (this.options.inlineMode) {
        return;
      }
  
      // get next focusable element
      setTimeout(() => {
        const activeElement = document.activeElement;
  
        if (!this.ui.contains(activeElement)) {
          this.nextFocusElement = activeElement;
        }
      });
    }

    picker.ui.addEventListener('keydown', onKeyDown.bind(picker), true);

    const options = picker.options;

    if (options.element instanceof HTMLElement) {
      options.element.addEventListener('mousedown', onMouseDown.bind(picker), true);
      options.element.addEventListener('focus', onFocus.bind(picker), true);
    }
    if (options.elementEnd instanceof HTMLElement) {
      options.elementEnd.addEventListener('mousedown', onMouseDown.bind(picker), true);
      options.elementEnd.addEventListener('focus', onFocus.bind(picker), true);
    }

    if (options.element instanceof HTMLElement) {
      options.element.addEventListener('blur', onBlur.bind(picker), true);
    }
    if (options.elementEnd instanceof HTMLElement) {
      options.elementEnd.addEventListener('blur', onBlur.bind(picker), true);
    }

    picker.on('render', (ui) => {
      const selectors = [
        '.month-item:first-child:not(.no-previous-month) .button-previous-month',
        '.month-item:last-child:not(.no-next-month) .button-next-month',
        '.reset-button',
        'select'
      ];
      const elems = Array.from(ui.querySelectorAll(selectors.join(',')));

      elems.forEach(x => x.tabIndex = 1);
    });

    picker.on('render:day', (day) => {
      day.tabIndex = !day.classList.contains('is-locked') ? 2 : -1;
    });
  },
});