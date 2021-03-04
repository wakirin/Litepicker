import { DateTime } from './datetime';
import { Litepicker } from './litepicker';
import { dateIsLocked, rangeIsLocked } from './utils';

declare module './litepicker' {
  // tslint:disable-next-line: interface-name
  interface Litepicker {
    show(element?): void;
    hide(): void;
    gotoDate(date, idx?): void;
    clearSelection(): void;
    destroy(): void;

    getDate(): DateTime | null;
    getStartDate(): DateTime | null;
    getEndDate(): DateTime | null;

    setDate(date): void;
    setStartDate(date): void;
    setEndDate(date): void;
    setDateRange(date1, date2): void;

    setLockDays(array): void;
    setHighlightedDays(array): void;
    setOptions(options): void;
  }
}

Litepicker.prototype.show = function (el = null) {
  this.emit('before:show', el);

  const element = el ? el : this.options.element;
  this.triggerElement = element;

  if (this.isShowning()) {
    return;
  }

  if (this.options.inlineMode) {
    this.ui.style.position = 'relative';
    this.ui.style.display = 'inline-block';
    this.ui.style.top = null;
    this.ui.style.left = null;
    this.ui.style.bottom = null;
    this.ui.style.right = null;
    return;
  }

  this.scrollToDate(el);

  this.render();

  this.ui.style.position = 'absolute';
  this.ui.style.display = 'block';
  this.ui.style.zIndex = this.options.zIndex;

  const position = this.findPosition(element);

  this.ui.style.top = `${position.top}px`;
  this.ui.style.left = `${position.left}px`;
  this.ui.style.right = null;
  this.ui.style.bottom = null;

  this.emit('show', el);
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

  this.ui.style.display = 'none';

  this.emit('hide');
};

Litepicker.prototype.getDate = function (): DateTime {
  return this.getStartDate();
};

Litepicker.prototype.getStartDate = function (): DateTime {
  if (this.options.startDate) {
    return this.options.startDate.clone();
  }

  return null;
};

Litepicker.prototype.getEndDate = function (): DateTime {
  if (this.options.endDate) {
    return this.options.endDate.clone();
  }

  return null;
};

Litepicker.prototype.setDate = function (date, force: boolean = false) {
  const d = new DateTime(
    date,
    this.options.format,
    this.options.lang,
  );

  const isLocked = dateIsLocked(d, this.options, [d]);

  if (isLocked && !force) {
    this.emit('error:date', d);
  } else {
    this.setStartDate(date);

    if (this.options.inlineMode) {
      this.render();
    }

    this.emit('selected', this.getDate());
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

Litepicker.prototype.setDateRange = function (date1, date2, force: boolean = false) {
  // stop repicking by resetting the trigger element
  this.triggerElement = undefined;

  const d1 = new DateTime(
    date1,
    this.options.format,
    this.options.lang,
  );
  const d2 = new DateTime(
    date2,
    this.options.format,
    this.options.lang,
  );
  let isLocked = false;
  if (this.options.disallowLockDaysInRange) {
    isLocked = rangeIsLocked([d1, d2], this.options);
  } else {
    isLocked = dateIsLocked(d1, this.options, [d1, d2])
      || dateIsLocked(d2, this.options, [d1, d2]);
  }

  if (isLocked && !force) {
    this.emit('error:range', [d1, d2]);
  } else {
    this.setStartDate(d1);
    this.setEndDate(d2);

    if (this.options.inlineMode) {
      this.render();
    }

    this.updateInput();

    this.emit('selected', this.getStartDate(), this.getEndDate());
  }
};

Litepicker.prototype.gotoDate = function (date, idx = 0) {
  const toDate = new DateTime(date);
  toDate.setDate(1);
  this.calendars[idx] = toDate.clone();
  this.render();
};

Litepicker.prototype.setLockDays = function (array) {
  this.options.lockDays = DateTime.convertArray(
    array,
    this.options.lockDaysFormat,
  );
  this.render();
};

Litepicker.prototype.setHighlightedDays = function (array) {
  this.options.highlightedDays = DateTime.convertArray(
    array,
    this.options.highlightedDaysFormat,
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

  const dropdowns = { ...this.options.dropdowns, ...options.dropdowns };
  const buttonText = { ...this.options.buttonText, ...options.buttonText };
  const tooltipText = { ...this.options.tooltipText, ...options.tooltipText };

  this.options = { ...this.options, ...options };
  this.options.dropdowns = { ...dropdowns };
  this.options.buttonText = { ...buttonText };
  this.options.tooltipText = { ...tooltipText };

  if (this.options.singleMode && !(this.options.startDate instanceof DateTime)) {
    this.options.startDate = null;
    this.options.endDate = null;
  }
  if (!this.options.singleMode
    && (!(this.options.startDate instanceof DateTime)
      || !(this.options.endDate instanceof DateTime))) {
    this.options.startDate = null;
    this.options.endDate = null;
  }

  for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
    const date = this.options.startDate
      ? this.options.startDate.clone()
      : new DateTime();
    date.setDate(1);
    date.setMonth(date.getMonth() + idx);
    this.calendars[idx] = date;
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

  this.render();

  if (this.options.inlineMode) {
    this.show();
  }

  this.updateInput();
};

Litepicker.prototype.clearSelection = function () {
  this.options.startDate = null;
  this.options.endDate = null;
  this.datePicked.length = 0;

  this.updateInput();

  if (this.isShowning()) {
    this.render();
  }

  this.emit('clear:selection');
};

Litepicker.prototype.destroy = function () {
  if (this.ui && this.ui.parentNode) {
    this.ui.parentNode.removeChild(this.ui);
    this.ui = null;
  }

  this.emit('destroy');
};
