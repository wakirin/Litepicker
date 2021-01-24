import proxyPolyfillFunc from 'proxy-polyfill/proxy.min.js';
import methods from './methods';
import options from './options';
import { createRowOption, sortArray } from './utils';
declare var Litepicker: any;

const now = new Date();
const defaultOptions = {
  element: document.getElementById('litepicker'),
  elementEnd: null,
  parentEl: document.getElementById('demo-preview-sticky'),
  firstDay: 1,
  format: 'D MMM, YYYY',
  lang: 'en-US',
  numberOfMonths: 2,
  numberOfColumns: 2,
  startDate: new Date(now.getFullYear(), now.getMonth(), 7),
  endDate: new Date(now.getFullYear(), now.getMonth() + 1, 11),
  zIndex: 9999,

  minDate: null,
  maxDate: null,
  minDays: null,
  maxDays: null,
  selectForward: false,
  selectBackward: false,
  splitView: false,
  inlineMode: false,
  singleMode: false,
  autoApply: true,
  allowRepick: false,
  showWeekNumbers: false,
  showTooltip: true,
  disableWeekends: false,
  scrollToDate: true,
  mobileFriendly: true,

  lockDaysFormat: 'YYYY-MM-DD',
  lockDays: [],
  // disallowLockDaysInRange: false,
  // lockDaysInclusivity: '[]',

  bookedDaysFormat: 'YYYY-MM-DD',
  bookedDays: [],
  // disallowBookedDaysInRange: true,
  // bookedDaysInclusivity: '[]',

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
  },
  tooltipText: {
    one: 'day',
    other: 'days',
  },
  setup: (picker) => {
    picker.on('show', () => {
      console.log('show event');
    });
    picker.on('hide', () => {
      console.log('hide event');
    });
    picker.on('selected', (date1, date2) => {
      console.log('selected event', date1, date2);
    });
    picker.on('error:range', () => {
      console.log('error range event');
    });
    picker.on('change:month', (date, calIdx) => {
      console.log('change month event', date, calIdx);
    });
    picker.on('change:year', (date, calIdx) => {
      console.log('change year event', date, calIdx);
    });
  },
};

let optionTrigger = {
  set: function (obj, prop, value) {
    obj[prop] = value;

    switch (prop) {
      case 'singleMode':
        if (value) {
          obj.endDate = null;
        } else {
          let date = new Date(obj.startDate);
          obj.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        }
        break;

      case 'lang':
        switch (value) {
          case 'ru-RU':
            obj.tooltipText = {
              one: 'день',
              few: 'дня',
              many: 'дней',
            };
            break;

          case 'de-DE':
            obj.tooltipText = {
              one: 'tag',
              other: 'tage',
            };
            break;

          case 'ja-JP':
            obj.tooltipText = {
              one: '日',
              other: '日間',
            };
            break;

          default:
            obj.tooltipText = {
              one: 'day',
              other: 'days',
            };
            break;
        }
        break;

      case 'minDate':
        if (obj.startDate && obj.startDate.getTime() < value.getTime()) {
          obj.startDate = value;
        }
        if (obj.endDate && obj.endDate.getTime() < value.getTime()) {
          let tempDate = new Date(value);
          tempDate.setDate(value.getDate() + 7);
          obj.endDate = new Date(tempDate);
        }
        break;

      case 'maxDate':
        if (obj.startDate && obj.startDate.getTime() > value.getTime()) {
          obj.startDate = value;
          let tempDate = new Date(value);
          tempDate.setDate(value.getDate() + 7);
          obj.endDate = new Date(tempDate);
        }
        if (obj.endDate && obj.endDate.getTime() > value.getTime()) {
          obj.endDate = value;
        }
        break;
    }

    if (obj.startDate && obj.endDate && obj.startDate.getTime() > obj.endDate.getTime()) {
      let tempDate = new Date(obj.startDate);
      obj.startDate = new Date(obj.endDate);
      obj.endDate = new Date(tempDate);
    }

    picker.setOptions(obj);

    switch (prop) {
      case 'inlineMode':
        if (!value) {
          picker.hide();
        }
        break;
    }

    return true;
  },
};

let proxyOptions;
if (window.Proxy) {
  proxyOptions = new Proxy(defaultOptions, optionTrigger);
} else {
  const ProxyPolyfill = proxyPolyfillFunc();
  proxyOptions = new ProxyPolyfill(defaultOptions, optionTrigger);
}

const pickerOptions = document.getElementById('picker-options');
const picker = new Litepicker(proxyOptions);

const createNumberContainer = (el, opt, min = null, max = null) => {
  const inputNumber = document.createElement('input');
  inputNumber.type = 'number';
  inputNumber.className = 'number-switch';
  inputNumber.value = proxyOptions[opt];

  if (min !== null) {
    inputNumber.min = min;
  }
  if (max !== null) {
    inputNumber.max = max;
  }

  inputNumber.addEventListener('change', function () {
    proxyOptions[opt] = Number(inputNumber.value);
    this.closest('.picker-option-item')
      .querySelector('code').innerHTML = inputNumber.value;
  });
  inputNumber.addEventListener('keydown', (e) => {
    e.preventDefault();
  });

  el.innerHTML = `<code>${proxyOptions[opt]}</code><label>,</label>`;
  const container = document.createElement('div');
  container.className = 'user-value-container';
  container.appendChild(inputNumber);

  el.appendChild(container);
};

