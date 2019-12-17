import { DateTime } from './datetime';
import * as style from './scss/main.scss';

export class Calendar {
  protected options: any = {
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
    isRtl: false,
    autoApply: true,
    allowRepick: false,
    showWeekNumbers: false,
    showTooltip: true,
    hotelMode: false,
    disableWeekends: false,
    scrollToDate: true,
    mobileFriendly: true,

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
  protected calendars: DateTime[] = [];
  protected picker: HTMLElement;
  protected datePicked: DateTime[] = [];

  protected render() {
    if (this.options.isRtl) {
      this.options.previousMonth = '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
      this.options.nextMonth = '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>'
    }

    const months = document.createElement('div');
    months.className = style.containerMonths;

    if (style[`columns${this.options.numberOfColumns}`]) {
      months.classList.remove(style.columns2, style.columns3, style.columns4);
      months.classList.add(style[`columns${this.options.numberOfColumns}`]);
    }

    if (this.options.splitView) {
      months.classList.add(style.splitView);
    }

    if (this.options.showWeekNumbers) {
      months.classList.add(style.showWeekNumbers);
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
      } else {
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

  protected renderMonth(date: DateTime) {
    const startDate = date.clone();
    startDate.setDate(1);

    const totalDays = 32 - new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();

    const month = document.createElement('div');
    month.className = style.monthItem;

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
      && startDate.isSameOrBefore(new DateTime(this.options.minDate), 'month')) {
      month.classList.add(style.noPreviousMonth);
    }

    if (this.options.maxDate
      && startDate.isSameOrAfter(new DateTime(this.options.maxDate), 'month')) {
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

  protected renderDay(date: DateTime) {
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
        if (this.options.isRtl) {
          day.classList.add(style.isFlipped);
        }

        if (this.options.singleMode) {
          day.classList.add(style.isEndDate);
        }
      }

      if (this.datePicked.length === 2
        && this.datePicked[1].toDateString() === date.toDateString()) {
        day.classList.add(style.isEndDate);
        if (this.options.isRtl) {
          day.classList.add(style.isFlipped);
        }
      }

      if (this.datePicked.length === 2) {
        if (date.isBetween(this.datePicked[0], this.datePicked[1])) {
          day.classList.add(style.isInRange);
        }
      }
    } else if (this.options.startDate) {
      if (this.options.startDate.toDateString() === date.toDateString()) {
        day.classList.add(style.isStartDate);
        if (this.options.isRtl) {
          day.classList.add(style.isFlipped);
        }

        if (this.options.singleMode) {
          day.classList.add(style.isEndDate);
        }
      }

      if (this.options.endDate && this.options.endDate.toDateString() === date.toDateString()) {
        day.classList.add(style.isEndDate);
        if (this.options.isRtl) {
          day.classList.add(style.isFlipped);
        }
      }

      if (this.options.startDate && this.options.endDate) {
        if (date.isBetween(this.options.startDate, this.options.endDate)) {
          day.classList.add(style.isInRange);
        }
      }
    }

    if (this.options.minDate && date.isBefore(new DateTime(this.options.minDate))) {
      day.classList.add(style.isLocked);
    }

    if (this.options.maxDate && date.isAfter(new DateTime(this.options.maxDate))) {
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

  protected renderFooter() {
    const footer = document.createElement('div');
    footer.className = style.containerFooter;

    if (this.options.footerHTML) {
      footer.innerHTML = this.options.footerHTML;
    } else {
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
    } else {
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

  protected renderWeekNumber(date) {
    const wn = document.createElement('div');
    const week = date.getWeek(this.options.firstDay);
    wn.className = style.weekNumber;
    wn.innerHTML = week === 53 && date.getMonth() === 0 ? '53 / 1' : week;

    return wn;
  }

  protected renderTooltip() {
    const t = document.createElement('div');
    t.className = style.containerTooltip;

    return t;
  }

  private weekdayName(day, representation = 'short') {
    return new Date(1970, 0, day, 12, 0, 0, 0)
      .toLocaleString(this.options.lang, { weekday: representation });
  }

  private calcSkipDays(date) {
    let total = date.getDay() - this.options.firstDay;
    if (total < 0) total += 7;

    return total;
  }
}
