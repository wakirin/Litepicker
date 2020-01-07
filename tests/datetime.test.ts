import { DateTime } from '../src/datetime';

// 23 Nov, 2019 - repository creation date
const date = new Date(2019, 10, 23, 0, 0, 0, 0);

test('new DateTime', () => {
  const dt1 = new DateTime();
  expect(dt1 instanceof Date && !isNaN(dt1.getTime())).toBe(true);

  const dt2 = new DateTime(date);
  expect(dt2 instanceof Date && date.getTime() === dt2.getTime()).toBe(true);

  const day = date.getDate();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  const dt3 = new DateTime(`${day}/${month}/${year}`);
  expect(dt3 instanceof Date && date.getTime() === dt3.getTime()).toBe(false);

  const dt4 = new DateTime(`${day}/${month}/${year}`, 'DD/MM/YYYY');
  expect(dt4 instanceof Date && date.getTime() === dt4.getTime()).toBe(true);
});

test('DateTime.convertArray - lockDays/bookedDays', () => {
  const array = [
    '2019-11-23',
    ['2019-01-01', '2019-01-15'],
    ['2019-11-01', '2019-11-11'],
  ];
  const convertedArray = DateTime.convertArray(array, 'YYYY-MM-DD');
  convertedArray.forEach((dt) => {
    if (dt instanceof Array) {
      expect(dt[0] instanceof DateTime && !isNaN(dt[0].getTime())
        && dt[1] instanceof DateTime && !isNaN(dt[1].getTime())).toBe(true);
    } else {
      expect(dt instanceof DateTime && !isNaN(dt.getTime())).toBe(true);
    }
  });
});

test('DateTime clone', () => {
  const datetime = new DateTime();
  const clone = datetime.clone();
  expect(datetime.getTime() === clone.getTime()).toBe(true);
});

test('DateTime isBetween', () => {
  const dt1 = new DateTime('2019-11-01', 'YYYY-MM-DD');
  const dt2 = new DateTime('2019-11-23', 'YYYY-MM-DD');
  const check = new DateTime('2019-11-15', 'YYYY-MM-DD');
  const check1 = dt1.clone();
  const check2 = dt2.clone();

  // ()
  expect(check.isBetween(dt1, dt2)).toBe(true);
  expect(check2.isBetween(dt1, dt2)).toBe(false);

  // [)
  expect(check1.isBetween(dt1, dt2, '[)')).toBe(true);

  // (]
  expect(check2.isBetween(dt1, dt2, '(]')).toBe(true);

  // []
  expect(check1.isBetween(dt1, dt2, '[]') && check2.isBetween(dt1, dt2, '[]')).toBe(true);
});

test('DateTime isBefore', () => {
  const dt = new DateTime(date);

  // seconds
  dt.setSeconds(dt.getSeconds() - 1);
  expect(dt.isBefore(date)).toBe(true);

  // days
  dt.setDate(dt.getDate() - 1);
  expect(dt.isBefore(date, 'day')).toBe(true);

  // months
  dt.setMonth(dt.getMonth() - 1);
  expect(dt.isBefore(date, 'month')).toBe(true);
});

test('DateTime isSameOrBefore', () => {
  const dt = new DateTime(date);

  // seconds
  expect(dt.isSameOrBefore(date)).toBe(true);
  dt.setSeconds(dt.getSeconds() - 1);
  expect(dt.isSameOrBefore(date)).toBe(true);

  // days
  expect(dt.isSameOrBefore(date, 'day')).toBe(true);
  dt.setDate(dt.getDate() - 1);
  expect(dt.isSameOrBefore(date, 'day')).toBe(true);

  // months
  expect(dt.isSameOrBefore(date, 'month')).toBe(true);
  dt.setMonth(dt.getMonth() - 1);
  expect(dt.isSameOrBefore(date, 'month')).toBe(true);
});

test('DateTime isAfter', () => {
  const dt = new DateTime(date);

  // seconds
  dt.setSeconds(dt.getSeconds() + 1);
  expect(dt.isAfter(date)).toBe(true);

  // days
  dt.setDate(dt.getDate() + 1);
  expect(dt.isAfter(date, 'day')).toBe(true);

  // months
  dt.setMonth(dt.getMonth() + 1);
  expect(dt.isAfter(date, 'month')).toBe(true);
});

test('DateTime isSameOrAfter', () => {
  const dt = new DateTime(date);

  // seconds
  expect(dt.isSameOrAfter(date)).toBe(true);
  dt.setSeconds(dt.getSeconds() + 1);
  expect(dt.isSameOrAfter(date)).toBe(true);

  // days
  expect(dt.isSameOrAfter(date, 'day')).toBe(true);
  dt.setDate(dt.getDate() + 1);
  expect(dt.isSameOrAfter(date, 'day')).toBe(true);

  // months
  expect(dt.isSameOrAfter(date, 'month')).toBe(true);
  dt.setMonth(dt.getMonth() + 1);
  expect(dt.isSameOrAfter(date, 'month')).toBe(true);
});

test('DateTime isSame', () => {
  const dt = new DateTime(date);

  // seconds
  expect(dt.isSameOrAfter(date)).toBe(true);

  // days
  expect(dt.isSameOrAfter(date, 'day')).toBe(true);

  // months
  expect(dt.isSameOrAfter(date, 'month')).toBe(true);
});

test('DateTime add', () => {
  let dt = null;

  // seconds
  dt = new DateTime(date);
  dt.add(1, 'seconds');
  expect(dt.getTime() === date.getTime() + 1000).toBe(true);

  // day
  dt = new DateTime(date);
  dt.add(1, 'day');
  expect(dt.getDate() === date.getDate() + 1).toBe(true);

  // month
  dt = new DateTime(date);
  dt.add(1, 'month');
  expect(dt.getMonth() === date.getMonth() + 1).toBe(true);
});

test('DateTime subtract', () => {
  let dt = null;

  // seconds
  dt = new DateTime(date);
  dt.subtract(1, 'seconds');
  expect(dt.getTime() === date.getTime() - 1000).toBe(true);

  // day
  dt = new DateTime(date);
  dt.subtract(1, 'day');
  expect(dt.getDate() === date.getDate() - 1).toBe(true);

  // month
  dt = new DateTime(date);
  dt.subtract(1, 'month');
  expect(dt.getMonth() === date.getMonth() - 1).toBe(true);
});

test('DateTime diff', () => {
  let dt = null;

  // seconds
  dt = new DateTime(date);
  dt.add(1, 'seconds');
  expect(dt.diff(date) === 1000).toBe(true);

  // day
  dt = new DateTime(date);
  dt.add(1, 'day');
  expect(dt.diff(date, 'day') === 1).toBe(true);
});

test('DateTime format', () => {
  const dt = new DateTime(date);

  expect(dt.format('YYYY-MM-DD') === '2019-11-23').toBe(true);
  expect(dt.format('DD MMM, YYYY') === '23 Nov, 2019').toBe(true);
});
