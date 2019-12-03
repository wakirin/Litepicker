import { Litepicker } from '../src/index';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

document.body.innerHTML = '<input id="datepicker"/>';

const input = document.getElementById('datepicker') as HTMLInputElement;
const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);

test('Litepicker singleMode - init with Date/UnixTimestamp/String', () => {
  // Date object
  let picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: startDate,
  });
  expect(picker.getDate().toDateString() === startDate.toDateString()).toBe(true);
  picker.destroy();

  // Unix timestamp
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: startDate.getTime(),
  });
  expect(picker.getDate().toDateString() === startDate.toDateString()).toBe(true);
  picker.destroy();

  // String
  const month = `0${startDate.getMonth() + 1}`.slice(-2);
  const day = `0${startDate.getDate()}`.slice(-2);
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: `${startDate.getFullYear()}-${month}-${day}`,
  });
  expect(picker.getDate().toDateString() === startDate.toDateString()).toBe(true);
  picker.destroy();
});

test('Litepicker date range - init with Date/UnixTimestamp/String', () => {
  // Date object
  let picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: startDate,
    endDate: endDate,
  });
  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()).toBe(true);
  picker.destroy();

  // Unix timestamp
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
  });
  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()).toBe(true);
  picker.destroy();

  // String
  const monthStart = `0${startDate.getMonth() + 1}`.slice(-2);
  const dayStart = `0${startDate.getDate()}`.slice(-2);
  const monthEnd = `0${endDate.getMonth() + 1}`.slice(-2);
  const dayEnd = `0${endDate.getDate()}`.slice(-2);
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    startDate: `${startDate.getFullYear()}-${monthStart}-${dayStart}`,
    endDate: `${endDate.getFullYear()}-${monthEnd}-${dayEnd}`,
  });
  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()).toBe(true);
  picker.destroy();
});

test('Litepicker singleMode - setDate (Date/UnixTimestamp/String)', () => {
  // Date object
  let picker = new Litepicker({
    element: document.getElementById('datepicker'),
  });
  picker.setDate(startDate);

  const month = `0${startDate.getMonth() + 1}`.slice(-2);
  const day = `0${startDate.getDate()}`.slice(-2);

  expect(picker.getDate().toDateString() === startDate.toDateString()
    && input.value === `${startDate.getFullYear()}-${month}-${day}`).toBe(true);
  picker.destroy();

  // Unix timestamp
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
  });
  picker.setDate(startDate.getTime());

  expect(picker.getDate().toDateString() === startDate.toDateString()
    && input.value === `${startDate.getFullYear()}-${month}-${day}`).toBe(true);
  picker.destroy();

  // String
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
  });
  const startDateFormat = `${startDate.getFullYear()}-${month}-${day}`;
  picker.setDate(startDateFormat);

  expect(picker.getDate().toDateString() === startDate.toDateString()
    && input.value === startDateFormat).toBe(true);
  picker.destroy();
});

test('Litepicker date range - setDateRange (Date/UnixTimestamp/String)', () => {
  const monthStart = `0${startDate.getMonth() + 1}`.slice(-2);
  const monthEnd = `0${endDate.getMonth() + 1}`.slice(-2);
  const dayStart = `0${startDate.getDate()}`.slice(-2);
  const dayEnd = `0${endDate.getDate()}`.slice(-2);
  const startDateFormat = `${startDate.getFullYear()}-${monthStart}-${dayStart}`;
  const endDateFormat = `${endDate.getFullYear()}-${monthEnd}-${dayEnd}`;

  // Date object
  let picker = new Litepicker({
    element: document.getElementById('datepicker'),
    singleMode: false,
  });
  picker.setDateRange(startDate, endDate);

  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()
    && input.value === `${startDateFormat} - ${endDateFormat}`).toBe(true);
  picker.destroy();

  // Unix timestamp
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    singleMode: false,
  });
  picker.setDateRange(startDate.getTime(), endDate.getTime());

  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()
    && input.value === `${startDateFormat} - ${endDateFormat}`).toBe(true);
  picker.destroy();

  // String
  picker = new Litepicker({
    element: document.getElementById('datepicker'),
    singleMode: false,
  });
  picker.setDateRange(startDateFormat, endDateFormat);

  expect(picker.getStartDate().toDateString() === startDate.toDateString()
    && picker.getEndDate().toDateString() === endDate.toDateString()
    && input.value === `${startDateFormat} - ${endDateFormat}`).toBe(true);
  picker.destroy();
});
