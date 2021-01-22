import { Calendar } from './calendar';
import { DateTime } from './datetime';
import * as style from './scss/main.scss';
import {
  findAllowableDaySibling,
  findNestedMonthItem,
  getOrientation,
  isMobile,
  isNotEmptyArray,
  rangeIsLocked,
} from './utils';

export class Litepicker extends Calendar {
  protected triggerElement;
  protected backdrop;

  private readonly pluralSelector: (arg: number) => string;

  constructor(options) {
    super();

    this.options = { ...this.options, ...options.element.dataset };
    Object.keys(this.options).forEach((opt) => {
      if (this.options[opt] === 'true' || this.options[opt] === 'false') {
        this.options[opt] = this.options[opt] === 'true';
      }
    });

    const dropdowns = { ...this.options.dropdowns, ...options.dropdowns };
    const buttonText = { ...this.options.buttonText, ...options.buttonText };
    const tooltipText = { ...this.options.tooltipText, ...options.tooltipText };

    this.options = { ...this.options, ...options };
    this.options.dropdowns = { ...dropdowns };
    this.options.buttonText = { ...buttonText };
    this.options.tooltipText = { ...tooltipText };

    if (!this.options.elementEnd) {
      this.options.allowRepick = false;
    }

    if (isNotEmptyArray(this.options.lockDays)) {
      this.options.lockDays = DateTime.convertArray(
        this.options.lockDays,
        this.options.lockDaysFormat,
      );
    }

    if (this.options.highlightedDays.length) {
      this.options.highlightedDays = DateTime.convertArray(
        this.options.highlightedDays,
        this.options.highlightedDaysFormat,
      );
    }

    let [startValue, endValue] = this.parseInput();

    if (this.options.startDate) {
      if (this.options.singleMode || this.options.endDate) {
        startValue = new DateTime(
          this.options.startDate,
          this.options.format,
          this.options.lang,
        );
      }
    }

    if (startValue && this.options.endDate) {
      endValue = new DateTime(
        this.options.endDate,
        this.options.format,
        this.options.lang,
      );
    }

    if (startValue instanceof DateTime && !isNaN(startValue.getTime())) {
      this.options.startDate = startValue;
    }

    if (this.options.startDate && endValue instanceof DateTime && !isNaN(endValue.getTime())) {
      this.options.endDate = endValue;
    }

    if (this.options.singleMode && !(this.options.startDate instanceof DateTime)) {
      this.options.startDate = null;
    }
    if (!this.options.singleMode
      && (!(this.options.startDate instanceof DateTime)
        || !(this.options.endDate instanceof DateTime))) {
      this.options.startDate = null;
      this.options.endDate = null;
    }

    for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
      const date = this.options.startDate instanceof DateTime
        ? this.options.startDate.clone()
        : new DateTime();
      date.setDate(1);
      date.setMonth(date.getMonth() + idx);
      this.calendars[idx] = date;
    }

    if (this.options.showTooltip) {
      if (this.options.tooltipPluralSelector) {
        this.pluralSelector = this.options.tooltipPluralSelector;
      } else {
        try {
          const pluralRules = new Intl.PluralRules(this.options.lang);
          this.pluralSelector = pluralRules.select.bind(pluralRules);
        } catch {
          // fallback
          this.pluralSelector = (arg0: number) => {
            if (Math.abs(arg0) === 0) return 'one';
            return 'other';
          };
        }
      }
    }

