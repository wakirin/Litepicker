import { LPCore } from './core';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
import * as style from './scss/main.scss';
import { dateIsLocked, findNestedMonthItem } from './utils';

export class Calendar extends LPCore {
  constructor(options: ILPConfiguration) {
    super(options);
    //
  }

  protected render() {
    this.emit('before:render', this.ui);

    const mainBlock = document.createElement('div');
    mainBlock.className = style.containerMain;
    const months = document.createElement('div');
    months.className = style.containerMonths;

    if (style[`columns${this.options.numberOfColumns}`]) {
      months.classList.remove(style.columns2, style.columns3, style.columns4, style.columns5, style.columns6, style.columns7, style.columns8, style.columns9, style.columns10, style.columns11, style.columns12);
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
      dateIterator.setHours(0, 0, 0, 0);

      if (this.options.splitView) {
        dateIterator = this.calendars[calendarIdx].clone();
      } else {
        dateIterator.setMonth(idx);
      }

      months.appendChild(this.renderMonth(dateIterator, calendarIdx));

      calendarIdx += 1;
    }

    this.ui.innerHTML = '';

    mainBlock.appendChild(months);

    if (this.options.resetButton) {
      let resetButton;
      if (typeof this.options.resetButton === 'function') {
        resetButton = this.options.resetButton.call(this);
      } else {
        resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.className = style.resetButton;
        resetButton.innerHTML = this.options.buttonText.reset;
      }

      resetButton.addEventListener('click', (e) => {
        e.preventDefault();

        // tslint:disable-next-line: no-string-literal
        this['clearSelection']();
      });

      mainBlock
        .querySelector(`.${style.monthItem}:last-child`)
        .querySelector(`.${style.monthItemHeader}`)
        .appendChild(resetButton);
    }

    this.ui.appendChild(mainBlock);

    if (!this.options.autoApply || this.options.footerHTML) {
      this.ui.appendChild(this.renderFooter());
    }

    if (this.options.showTooltip) {
      this.ui.appendChild(this.renderTooltip());
    }

    this.ui.dataset.plugins = (this.options.plugins || []).join('|');

    this.emit('render', this.ui);
  }

  protected renderMonth(date: DateTime, calendarIdx: number) {
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
        // day 2 because iOS bug with `toLocaleString`
        // https://github.com/wakirin/Litepicker/issues/113
        const monthName = new DateTime(new Date(date.getFullYear(), x, 2, 0, 0, 0));
        const optionMonth = new DateTime(new Date(date.getFullYear(), x, 1, 0, 0, 0));

        option.value = String(x);
        option.text = monthName.toLocaleString(this.options.lang, { month: 'long' });
        option.disabled = (this.options.minDate
          && optionMonth.isBefore(new DateTime(this.options.minDate), 'month'))
          || (this.options.maxDate && optionMonth.isAfter(new DateTime(this.options.maxDate), 'month'));
        option.selected = optionMonth.getMonth() === date.getMonth();

        selectMonths.appendChild(option);
      }

      selectMonths.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;

        let idx = 0;

        if (this.options.splitView) {
          const monthItem = target.closest(`.${style.monthItem}`);
          idx = findNestedMonthItem(monthItem);
        }

        this.calendars[idx].setMonth(Number(target.value));
        this.render();

        this.emit('change:month', this.calendars[idx], idx, e);
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
        option.value = String(x);
        option.text = String(x);
        option.disabled = (this.options.minDate
          && optionYear.isBefore(new DateTime(this.options.minDate), 'year'))
          || (this.options.maxDate
            && optionYear.isAfter(new DateTime(this.options.maxDate), 'year'));
        option.selected = date.getFullYear() === x;

