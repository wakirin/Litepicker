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
    autoApply: true,
    allowRepick: false,
    showWeekNumbers: false,
    showTooltip: true,
    hotelMode: false,
    disableWeekends: false,
    scrollToDate: true,
    mobileFriendly: true,
    useResetBtn: false,

    lockDaysFormat: 'YYYY-MM-DD',
    lockDays: [],
    disallowLockDaysInRange: false,
    lockDaysInclusivity: '[]',

    bookedDaysFormat: 'YYYY-MM-DD',
    bookedDays: [],
    disallowBookedDaysInRange: false,
    bookedDaysInclusivity: '[]',
    anyBookedDaysAsCheckout: false,

    dropdowns: {
      minYear: 1990,
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

    // Events
    onShow: null,
    onHide: null,
    onSelect: null,
    onError: null,
    onRender: null,
    onChangeMonth: null,
    onChangeYear: null,
  };
  protected calendars: DateTime[] = [];
  protected picker: HTMLElement;
  protected datePicked: DateTime[] = [];

  protected render() {
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
      dateIterator.setDate(1);

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

    if (typeof this.options.onRender === 'function') {
      this.options.onRender.call(this);
    }
  }

  protected renderMonth(date: DateTime) {
    const startDate = date.clone();

    const totalDays = 32 - new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();

    const month = document.createElement('div');
    month.className = style.monthItem;

    const monthHeader = document.createElement('div');
    monthHeader.className = style.monthItemHeader;

    const monthAndYear = document.createElement('div');

    if (this.options.dropdowns.months) {
      const selectMonths = document.createElement('select');
      selectMonths.className = style.monthItemName;

      for (let x = 0; x < 12; x += 1) {
        const option = document.createElement('option');
        const optionMonth = new DateTime(new Date(date.getFullYear(), x, 1, 0, 0, 0));

        option.value = String(x);
        option.text = optionMonth.toLocaleString(this.options.lang, { month: 'long' });
        option.disabled = (this.options.minDate
          && optionMonth.isBefore(new DateTime(this.options.minDate), 'month'))
          || (this.options.maxDate && optionMonth.isBefore(new DateTime(this.options.maxDate), 'month'));
        option.selected = optionMonth.getMonth() === date.getMonth();

        selectMonths.appendChild(option);
      }

      selectMonths.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;

        let idx = 0;

        if (this.options.splitView) {
          const monthItem = target.closest(`.${style.monthItem}`);
          idx = [...monthItem.parentNode.childNodes].findIndex(el => el === monthItem);
        }

        this.calendars[idx].setMonth(Number(target.value));
        this.render();

        if (typeof this.options.onChangeMonth === 'function') {
          this.options.onChangeMonth.call(this, this.calendars[idx], idx);
        }
      });

      monthAndYear.appendChild(selectMonths);
    } else {
      const monthName = document.createElement('strong');
      monthName.className = style.monthItemName;
      monthName.innerHTML = date.toLocaleString(this.options.lang, { month: 'long' });
      monthAndYear.appendChild(monthName);
    }

    if (this.options.dropdowns.years) {
      const selectYears = document.createElement('select');
      selectYears.className = style.monthItemYear;

      const minYear = this.options.dropdowns.minYear;
      const maxYear = this.options.dropdowns.maxYear
        ? this.options.dropdowns.maxYear
        : (new Date()).getFullYear();

      if (date.getFullYear() > maxYear) {
        const option = document.createElement('option');
        option.value = String(date.getFullYear());
        option.text = String(date.getFullYear());
        option.selected = true;
        option.disabled = true;

        selectYears.appendChild(option);
      }

      for (let x = maxYear; x >= minYear; x -= 1) {
        const option = document.createElement('option');
        const optionYear = new DateTime(new Date(x, 0, 1, 0, 0, 0));
        option.value = x;
        option.text = x;
        option.disabled = (this.options.minDate
          && optionYear.isBefore(new DateTime(this.options.minDate), 'month'))
          || (this.options.maxDate && optionYear.isBefore(new DateTime(this.options.maxDate), 'month'));
        option.selected = date.getFullYear() === x;

        selectYears.appendChild(option);
      }

      selectYears.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;

        let idx = 0;

        if (this.options.splitView) {
          const monthItem = target.closest(`.${style.monthItem}`);
          idx = [...monthItem.parentNode.childNodes].findIndex(el => el === monthItem);
        }

        this.calendars[idx].setFullYear(Number(target.value));
        this.render();

        if (typeof this.options.onChangeYear === 'function') {
          this.options.onChangeYear.call(this, this.calendars[idx], idx);
        }
      });

      monthAndYear.appendChild(selectYears);
    } else {
      const monthYear = document.createElement('span');
      monthYear.className = style.monthItemYear;
      monthYear.innerHTML = String(date.getFullYear());
      monthAndYear.appendChild(monthYear);
    }

    const previousMonthButton = document.createElement('a');
    previousMonthButton.href = '#';
    previousMonthButton.className = style.buttonPreviousMonth;
    previousMonthButton.innerHTML = this.options.buttonText.previousMonth;

    const nextMonthButton = document.createElement('a');
    nextMonthButton.href = '#';
    nextMonthButton.className = style.buttonNextMonth;
    nextMonthButton.innerHTML = this.options.buttonText.nextMonth;

    const resetButton = document.createElement('span');
    resetButton.className = style.resetButton;
    resetButton.innerHTML = this.options.buttonText.reset;

    monthHeader.appendChild(previousMonthButton);
    monthHeader.appendChild(monthAndYear);
    monthHeader.appendChild(nextMonthButton);

    if (this.options.useResetBtn) {
      monthHeader.appendChild(resetButton);
    }

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
    } else if (this.options.startDate) {
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
            return date.isBetween(d[0], d[1], this.options.lockDaysInclusivity);
          }

          return d.isSame(date, 'day');
        }).length;

      if (locked) {
        day.classList.add(style.isLocked);
      }
    }

    if (this.datePicked.length <= 1
      && this.options.bookedDays.length) {
      let inclusivity = this.options.bookedDaysInclusivity;

      if (this.options.hotelMode && this.datePicked.length === 1) {
        inclusivity = '()';
      }

      const dateBefore = date.clone();
      dateBefore.subtract(1, 'day');

      const dateAfter = date.clone();
      dateAfter.add(1, 'day');

      const booked = this.dateIsBooked(date, inclusivity);
      const isBookedBefore = this.dateIsBooked(dateBefore, '[]');
      const isCheckInAndCheckOut = this.dateIsBooked(date, '(]');
      // const isBookedAfter = this.dateIsBooked(dateAfter, '[]');

      const shouldBooked = (this.datePicked.length === 0 && booked)
        || (this.datePicked.length === 1 && isBookedBefore && booked)
        || (this.datePicked.length === 1 && isBookedBefore && isCheckInAndCheckOut);

      const anyBookedDaysAsCheckout = this.options.anyBookedDaysAsCheckout
        && this.datePicked.length === 1;

      if (shouldBooked && !anyBookedDaysAsCheckout) {
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

  protected dateIsBooked(date, inclusivity) {
    return this.options.bookedDays
      .filter((d) => {
        if (d instanceof Array) {
          return date.isBetween(d[0], d[1], inclusivity);
        }

        return d.isSame(date, 'day');
      }).length;
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