const createCheckboxContainer = (el, opt) => {
  const inputCheckbox = document.createElement('input');
  inputCheckbox.type = 'checkbox';
  inputCheckbox.className = 'apple-switch';
  inputCheckbox.checked = proxyOptions[opt];
  inputCheckbox.addEventListener('change', () => {
    proxyOptions[opt] = inputCheckbox.checked;
    el.closest('.picker-option-item')
      .querySelector('code').innerHTML = Boolean(inputCheckbox.checked);
  });

  el.innerHTML = `<code>${Boolean(proxyOptions[opt])}</code><label>,</label>`;
  const container = document.createElement('div');
  container.className = 'user-value-container';
  container.appendChild(inputCheckbox);
  el.appendChild(container);
};

const createSelectContainer = (el, opt, values) => {
  const select = document.createElement('select');
  // tslint:disable-next-line: prefer-for-of
  for (var i = 0; i < values.length; i += 1) {
    const option = document.createElement('option');
    option.value = values[i];
    option.text = values[i];
    select.appendChild(option);
  }
  const etc = document.createElement('option');
  etc.text = 'etc ...';
  etc.disabled = true;
  select.appendChild(etc);

  select.value = values[values.indexOf(proxyOptions[opt])];

  select.addEventListener('change', () => {
    const value = select.options[select.selectedIndex].value;
    proxyOptions[opt] = value;
    el.closest('.picker-option-item')
      .querySelector('code').innerHTML = `'${value}'`;
  });

  el.innerHTML = `<code>'${proxyOptions[opt]}'</code><label>,</label>`;
  const container = document.createElement('div');
  container.className = 'user-value-container';
  container.appendChild(select);

  el.appendChild(container);
};

const createLitepickerContainer = (el, opt) => {
  const button = document.createElement('button');
  button.className = 'calendar-icon';
  new Litepicker({
    element: button,
    onSelect: function (date) {
      proxyOptions[opt] = date;
      el.closest('.picker-option-item')
        .querySelector('code').innerHTML = `'${date.toDateString()}'`;
    }
  });
  el.innerHTML = `<code>${proxyOptions[opt]}</code><label>,</label>`;

  const container = document.createElement('div');
  container.className = 'user-value-container';
  container.appendChild(button);

  el.appendChild(container);
}

Object.keys(proxyOptions).forEach((opt) => {
  const option = document.createElement('div');
  option.className = 'picker-option-item';

  const label = document.createElement('label');
  label.innerHTML = `${opt}:`;

  const value = document.createElement('div');
  switch (opt) {
    /*case 'element':
      value.innerHTML = `<code>document.getElementById('litepicker')</code>`;
      break;

    case 'elementEnd':
      value.innerHTML = `<code>null</code>`;
      break;

    case 'parentEl':
      value.innerHTML = `<code>document.getElementById('demo-preview-sticky')</code>`;
      break;

    case 'startDate':
      value.innerHTML = `<code>new Date(now.getFullYear(), now.getMonth(), 7)</code>`;
      break;

    case 'endDate':
      value.innerHTML = `<code>new Date(now.getFullYear(), now.getMonth() + 1, 11)</code>`;
      break;*/

    case 'firstDay':
      createNumberContainer(value, opt, 0, 6);
      break;

    case 'format':
      createSelectContainer(value, opt, ['YYYY-MM-DD', 'DD/MM/YYYY', 'D MMM, YYYY'])
      break;

    case 'lang':
      createSelectContainer(value, opt, ['en-US', 'ru-RU', 'de-DE', 'ja-JP'])
      break;

    case 'numberOfMonths':
      createNumberContainer(value, opt, 1);
      break;

    case 'numberOfColumns':
      createNumberContainer(value, opt, 1, 4);
      break;

    case 'selectForward':
    case 'selectBackward':
    case 'splitView':
    case 'inlineMode':
    case 'singleMode':
    case 'autoApply':
    // case 'allowRepick':
    case 'showWeekNumbers':
    case 'showTooltip':
    case 'disableWeekends':
    // case 'scrollToDate':
    // case 'disallowLockDaysInRange':
    case 'mobileFriendly':
      createCheckboxContainer(value, opt);
      break;

    /* case 'lockDaysFormat':
     case 'bookedDaysFormat':
       value.innerHTML = `<code>${String(proxyOptions[opt])}</code><label>,</label>`;
       break;*/

    /*
    case 'buttonText':
    case 'tooltipText':
      value.innerHTML = `<code>${
        JSON.stringify(proxyOptions[opt], null, 2)
          .replace(/\<svg.*?\>\<\/svg>/g, '<svg ...></svg>')
          .replace(/\</g, '&lt;')
          .replace(/\>/g, '&gt;')
        }</code>`;
      break;
    */

    case 'minDate':
    case 'maxDate':
      createLitepickerContainer(value, opt);
      break;

    case 'minDays':
    case 'maxDays':
      createNumberContainer(value, opt, 0);
      break;

    /*case 'lockDays':
    case 'bookedDays':
      value.innerHTML = `<code>[]</code>`;
      break;*/

    /*case 'onShow':
    case 'onHide':
    case 'onSelect':
    case 'onError':
    case 'onChangeMonth':
    case 'onChangeYear':
      value.innerHTML = `<code>function</code>`;
      break;*/
  }

  if (value.innerHTML.length) {
    option.appendChild(label);
    option.appendChild(value);

    pickerOptions.appendChild(option);
  }
});

const optionsList = document.getElementById('options-list');
sortArray(options).forEach(entry => optionsList.appendChild(createRowOption(entry)));

const methodsList = document.getElementById('methods-list');
sortArray(methods).forEach(entry => methodsList.appendChild(createRowOption(entry)));

if (window.location.hash) {
  setTimeout(() => {
    const h = window.location.hash.toLocaleLowerCase().replace(/^#option/, 'opt');
    const el = document.getElementById(h);

    if (el) {
      try {
        el.scrollIntoView(true);
      } catch {
        const b = el.getBoundingClientRect();
        window.scrollTo(0, b.top);
      }
    }
  }, 300);
}