        selectYears.appendChild(option);
      }

      if (date.getFullYear() < minYear) {
        const option = document.createElement('option');
        option.value = String(date.getFullYear());
        option.text = String(date.getFullYear());
        option.selected = true;
        option.disabled = true;

        selectYears.appendChild(option);
      }

      if (this.options.dropdowns.years === 'asc') {
        const childs = Array.prototype.slice.call(selectYears.childNodes);
        const options = childs.reverse();
        selectYears.innerHTML = '';
        options.forEach((y) => {
          y.innerHTML = y.value;
          selectYears.appendChild(y);
        });
      }

      selectYears.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;

        let idx = 0;

        if (this.options.splitView) {
          const monthItem = target.closest(`.${style.monthItem}`);
          idx = findNestedMonthItem(monthItem);
        }

        this.calendars[idx].setFullYear(Number(target.value));
        this.render();

        this.emit('change:year', this.calendars[idx], idx, e);
      });

      monthAndYear.appendChild(selectYears);
    } else {
      const monthYear = document.createElement('span');
      monthYear.className = style.monthItemYear;
      monthYear.innerHTML = String(date.getFullYear());
      monthAndYear.appendChild(monthYear);
    }

    const previousMonthButton = document.createElement('button');
    previousMonthButton.type = 'button';
    previousMonthButton.className = style.buttonPreviousMonth;
    previousMonthButton.innerHTML = this.options.buttonText.previousMonth;

    const nextMonthButton = document.createElement('button');
    nextMonthButton.type = 'button';
    nextMonthButton.className = style.buttonNextMonth;
    nextMonthButton.innerHTML = this.options.buttonText.nextMonth;

    monthHeader.appendChild(previousMonthButton);
    monthHeader.appendChild(monthAndYear);
    monthHeader.appendChild(nextMonthButton);

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

    this.emit('render:month', month, date);

    return month;
  }

  protected renderDay(date: DateTime) {
    date.setHours();

    const day = document.createElement('div');
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
      const startDate = this.options.startDate as DateTime;
      const endDate = this.options.endDate as DateTime;

      if (startDate.toDateString() === date.toDateString()) {
        day.classList.add(style.isStartDate);

        if (this.options.singleMode) {
          day.classList.add(style.isEndDate);
        }
      }

      if (endDate && endDate.toDateString() === date.toDateString()) {
        day.classList.add(style.isEndDate);
      }

      if (startDate && endDate) {
        if (date.isBetween(startDate, endDate)) {
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

    if (this.options.minDays > 1
      && this.datePicked.length === 1) {
      const minDays = this.options.minDays - 1; // subtract selected day
      const left = this.datePicked[0].clone().subtract(minDays, 'day');
      const right = this.datePicked[0].clone().add(minDays, 'day');

      if (date.isBetween(left, this.datePicked[0], '(]')) {
        day.classList.add(style.isLocked);
      }

      if (date.isBetween(this.datePicked[0], right, '[)')) {
        day.classList.add(style.isLocked);
      }
    }

    if (this.options.maxDays
      && this.datePicked.length === 1) {
      const maxDays = this.options.maxDays;
      const left = this.datePicked[0].clone().subtract(maxDays, 'day');
      const right = this.datePicked[0].clone().add(maxDays, 'day');

      if (date.isSameOrBefore(left)) {
        day.classList.add(style.isLocked);
      }

      if (date.isSameOrAfter(right)) {
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

    const locked = dateIsLocked(date, this.options, this.datePicked);

    if (locked) {
      day.classList.add(style.isLocked);
    }

    if (this.options.highlightedDays.length) {
      const isHighlighted = this.options.highlightedDays
        .filter((d) => {
          if (d instanceof Array) {
            return date.isBetween(d[0], d[1], '[]');
          }

          return d.isSame(date, 'day');
        }).length;

      if (isHighlighted) {
        day.classList.add(style.isHighlighted);
      }
    }

    // fix bug iOS 10-12 - https://github.com/wakirin/Litepicker/issues/124
    day.tabIndex = !day.classList.contains('is-locked') ? 0 : -1;

    this.emit('render:day', day, date);

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
          .innerHTML = `${startValue}${this.options.delimiter}${endValue}`;
      }
    }

    this.emit('render:footer', footer);

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