    this.onInit();
  }

  private onInit() {
    document.addEventListener('click', e => this.onClick(e), true);

    this.picker = document.createElement('div');
    this.picker.className = style.litepicker;
    this.picker.style.display = 'none';
    this.picker.addEventListener('mouseenter', e => this.onMouseEnter(e), true);
    this.picker.addEventListener('mouseleave', e => this.onMouseLeave(e), false);

    if (this.options.autoRefresh) {
      if (this.options.element instanceof HTMLElement) {
        this.options.element.addEventListener('keyup', e => this.onInput(e), true);
      }
      if (this.options.elementEnd instanceof HTMLElement) {
        this.options.elementEnd.addEventListener('keyup', e => this.onInput(e), true);
      }
    } else {
      if (this.options.element instanceof HTMLElement) {
        this.options.element.addEventListener('change', e => this.onInput(e), true);
      }
      if (this.options.elementEnd instanceof HTMLElement) {
        this.options.elementEnd.addEventListener('change', e => this.onInput(e), true);
      }
    }

    if (this.options.keyboardNav) {
      this.picker.addEventListener('keydown', e => this.onKeyDown(e), true);

      if (this.options.element instanceof HTMLElement) {
        this.options.element.addEventListener('focus', e => this.onFocus(e), true);
      }
      if (this.options.elementEnd instanceof HTMLElement) {
        this.options.elementEnd.addEventListener('focus', e => this.onFocus(e), true);
      }

      if (this.options.element instanceof HTMLElement) {
        this.options.element.addEventListener('blur', e => this.onBlur(e), true);
      }
      if (this.options.elementEnd instanceof HTMLElement) {
        this.options.elementEnd.addEventListener('blur', e => this.onBlur(e), true);
      }
    }

    this.render();

    if (this.options.parentEl) {
      if (this.options.parentEl instanceof HTMLElement) {
        this.options.parentEl.appendChild(this.picker);
      } else {
        document.querySelector(this.options.parentEl).appendChild(this.picker);
      }
    } else {
      if (this.options.inlineMode) {
        if (this.options.element instanceof HTMLInputElement) {
          this.options.element.parentNode.appendChild(this.picker);
        } else {
          this.options.element.appendChild(this.picker);
        }
      } else {
        document.body.appendChild(this.picker);
      }
    }

    if (this.options.mobileFriendly) {
      this.backdrop = document.createElement('div');
      this.backdrop.className = style.litepickerBackdrop;
      this.backdrop.addEventListener('click', this.hide());
      if (this.options.element && this.options.element.parentNode) {
        this.options.element.parentNode.appendChild(this.backdrop);
      }

      window.addEventListener('orientationchange', (evt) => {
        // replace to screen.orientation.angle when Safari will support
        // https://caniuse.com/#feat=screen-orientation

        // get correct viewport after changing orientation
        // https://stackoverflow.com/a/49383279/2873909
        const afterOrientationChange = () => {
          if (isMobile() && this.isShowning()) {
            switch (getOrientation()) {
              case 'landscape':
                this.options.numberOfMonths = 2;
                this.options.numberOfColumns = 2;
                break;

              // portrait
              default:
                this.options.numberOfMonths = 1;
                this.options.numberOfColumns = 1;
                break;
            }

            this.render();

            if (!this.options.inlineMode) {
              const pickerBCR = this.picker.getBoundingClientRect();
              this.picker.style.top = `calc(50% - ${(pickerBCR.height / 2)}px)`;
              this.picker.style.left = `calc(50% - ${(pickerBCR.width / 2)}px)`;
            }
          }

          window.removeEventListener('resize', afterOrientationChange);
        };

        window.addEventListener('resize', afterOrientationChange);
      });
    }

    if (this.options.inlineMode) {
      this.show();

      if (this.options.mobileFriendly && isMobile()) {
        // force trigger orientationchange
        window.dispatchEvent(new Event('orientationchange'));
        window.dispatchEvent(new Event('resize'));
      }
    }

    this.updateInput();
  }

  private parseInput() {
    const delimiter = this.options.delimiter;
    const delimiterRegex = new RegExp(`${delimiter}`);
    const splittedValue = this.options.element instanceof HTMLInputElement
      ? this.options.element.value.split(delimiter)
      : [];

    if (this.options.elementEnd) {
      if (this.options.element instanceof HTMLInputElement
        && this.options.element.value.length
        && this.options.elementEnd instanceof HTMLInputElement
        && this.options.elementEnd.value.length) {
        return [
          new DateTime(this.options.element.value, this.options.format),
          new DateTime(this.options.elementEnd.value, this.options.format),
        ];
      }
    } else if (this.options.singleMode) {
      if (this.options.element instanceof HTMLInputElement
        && this.options.element.value.length) {
        return [
          new DateTime(this.options.element.value, this.options.format),
        ];
      }
    } else if (this.options.element instanceof HTMLInputElement
      && delimiterRegex.test(this.options.element.value)
      && splittedValue.length
      && splittedValue.length % 2 === 0) {

      const d1 = splittedValue.slice(0, splittedValue.length / 2).join(delimiter);
      const d2 = splittedValue.slice(splittedValue.length / 2).join(delimiter);

      return [
        new DateTime(d1, this.options.format),
        new DateTime(d2, this.options.format),
      ];
    }

    return [];
  }

  private updateInput() {
    if (!(this.options.element instanceof HTMLInputElement)) return;

    if (this.options.singleMode && this.options.startDate) {
      this.options.element.value = this.options.startDate
        .format(this.options.format, this.options.lang);
    } else if (!this.options.singleMode && this.options.startDate && this.options.endDate) {
      const startValue = this.options.startDate
        .format(this.options.format, this.options.lang);
      const endValue = this.options.endDate
        .format(this.options.format, this.options.lang);

      if (this.options.elementEnd) {
        this.options.element.value = startValue;
        this.options.elementEnd.value = endValue;
      } else {
        this.options.element.value = `${startValue}${this.options.delimiter}${endValue}`;
      }
    }

    if (!this.options.startDate && !this.options.endDate) {
      this.options.element.value = '';

      if (this.options.elementEnd) {
        this.options.elementEnd.value = '';
      }
    }
  }

  private isSamePicker(el) {
    const picker = el.closest(`.${style.litepicker}`);

    return picker === this.picker;
  }

  private shouldShown(el) {
    return el === this.options.element
      || (this.options.elementEnd && el === this.options.elementEnd);
  }

  private shouldResetDatePicked() {
    return this.options.singleMode || this.datePicked.length === 2;
  }

  private shouldSwapDatePicked() {
    return this.datePicked.length === 2
      && this.datePicked[0].getTime() > this.datePicked[1].getTime();
  }

  private shouldCheckLockDays() {
    return this.options.disallowLockDaysInRange
      && this.datePicked.length === 2;
  }

  private onClick(e) {
    const target = e.target as HTMLElement;

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

      if (this.shouldResetDatePicked()) {
        this.datePicked.length = 0;
      }

      this.datePicked[this.datePicked.length] = new DateTime(target.dataset.time);

      if (this.shouldSwapDatePicked()) {
        const tempDate = this.datePicked[1].clone();
        this.datePicked[1] = this.datePicked[0].clone();
        this.datePicked[0] = tempDate.clone();
      }

      if (this.shouldCheckLockDays()) {
        const locked = rangeIsLocked(this.datePicked, this.options);

        if (locked) {
          this.datePicked.length = 0;

          if (typeof this.options.onError === 'function') {
            this.options.onError.call(this, 'INVALID_RANGE');
          }
        }
      }

      this.render();

      if (!this.options.singleMode) {
        if (typeof this.options.onSelectStart === 'function' && this.datePicked.length === 1) {
          this.options.onSelectStart.call(this, this.datePicked[0].clone());
        }

        if (typeof this.options.onSelectEnd === 'function' && this.datePicked.length === 2) {
          this.options.onSelectEnd.call(
            this,
            this.datePicked[0].clone(),
            this.datePicked[1].clone(),
          );
        }
      }

      if (this.options.autoApply) {
        if (this.options.singleMode && this.datePicked.length) {
          this.setDate(this.datePicked[0]);
          this.hide();
        } else if (!this.options.singleMode && this.datePicked.length === 2) {
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
      let numberOfMonths = this.options.switchingMonths || this.options.numberOfMonths;

      if (this.options.splitView) {
        const monthItem = target.closest(`.${style.monthItem}`);
        idx = findNestedMonthItem(monthItem);
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
      let numberOfMonths = this.options.switchingMonths || this.options.numberOfMonths;

      if (this.options.splitView) {
        const monthItem = target.closest(`.${style.monthItem}`);
        idx = findNestedMonthItem(monthItem);
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

      if (typeof this.options.onCancelButton === 'function') {
        this.options.onCancelButton.call(this);
      }
    }

    // Click on button apply
    if (target.classList.contains(style.buttonApply)) {
      e.preventDefault();

      if (!this.isSamePicker(target)) {
        return;
      }

      if (this.options.singleMode && this.datePicked.length) {
        this.setDate(this.datePicked[0]);
      } else if (!this.options.singleMode && this.datePicked.length === 2) {
        this.setDateRange(this.datePicked[0], this.datePicked[1]);
      }

      this.hide();

      if (typeof this.options.onApplyButton === 'function') {
        this.options.onApplyButton.call(this, this.options.startDate, this.options.endDate);
      }
    }
  }

  private showTooltip(element, text) {
    const tooltip = this.picker.querySelector(`.${style.containerTooltip}`) as HTMLElement;
    tooltip.style.visibility = 'visible';
    tooltip.innerHTML = text;

    const pickerBCR = this.picker.getBoundingClientRect();
    const tooltipBCR = tooltip.getBoundingClientRect();
    const dayBCR = element.getBoundingClientRect();
    let top = dayBCR.top;
    let left = dayBCR.left;

    if (this.options.inlineMode && this.options.parentEl) {
      const parentBCR = (this.picker.parentNode as HTMLElement).getBoundingClientRect();
      top -= parentBCR.top;
      left -= parentBCR.left;
    } else {
      top -= pickerBCR.top;
      left -= pickerBCR.left;
    }

    top -= tooltipBCR.height;
    left -= tooltipBCR.width / 2;
    left += dayBCR.width / 2;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    if (typeof this.options.onShowTooltip === 'function') {
      this.options.onShowTooltip.call(
        this,
        tooltip,
        element,
      );
    }
  }

  private hideTooltip() {
    const tooltip = this.picker.querySelector(`.${style.containerTooltip}`) as HTMLElement;
    tooltip.style.visibility = 'hidden';
  }

  private shouldAllowMouseEnter(el: HTMLElement) {
    return !this.options.singleMode
      && !el.classList.contains(style.isLocked);
  }

  private shouldAllowRepick() {
    return this.options.elementEnd
      && this.options.allowRepick
      && this.options.startDate
      && this.options.endDate;
  }

  private isDayItem(el: HTMLElement) {
    return el.classList.contains(style.dayItem);
  }

  private onMouseEnter(event) {
    const target = event.target as HTMLElement;
    if (!this.isDayItem(target)) {
      return;
    }

    if (typeof this.options.onDayHover === 'function') {
      this.options.onDayHover.call(
        this,
        DateTime.parseDateTime(target.dataset.time),
        target.classList.toString().split(/\s/),
        target,
      );
    }

    if (this.shouldAllowMouseEnter(target)) {
      if (this.shouldAllowRepick()) {
        if (this.triggerElement === this.options.element) {
          this.datePicked[0] = this.options.endDate.clone();
        } else if (this.triggerElement === this.options.elementEnd) {
          this.datePicked[0] = this.options.startDate.clone();
        }
      }

      if (this.datePicked.length !== 1) {
        return;
      }

      const startDateElement = this.picker
        .querySelector(`.${style.dayItem}[data-time="${this.datePicked[0].getTime()}"]`);
      let date1 = this.datePicked[0].clone();
      let date2 = new DateTime(target.dataset.time);
      let isFlipped = false;

      if (date1.getTime() > date2.getTime()) {
        const tempDate = date1.clone();
        date1 = date2.clone();
        date2 = tempDate.clone();
        isFlipped = true;
      }
      const allDayItems = Array.prototype.slice.call(this.picker.querySelectorAll(`.${style.dayItem}`));
      allDayItems.forEach((d: HTMLElement) => {
        const date = new DateTime(d.dataset.time);
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
      } else {
        if (startDateElement) {
          startDateElement.classList.remove(style.isFlipped);
        }
        target.classList.remove(style.isFlipped);
      }

      if (this.options.showTooltip) {
        let days = date2.diff(date1, 'day') + 1;

        if (typeof this.options.showTooltip === 'function') {
          days = this.options.showTooltip.call(this, days);
        }

        if (days > 0) {
          const pluralName = this.pluralSelector(days);
          const pluralText = this.options.tooltipText[pluralName]
            ? this.options.tooltipText[pluralName]
            : `[${pluralName}]`;
          const text = `${days} ${pluralText}`;

          this.showTooltip(target, text);
        } else {
          this.hideTooltip();
        }
      }
    }
  }

  private onMouseLeave(event) {
    const target = event.target as any;

    if (!this.options.allowRepick
      || (this.options.allowRepick && !this.options.startDate && !this.options.endDate)) {
      return;
    }

    this.datePicked.length = 0;
    this.render();
  }
  private onInput(event) {
    let [startValue, endValue] = this.parseInput();
    let isValid = false;
    const dateFormat = this.options.format;

    if (this.options.elementEnd) {
      isValid = startValue instanceof DateTime
        && endValue instanceof DateTime
        && startValue.format(dateFormat) === this.options.element.value
        && endValue.format(dateFormat) === this.options.elementEnd.value;
    } else if (this.options.singleMode) {
      isValid = startValue instanceof DateTime
        && startValue.format(dateFormat) === this.options.element.value;
    } else {
      isValid = startValue instanceof DateTime
        && endValue instanceof DateTime
        // tslint:disable-next-line: max-line-length
        && `${startValue.format(dateFormat)}${this.options.delimiter}${endValue.format(dateFormat)}` === this.options.element.value;
    }

    if (isValid) {
      if (endValue && startValue.getTime() > endValue.getTime()) {
        const tempDate = startValue.clone();
        startValue = endValue.clone();
        endValue = tempDate.clone();
      }

      this.options.startDate = new DateTime(
        startValue,
        this.options.format,
        this.options.lang,
      );

      if (endValue) {
        this.options.endDate = new DateTime(
          endValue,
          this.options.format,
          this.options.lang,
        );
      }

      this.updateInput();
      this.render();

      let dateGo = startValue.clone();
      let monthIdx = 0;
      let isStart = true;

      if (this.options.elementEnd) {
        isStart = startValue.format(dateFormat) === event.target.value;
      } else {
        isStart = event.target.value.startsWith(startValue.format(dateFormat));
      }

      if (!isStart) {
        dateGo = endValue.clone();
        monthIdx = this.options.numberOfMonths - 1;
      }

      if (typeof this.options.onSelect === 'function') {
        this.options.onSelect.call(this, this.getStartDate(), this.getEndDate());
      }

      this.gotoDate(dateGo, monthIdx);
    }
  }

  private isShowning() {
    return this.picker && this.picker.style.display !== 'none';
  }

  private onFocus(evt) {
    if (this.options.inlineMode) {
      return;
    }

    if (this.isShowning()) {
      return;
    }

    this.show(evt.target);
  }

  private onBlur(evt) {
    if (this.options.inlineMode) {
      return;
    }

    // get next focusable element
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;

      if (!this.picker.contains(activeElement)) {
        this.nextFocus = activeElement;
      }

      const focusEl = this.picker.querySelector('[tabindex="1"]') as HTMLElement;
      focusEl.focus();
    });
  }

  private onKeyDown(evt) {
    const target = evt.target as any;

    setTimeout(() => {
      this.onMouseEnter({ target: document.activeElement });
    });

    switch (evt.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.handleArrowUpDown(target, evt);
        break;

      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleArrowLeftRight(target, evt);
        break;

      case 'Tab':
        this.handleTab(target, evt);
        break;

      case 'Enter':
      case 'Space':
        this.handleEnter(evt);
        break;
    }
  }

  private handleEnter(evt) {
    document.activeElement.dispatchEvent(new Event('click'));

    setTimeout(() => {
      const focusEl = this.picker.querySelector('[tabindex="2"]') as HTMLElement;
      focusEl.focus();
    });
  }

  private handleTab(target, evt) {
    setTimeout(() => {
      const currentElement = document.activeElement;

      if (!currentElement.closest(`.${style.litepicker}`)) {
        let focusEl = this.picker.querySelector('[tabindex="1"]') as HTMLElement;

        if (target === focusEl) {
          // @TODO bug: not focused to last day by Shift+Tab
          const elms = this.picker.querySelectorAll('[tabindex="2"]');
          focusEl = elms[elms.length - 1] as HTMLElement;
        }

        focusEl.focus();
      }
    });
  }

  private handleArrowUpDown(target: HTMLElement, evt) {
    if (target.classList.contains(style.dayItem)) {
      evt.preventDefault();

      const nextElement = findAllowableDaySibling(this.picker, target, (idx, targetIdx) => {
        // tslint:disable-next-line: no-parameter-reassignment
        targetIdx = evt.code === 'ArrowUp' ? targetIdx - 7 : targetIdx + 7;
        return idx === targetIdx;
      }) as HTMLElement;

      if (nextElement) {
        nextElement.focus();
      }
    }
  }

  private handleArrowLeftRight(target: HTMLElement, evt) {
    if (target.classList.contains(style.dayItem)) {
      evt.preventDefault();

      const nextElement = findAllowableDaySibling(this.picker, target, (idx, targetIdx) => {
        // tslint:disable-next-line: no-parameter-reassignment
        targetIdx = evt.code === 'ArrowLeft' ? targetIdx - 1 : targetIdx + 1;
        return idx === targetIdx;
      }) as HTMLElement;

      if (nextElement) {
        nextElement.focus();
      } else {
        this.changeMonth(evt);
      }
    }
  }

  private changeMonth(evt) {
    const buttons = {
      ArrowLeft: `.${style.buttonPreviousMonth}`,
      ArrowRight: `.${style.buttonNextMonth}`,
    };

    const button = this.picker.querySelector(buttons[evt.code]);
    if (button) {
      button.dispatchEvent(new Event('click'));
    }

    setTimeout(() => {
      let focusEl = null;

      switch (evt.code) {
        case 'ArrowLeft':
          const elms = this.picker.querySelectorAll('[tabindex="2"]');
          focusEl = elms[elms.length - 1] as HTMLElement;
          break;

        case 'ArrowRight':
          focusEl = this.picker.querySelector('[tabindex="2"]') as HTMLElement;
          break;
      }
      focusEl.focus();
    });
  }

}
