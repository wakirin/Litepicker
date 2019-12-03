import { DateTime } from './datetime';
import { Litepicker } from './litepicker';
import * as style from './scss/main.scss';
import { getOrientation, isMobile } from './utils';

declare module './litepicker' {
  interface Litepicker {
    show(element?);
    hide();

    getDate();
    getStartDate();
    getEndDate();

    setDate(date);
    setStartDate(date);
    setEndDate(date);
    setDateRange(date1, date2);

    setLockDays(array);
    setBookedDays(array);

    gotoDate(date, idx);

    setOptions(options);

    destroy();
  }
}

Litepicker.prototype.show = function (el = null) {
  if (this.options.inlineMode) {
    this.picker.style.position = 'static';
    this.picker.style.display = 'inline-block';
    this.picker.style.top = null;
    this.picker.style.left = null;
    this.picker.style.bottom = null;
    this.picker.style.right = null;
    return;
  }

  if (this.options.scrollToDate) {
    if (this.options.startDate && (!el || el === this.options.element)) {
      this.calendars[0] = this.options.startDate.clone();
    } else if (el && this.options.endDate && el === this.options.elementEnd) {
      this.calendars[0] = this.options.endDate.clone();
    }
  }

  if (this.options.mobileFriendly && isMobile()) {
    this.picker.style.position = 'fixed';
    this.picker.style.display = 'block';

    if (getOrientation() === 'portrait') {
      this.options.numberOfMonths = 1;
      this.options.numberOfColumns = 1;
    } else {
      this.options.numberOfMonths = 2;
      this.options.numberOfColumns = 2;
    }

    this.render();

    const pickerBCR = this.picker.getBoundingClientRect();
    this.picker.style.top = `calc(50% - ${(pickerBCR.height / 2)}px)`;
    this.picker.style.left = `calc(50% - ${(pickerBCR.width / 2)}px)`;
    this.picker.style.right = null;
    this.picker.style.bottom = null;
    this.picker.style.zIndex = this.options.zIndex;

    this.backdrop.style.display = 'block';
    this.backdrop.style.zIndex = this.options.zIndex - 1;
    document.body.classList.add(style.litepickerOpen);

    if (typeof this.options.onShow === 'function') {
      this.options.onShow.call(this);
    }

    if (el) {
      el.blur();
    } else {
      this.options.element.blur();
    }
    return;
  }

  this.render();

  this.picker.style.position = 'absolute';
  this.picker.style.display = 'block';
  this.picker.style.zIndex = this.options.zIndex;

  const element = el ? el : this.options.element;
  const elBCR = element.getBoundingClientRect();
  const pickerBCR = this.picker.getBoundingClientRect();

  let top = elBCR.bottom;
  let left = elBCR.left;
  let scrollX = 0;
  let scrollY = 0;
  let topAlt = 0;
  let leftAlt = 0;

  if (this.options.parentEl) {
    const parentBCR = this.picker.parentNode.getBoundingClientRect();
    top -= parentBCR.bottom;
    top += elBCR.height;

    if (top + pickerBCR.height > window.innerHeight
      && (elBCR.top - parentBCR.top) - elBCR.height > 0) {
      topAlt = (elBCR.top - parentBCR.top) - elBCR.height;
    }

    left -= parentBCR.left;

    if (left + pickerBCR.width > window.innerWidth
      && (elBCR.right - parentBCR.right) - pickerBCR.width > 0) {
      leftAlt = (elBCR.right - parentBCR.right) - pickerBCR.width;
    }
  } else {
    scrollX = window.scrollX;
    scrollY = window.scrollY;

    if (top + pickerBCR.height > window.innerHeight
      && elBCR.top - pickerBCR.height > 0) {
      topAlt = elBCR.top - pickerBCR.height;
    }

    if (left + pickerBCR.width > window.innerWidth
      && elBCR.right - pickerBCR.width > 0) {
      leftAlt = elBCR.right - pickerBCR.width;
    }
  }

  this.picker.style.top = `${(topAlt ? topAlt : top) + scrollY}px`;
  this.picker.style.left = `${(leftAlt ? leftAlt : left) + scrollX}px`;
  this.picker.style.right = null;
  this.picker.style.bottom = null;

  if (typeof this.options.onShow === 'function') {
    this.options.onShow.call(this);
  }

  this.triggerElement = element;
};

