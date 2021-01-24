import { DateTime } from './datetime';

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

export function dateIsLocked(date: DateTime, options, pickedDates: DateTime[]): boolean {
  let isLocked = false;

  if (options.lockDays.length) {
    isLocked = options.lockDays
      .filter((d) => {
        if (d instanceof Array) {
          return date.isBetween(d[0], d[1], options.lockDaysInclusivity);
        }

        return d.isSame(date, 'day');
      }).length;
  }

  if (!isLocked && typeof options.lockDaysFilter === 'function') {
    isLocked = options.lockDaysFilter.call(this, date.clone(), null, pickedDates);
  }

  return isLocked;
}

export function rangeIsLocked(days: DateTime[], options): boolean {
  let isLocked = false;

  if (options.lockDays.length) {
    isLocked = options.lockDays
      .filter((d) => {
        if (d instanceof Array) {
          return d[0].isBetween(days[0], days[1], options.lockDaysInclusivity)
            || d[1].isBetween(days[0], days[1], options.lockDaysInclusivity);
        }

        return d.isBetween(days[0], days[1], options.lockDaysInclusivity);
      }).length;
  }

  if (!isLocked && typeof options.lockDaysFilter === 'function') {
    isLocked = options.lockDaysFilter.call(this, days[0].clone(), days[1].clone(), days);
  }

  return isLocked;
}
