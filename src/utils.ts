import { DateTime } from './datetime';

export function isMobile(): boolean {
  const isPortrait = getOrientation() === 'portrait';
  return window.matchMedia(`(max-device-${isPortrait ? 'width' : 'height'}: ${480}px)`).matches;
}

export function getOrientation(): string {
  if (window.matchMedia('(orientation: portrait)').matches) {
    return 'portrait';
  }

  return 'landscape';
}

export function findNestedMonthItem(monthItem: Element): number {
  const children = monthItem.parentNode.childNodes;
  for (let i = 0; i < children.length; i = i + 1) {
    const curNode = children.item(i);
    if (curNode === monthItem) {
      return i;
    }
  }
  return 0;
}

export function isNotEmptyArray(lockDays): boolean {
  return lockDays instanceof Array && lockDays.length > 0;
}

export function dateIsLocked(date: DateTime, options, pickedDates: DateTime[]): boolean {
  if (isNotEmptyArray(options.lockDays)) {
    return options.lockDays
      .filter((d) => {
        if (d instanceof Array) {
          return date.isBetween(d[0], d[1], options.lockDaysInclusivity);
        }

        return d.isSame(date, 'day');
      }).length;
  }

  if (typeof options.lockDays === 'function') {
    return options.lockDays.call(this, date, null, pickedDates);
  }

  return false;
}

export function rangeIsLocked(days: DateTime[], options): boolean {
  if (isNotEmptyArray(options.lockDays)) {
    return options.lockDays
      .filter((d) => {
        if (d instanceof Array) {
          return d[0].isBetween(days[0], days[1], options.lockDaysInclusivity)
            || d[1].isBetween(days[0], days[1], options.lockDaysInclusivity);
        }

        return d.isBetween(days[0], days[1], options.lockDaysInclusivity);
      }).length;
  }

  if (typeof options.lockDays === 'function') {
    return options.lockDays.call(this, days[0], days[1], days);
  }

  return false;
}