Litepicker.prototype.hide = function () {
  if (!this.isShowning()) {
    return;
  }

  this.datePicked.length = 0;
  this.updateInput();

  if (this.options.inlineMode) {
    this.render();
    return;
  }

  this.picker.style.display = 'none';

  if (typeof this.options.onHide === 'function') {
    this.options.onHide.call(this);
  }

  if (this.options.mobileFriendly) {
    document.body.classList.remove(style.litepickerOpen);
    this.backdrop.style.display = 'none';
  }
};

Litepicker.prototype.getDate = function () {
  return this.getStartDate();
};

Litepicker.prototype.getStartDate = function () {
  if (this.options.startDate) {
    return this.options.startDate.clone();
  }

  return null;
};

Litepicker.prototype.getEndDate = function () {
  if (this.options.endDate) {
    return this.options.endDate.clone();
  }

  return null;
};

Litepicker.prototype.setDate = function (date) {
  this.setStartDate(date);

  if (typeof this.options.onSelect === 'function') {
    this.options.onSelect.call(this, this.getDate());
  }
};

Litepicker.prototype.setStartDate = function (date) {
  if (!date) return;

  this.options.startDate = new DateTime(
    date,
    this.options.format,
    this.options.lang,
  );

  this.updateInput();
};

Litepicker.prototype.setEndDate = function (date) {
  if (!date) return;

  this.options.endDate = new DateTime(
    date,
    this.options.format,
    this.options.lang,
  );

  if (this.options.startDate.getTime() > this.options.endDate.getTime()) {
    this.options.endDate = this.options.startDate.clone();
    this.options.startDate = new DateTime(
      date,
      this.options.format,
      this.options.lang,
    );
  }

  this.updateInput();
};

Litepicker.prototype.setDateRange = function (date1, date2) {
  this.setStartDate(date1);
  this.setEndDate(date2);

  this.updateInput();

  if (typeof this.options.onSelect === 'function') {
    this.options.onSelect.call(this, this.getStartDate(), this.getEndDate());
  }
};

Litepicker.prototype.gotoDate = function (date, idx = 0) {
  this.calendars[idx] = new DateTime(date);
  this.render();
};

Litepicker.prototype.setLockDays = function (array) {
  this.options.lockDays = DateTime.convertArray(
    array,
    this.options.lockDaysFormat,
  );
  this.render();
};

Litepicker.prototype.setBookedDays = function (array) {
  this.options.bookedDays = DateTime.convertArray(
    array,
    this.options.bookedDaysFormat,
  );
  this.render();
};

Litepicker.prototype.setOptions = function (options) {
  delete options.element;
  delete options.elementEnd;
  delete options.parentEl;

  if (options.startDate) {
    options.startDate = new DateTime(
      options.startDate,
      this.options.format,
      this.options.lang,
    );
  }

  if (options.endDate) {
    options.endDate = new DateTime(
      options.endDate,
      this.options.format,
      this.options.lang,
    );
  }

  this.options = { ...this.options, ...options };

  if (this.options.singleMode && !(this.options.startDate instanceof Date)) {
    this.options.startDate = null;
    this.options.endDate = null;
  }
  if (!this.options.singleMode
    && (!(this.options.startDate instanceof Date) || !(this.options.endDate instanceof Date))) {
    this.options.startDate = null;
    this.options.endDate = null;
  }

  for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
    const date = this.options.startDate
      ? this.options.startDate.clone()
      : new DateTime();
    date.setMonth(date.getMonth() + idx);
    this.calendars[idx] = date;
  }

  this.render();

  if (this.options.inlineMode) {
    this.show();
  }

  this.updateInput();
};

Litepicker.prototype.destroy = function () {
  if (this.picker && this.picker.parentNode) {
    this.picker.parentNode.removeChild(this.picker);
    this.picker = null;
  }

  if (this.backdrop && this.backdrop.parentNode) {
    this.backdrop.parentNode.removeChild(this.backdrop);
  }
};
