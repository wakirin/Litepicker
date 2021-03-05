import { EventEmitter } from 'events';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
import { Litepicker } from './litepicker';

export class LPCore extends EventEmitter {

  public static add(name: string, data: object): void {
    Litepicker.prototype[name] = data;
  }

  protected plugins: string[];
  protected ui: HTMLElement;
  protected datePicked: DateTime[] = [];
  protected nextFocusElement: HTMLElement;
  protected calendars: DateTime[] = [];
  protected readonly pluralSelector: (arg: number) => string;

  protected options: ILPConfiguration = {
    element: null,
    elementEnd: null,
    parentEl: null,
    // tslint:disable-next-line: object-literal-sort-keys
    firstDay: 1,
    format: 'YYYY-MM-DD',
    lang: 'en-US',
    delimiter: ' - ',
    numberOfMonths: 1,
    numberOfColumns: 1,
    startDate: null,
    endDate: null,
    zIndex: 9999,
    position: 'auto',

    selectForward: false,
    selectBackward: false,
    splitView: false,
    inlineMode: false,
    singleMode: true,
    autoApply: true,
    allowRepick: false,
    showWeekNumbers: false,
    showTooltip: true,
    scrollToDate: true,
    mobileFriendly: true,
    resetButton: false,
    autoRefresh: false,

    lockDaysFormat: 'YYYY-MM-DD',
    lockDays: [],
    disallowLockDaysInRange: false,
    lockDaysInclusivity: '[]',

    highlightedDaysFormat: 'YYYY-MM-DD',
    highlightedDays: [],

    dropdowns: {
      minYear: 1990,
      // tslint:disable-next-line: object-literal-sort-keys
      maxYear: null,
      months: false,
      years: false,
    },

    buttonText: {
      apply: 'Apply',
      cancel: 'Cancel',
      previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
      nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
      reset: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>`,
    },
    tooltipText: {
      one: 'day',
      other: 'days',
    },
  };

  constructor(options: ILPConfiguration) {
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

    if (this.options.lockDays.length) {
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
      let date = this.options.startDate instanceof DateTime
        ? this.options.startDate.clone()
        : new DateTime();

      if (!this.options.startDate && (idx === 0 || this.options.splitView)) {
        const maxDate = this.options.maxDate ? new DateTime(this.options.maxDate) : null;
        const minDate = this.options.minDate ? new DateTime(this.options.minDate) : null;
        const offsetMonths = this.options.numberOfMonths - 1;

        const isDateRange = minDate && maxDate && date.isAfter(maxDate);

        if (isDateRange) {
          date = minDate.clone();
          date.setDate(1);
        } else if (!minDate && maxDate && date.isAfter(maxDate)) {
          date = maxDate.clone();
          date.setDate(1);
          date.setMonth(date.getMonth() - offsetMonths);
        }
      }

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
  }

  // tslint:disable-next-line: function-name
  public DateTime(date, format?): DateTime {
    if (date) {
      return new DateTime(date, format);
    }

    return new DateTime();
  }

  protected init() {
    if (this.options.plugins && this.options.plugins.length) {
      this.options.plugins.forEach((plugin) => {
        if (Litepicker.prototype.hasOwnProperty(plugin)) {
          Litepicker.prototype[plugin].init.call(this, this);
        } else {
          console.warn(`Litepicker: plugin «${plugin}» not found.`);
        }
      });
    }
  }

  protected parseInput() {
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

  protected isShowning() {
    return this.ui && this.ui.style.display !== 'none';
  }

  protected findPosition(element) {
    const rect = element.getBoundingClientRect();
    const calRect = this.ui.getBoundingClientRect();
    const orientation = this.options.position.split(' ');
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    if (orientation[0] === 'auto' || !(/top|bottom/.test(orientation[0]))) {
      top = rect.bottom + scrollY;

      const isOutBounds = rect.bottom + calRect.height > window.innerHeight;
      const hasTopSpace = (rect.top + scrollY) - calRect.height >= calRect.height;
      if (isOutBounds && hasTopSpace) {
        top = (rect.top + scrollY) - calRect.height;
      }
    } else {
      top = rect[orientation[0]] + scrollY;

      if (orientation[0] === 'top') {
        top -= calRect.height;
      }
    }

    if (!(/left|right/.test(orientation[0])) && (!orientation[1] || orientation[1] === 'auto' || !(/left|right/.test(orientation[1])))) {
      left = rect.left + scrollX;

      const isOutBounds = rect.left + calRect.width > window.innerWidth;
      const hasLeftSpace = (rect.right + scrollX) - calRect.width >= 0;
      if (isOutBounds && hasLeftSpace) {
        left = (rect.right + scrollX) - calRect.width;
      }
    } else {
      if (/left|right/.test(orientation[0])) {
        left = rect[orientation[0]] + scrollX;
      } else {
        left = rect[orientation[1]] + scrollX;
      }

      if (orientation[0] === 'right' || orientation[1] === 'right') {
        left -= calRect.width;
      }
    }

    return {
      left,
      top,
    };
  }
}
