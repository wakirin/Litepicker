const options = [
  {
    name: 'element',
    type: 'HTMLElement',
    required: true,
    default: 'null',
    description: '<p>Bind the datepicker to a element. Also is possible to bind to any element (not input) for example you need inline calendar.</p>',
  },
  {
    name: 'elementEnd',
    type: 'HTMLInputElement',
    default: 'null',
    description: `
    <p>Bind the datepicker to a element for end date.</p>

    <p>Usage <a href="https://jsfiddle.net/waki/9kztrsqp/" target="_blank">example</a>.</p>
    `
  },
  {
    name: 'parentEl',
    type: 'HTMLElement',
    default: 'null',
    description: '<p>Adds the date picker to an element.</p>',
  },
  {
    name: 'firstDay',
    type: 'Number',
    default: 1,
    description: '<p>Day of start week. (0 - Sunday, 1 - Monday, 2 - Tuesday, etc...)</p>'
  },
  {
    name: 'format',
    type: 'String|Object',
    default: 'YYYY-MM-DD',
    description: `
      <p>The default output format.</p>
      <p>Allowed formats:</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Token</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-right"><strong>Day of Month</strong></td>
            <td>D</td>
            <td>1 2 ... 30 31</td>
          </tr>
          <tr>
            <td></td>
            <td>DD</td>
            <td>01 02 ... 30 31</td>
          </tr>
          <tr>
            <td class="text-right"><strong>Month</strong></td>
            <td>M</td>
            <td>1 2 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>MM</td>
            <td>01 02 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>MMM</td>
            <td>Jan Feb ... Nov Dec</td>
          </tr>
          <tr>
            <td></td>
            <td>MMMM</td>
            <td>January February ... November December</td>
          </tr>
          <tr>
            <td class="text-right"><strong>Year</strong></td>
            <td>YY</td>
            <td>70 71 ... 29 30</td>
          </tr>
          <tr>
            <td></td>
            <td>YYYY</td>
            <td>1970 1971 ... 2029 2030</td>
          </tr>
        </tbody>
      </table>
      <p>You may escape formatting tokens using \\.</p>
      <p>Eg.:</p>
      <p><code>format: 'YYYY-MM-DD\\T00:00:00'</code></p>
      <p>Result: <strong>2020-01-01T00:00:00</strong></p>
      <p>&nbsp;</p>
      <p>Since v2.0.0 option <code>format</code> support external library for parse/output.</p>
      <p>Example with <a href="https://moment.github.io/luxon/index.html" target="_blank">luxon</a>:</p>
      <div class="code">
      ...
      format: {
        &nbsp;&nbsp; // parse function should return Date object
        &nbsp;&nbsp; // date - Date object or string (perhaps there will be more types, need to check)
        &nbsp;&nbsp; parse(date) {
        &nbsp;&nbsp;&nbsp;&nbsp;  if (date instanceof Date) {
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return luxon.DateTime.fromJSDate(date).toJSDate();
        &nbsp;&nbsp;&nbsp;&nbsp; }
      
        &nbsp;&nbsp;&nbsp;&nbsp; if (typeof date === 'string') {
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return luxon.DateTime.fromFormat(date, 'yyyy LLL dd').toJSDate();
        &nbsp;&nbsp;&nbsp;&nbsp; }
      
        &nbsp;&nbsp;&nbsp;&nbsp; return luxon.DateTime.local().toJSDate();
        &nbsp;&nbsp; },
      
        &nbsp;&nbsp; // date - Date object
        &nbsp;&nbsp; // output function should return string
        &nbsp;&nbsp; output(date) {
        &nbsp;&nbsp;&nbsp;&nbsp; return luxon.DateTime.fromJSDate(date)
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; .toFormat('yyyy LLL dd');
        &nbsp;&nbsp; }
      }
      ...
      </div>
    `
  },
  {
    name: 'lang',
    type: 'String',
    default: 'en-US',
    description: `
      <p>
      Language. This option affect to day names, month names via <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString" target="_blank">Date.prototype.toLocaleString()</a>
      and also affect to plural rules via <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules" target="_blank">Intl.PluralRules</a>.
      </p>
    `
  },
  {
    name: 'delimiter',
    type: 'String',
    default: ' - ',
    description: '<p>Delimiter between dates.</p>',
    minVersion: '1.5.0',
  },
  {
    name: 'numberOfMonths',
    type: 'Number',
    default: 1,
    description: '<p>Number of visible months.</p>'
  },
  {
    name: 'numberOfColumns',
    type: 'Number',
    default: 1,
    description: '<p>Number of columns months.</p>'
  },
  {
    name: 'startDate',
    type: 'Date|Number|String',
    default: 'null',
    description: `
    <p>Preselect date. </p>
    <p>If option <strong>singleMode</strong> is disabled then <strong>endDate</strong> must be set too.</p>
    <p>Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    `
  },
  {
    name: 'endDate',
    type: 'Date|Number|String',
    default: 'null',
    description: `
    <p>Preselect end date.</p> 
    <p>Required <strong>startDate</strong>.</p>
    <p>Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    `
  },
  {
    name: 'zIndex',
    type: 'Number',
    default: 9999,
    description: '<p>Control zIndex of the picker element.</p>'
  },

  {
    name: 'minDate',
    type: 'Date|Number|String',
    default: 'null',
    description: `
    <p>The minimum/earliest date that can be selected.</p>
    <p>Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    `
  },
  {
    name: 'maxDate',
    type: 'Date|Number|String',
    default: 'null',
    description: `
    <p>The maximum/latest date that can be selected.</p>
    <p>Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    `
  },
  {
    name: 'minDays',
    type: 'Number',
    default: 'null',
    description: '<p>The minimum days of the selected range.</p>'
  },
  {
    name: 'maxDays',
    type: 'Number',
    default: 'null',
    description: '<p>The maximum days of the selected range.</p>'
  },
  {
    name: 'selectForward',
    type: 'Boolean',
    default: 'false',
    description: '<p>Select second date after the first selected date.</p>'
  },
  {
    name: 'selectBackward',
    type: 'Boolean',
    default: 'false',
    description: '<p>Select second date before the first selected date.</p>'
  },
  {
    name: 'splitView',
    type: 'Boolean',
    default: 'false',
    description: '<p>Enable the previous and the next button for each month.</p>'
  },
  {
    name: 'inlineMode',
    type: 'Boolean',
    default: 'false',
    description: '<p>Show calendar inline.</p>'
  },
  {
    name: 'singleMode',
    type: 'Boolean',
    default: 'true',
    description: '<p>Choose a single date instead of a date range.</p>'
  },
  {
    name: 'autoApply',
    type: 'Boolean',
    default: 'true',
    description: '<p>Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.</p>'
  },
  {
    name: 'allowRepick',
    type: 'Boolean',
    default: 'false',
    description: `
    <p>Required <strong>elementEnd</strong>.</p>
    <p>If date range is already selected, then user can change only one of start date or end date (depends on
      clicked field) instead of new date range.</p>
    `
  },
  {
    name: 'showWeekNumbers',
    type: 'Boolean',
    default: 'false',
    description: '<p>Show week numbers. Based on option <strong>firstDay</strong>.</p>'
  },
  {
    name: 'showTooltip',
    type: 'Boolean|Function',
    default: 'true',
    description: `
    <p>Showing tooltip with how much days will be selected.</p>
    <div class="code">
    ...
    showTooltip: true,
    ...
    </div>
    OR
    <div class="code">
    ...
    // days - number of selected days
    // function should return Number
    //
    // shows one day less
    showTooltip: (days) => {
    &nbsp;&nbsp;  return days - 1;
    }
    ...
    </div>
    `
  },
  {
    name: 'hotelMode',
    type: 'Boolean',
    default: 'false',
    description: `
    <p>Tooltip will shown nights count instead of days.</p>
    <p>Also required to edit option <strong>tooltipText</strong>.</p>

    <p>from <strong>v1.0.22</strong> when is <code>true</code> also changing this options:</p>
    <p><code>bookedDaysInclusivity: '[)'</code> (allowing to select check-out date as check-in date)</p>
    <p><code>disallowBookedDaysInRange: true</code></p>
    <p><code>selectForward: true</code></p>
    <p>You can overwrite them if you manually set some of these options.</p>
    `,
    deprecated: {
      reason: 'The option `hotelMode` is misleading because there many cases for each hotel.',
      replacement: `
      <p>Use option <code>lockDays</code> as a function and control the behavior you want.</p>
      <p>And use option <code>showTooltip</code> as a function (see example of <code>showTooltip</code>).</p>
      `,
    },
  },
  {
    name: 'disableWeekends',
    type: 'Boolean',
    default: 'false',
    description: 'Disable Saturday and Sunday.',
    deprecated: {
      reason: 'Since v2.0.0 option `lockDays` support function.',
      replacement: `
        <div class="code">
        ...
        lockDays: (day) => {
        &nbsp;&nbsp; const d = day.getDay();

        &nbsp;&nbsp; return [6, 0].includes(d);
        },
        ...
        </div>
      `
    },
  },
  {
    name: 'scrollToDate',
    type: 'Boolean',
    default: 'true',
    description: '<p>Scroll to start date on open.</p>'
  },
  {
    name: 'mobileFriendly',
    type: 'Boolean',
    default: 'true',
    description: `
    <p>Enable mobile friendly.</p>
    <p>In portrait orientation, 1 calendar will be displayed at the bottom of the screen.</p>
    <p>In landscape orientation 2 calendar will be displayed.</p>
    <p>See demo above.</p>
    `
  },
  {
    name: 'useResetBtn',
    type: 'Boolean',
    default: 'false',
    description: '<p>Adds a reset button to clear the current selection.</p>',
    deprecated: {
      reason: 'Since v2.0.0 added new option `resetButton`.',
      replacement: `
        <div class="code">
        ...
        resetButton: true,
        ...
        </div>
        OR
        <div class="code">
        ...
        resetButton: (picker) => {
          &nbsp;&nbsp; let btn = document.createElement('button');
          &nbsp;&nbsp; btn.innerText = 'Clear';
          &nbsp;&nbsp; btn.addEventListener('click', (evt) => {
            &nbsp;&nbsp;&nbsp;&nbsp; evt.preventDefault();

            &nbsp;&nbsp;&nbsp;&nbsp; // some custom action
            &nbsp;&nbsp; });

            &nbsp;&nbsp; return btn;
        },
        ...
        </div>
      `
    },
  },
  {
    name: 'autoRefresh',
    type: 'Boolean',
    default: 'false',
    description: '<p>Indicates whether the date range picker should automatically update the value of the &lt;input&gt; element it\'s attached to at initialization and when the selected dates change.</p>'
  },
  {
    name: 'moveByOneMonth',
    type: 'Boolean',
    default: 'false',
    description: '<p>Indicates whether the date range picker should switch month one by one, instead of value of <code>numberOfMonths</code>.</p>',
    deprecated: {
      reason: 'Since v2.0.0 added new option `switchingMonths`.',
      replacement: `
        <div class="code">
        ...
        switchingMonths: 1,
        ...
        </div>
      `
    },
    minVersion: '1.3.0',
  },
  {
    name: 'lockDaysFormat',
    type: 'String',
    default: 'YYYY-MM-DD',
    description: '<p>Date format for option <strong>lockDays</strong>.</p>'
  },
  {
    name: 'lockDays',
    type: 'Array|Function',
    default: '[]',
    description: `
    <p>Disable days for select. Can contains array with range:</p>
    <p>Eg: [ ['2019-01-01', '2019-01-10'], '2019-01-31' ].</p>
    <p>This example will disable range from 01 Jan 2019 to 10 Jan 2019 and 31 Jan 2019.</p>
    <p>Can contains Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option <strong>lockDaysFormat</strong>).</p>
    <p>Function description:</p>
    <div class="code">
    ...
    lockDays: (date1, date2, pickedDates) => {
      &nbsp;&nbsp; // define your condition
      &nbsp;&nbsp; // 
      &nbsp;&nbsp; // date1 - start date or day of render (<a href="https://github.com/wakirin/Litepicker/blob/master/src/datetime.ts" target="_blank">DateTime</a>)
      &nbsp;&nbsp; // date2 - end date (DateTime)
      &nbsp;&nbsp; // pickedDates - number of selected days (Number)
      &nbsp;&nbsp; //
      &nbsp;&nbsp; // this function calling on render and after apply
      &nbsp;&nbsp; // thus, you need to check pickedDates.length, if it is:
      &nbsp;&nbsp; // 0 - no dates selected
      &nbsp;&nbsp; // 1 - selected start date
      &nbsp;&nbsp; // 2 - selected start and end dates
      &nbsp;&nbsp; //
      &nbsp;&nbsp; // function should return Boolean, when true - day locked
    }
    ...
    </div>
    `
  },
  {
    name: 'disallowLockDaysInRange',
    type: 'Boolean',
    default: 'false',
    description: `
    <p>Prevent to select date ranges with locked dates.</p>
    <p>Throw error «INVALID_RANGE» in the event <strong>onError</strong>.</p>
    `
  },
  {
    name: 'lockDaysInclusivity',
    type: 'String',
    default: '[]',
    description: '<p>A <code>[</code> indicates inclusion of a value. A <code>(</code> indicates exclusion. If the inclusivity parameter is used, both indicators must be passed.</p>',
    minVersion: '1.0.22',
  },

  {
    name: 'bookedDaysFormat',
    type: 'String',
    default: 'YYYY-MM-DD',
    description: '<p>Date format for option <strong>bookedDays</strong>.</p>',
    deprecated: {
      replacement: `
        use <code>lockDaysFormat</code> instead of <code>bookedDaysFormat</code>
      `
    },
  },
  {
    name: 'bookedDays',
    type: 'Array',
    default: '[]',
    description: `
    <p>Disable days for select. Can contains array with range:</p>
    <p>Eg: [ ['2019-01-01', '2019-01-10'], '2019-01-31' ].</p>
    <p>This example will disable range from 01 Jan 2019 to 10 Jan 2019 and 31 Jan 2019.</p>
    <p>Can contains Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option <strong>bookedDaysFormat</strong>).</p>
    <p>Unlike the option <strong>lockDays</strong>:</p>
    <ul>
      <li>check-in date can be selected as check-out</li>
      <li>check-out date can be selected as check-in</li>
    </ul>
    <p>
      Eg: you have <code>bookedDays: [['2020-01-10', '2020-01-20']]</code>, <code>'2020-01-10'</code> is allowing to select as check-out, <code>'2020-01-20'</code> is allow to select as check-in.
    </p>
    `,
    deprecated: {
      replacement: `
        use <code>lockDays</code> instead of <code>bookedDays</code>
      `
    },
  },
  {
    name: 'disallowBookedDaysInRange',
    type: 'Boolean',
    default: 'false',
    description: `
    <p>Prevent to select date ranges with booked dates.</p>
    <p>Throw error «INVALID_RANGE» in the event <strong>onError</strong>.</p>
    `,
    minVersion: '1.0.22',
    deprecated: {
      replacement: `
       use <code>disallowLockDaysInRange</code> instead of <code>disallowBookedDaysInRange</code>
      `
    },
  },
  {
    name: 'bookedDaysInclusivity',
    type: 'String',
    default: '[]',
    description: '<p>A <code>[</code> indicates inclusion of a value. A <code>(</code> indicates exclusion. If the inclusivity parameter is used, both indicators must be passed.</p>',
    minVersion: '1.0.22',
    deprecated: {
      replacement: `
        use <code>lockDaysInclusivity</code> instead of <code>bookedDaysInclusivity</code>
      `
    },
  },
  {
    name: 'anyBookedDaysAsCheckout',
    type: 'Boolean',
    default: 'false',
    description: '<p>Allow to select any booked days as check-out.</p>',
    minVersion: '1.0.22',
    deprecated: {
      reason: 'Since v2.0.0 option `lockDays` support function.',
      replacement: `
        <div class="code">
        ...
        lockDays: (date1, date2, pickedDates) => {
          &nbsp;&nbsp; if (pickedDates.length < 1) {
          &nbsp;&nbsp;&nbsp;&nbsp; // this example will disable weekends
          &nbsp;&nbsp;&nbsp;&nbsp; // define your own condition for indicate locked days
          &nbsp;&nbsp;&nbsp;&nbsp; const d = date1.getDay();
          &nbsp;&nbsp;&nbsp;&nbsp; return [6, 0].includes(d);
          &nbsp;&nbsp; }

          &nbsp;&nbsp; return false;
        },
        ...
        </div>
      `
    },
  },
  {
    name: 'highlightedDaysFormat',
    type: 'String',
    default: 'YYYY-MM-DD',
    description: '<p>Date format for option <strong>highlightedDays</strong>.</p>',
    minVersion: '1.1.4',
  },
  {
    name: 'highlightedDays',
    type: 'Array',
    default: '[]',
    description: `
    <p>Highlight days. Can contains array with range:</p>
    <p>Eg: [ ['2019-01-01', '2019-01-10'], '2019-01-31' ].</p>
    <p>Can contains Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option <strong>highlightedDaysFormat</strong>).</p>
    `,
    minVersion: '1.1.4',
  },

  {
    name: 'dropdowns',
    type: 'Object',
    default: `{
      minYear: 1990,
      maxYear: null,
      months: false,
      years: false,
    }`,
    description: `
    <p>Enable dropdowns for months, years.</p>
    <p>If <code>maxYear</code> is <code>null</code> then <code>maxYear</code> will be equal to <code>(new Date()).getFullYear()</code>.</p>
    <p>from <strong>v1.4.7</strong> <br> <code>years</code> can be equal to <code>asc</code> string to change the sort direction.</p>
    `,
    minVersion: '1.0.21',
  },

  {
    name: 'buttonText',
    type: 'Object',
    default: `{
      apply: 'Apply',
      cancel: 'Cancel',
      previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
      nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
      reset: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/> </svg>',
    }
    `,
    description: '<p>Text for buttons.</p>'
  },
  {
    name: 'tooltipText',
    type: 'Object',
    default: `
    {
      one: 'day',
      other: 'days',
    }
    `,
    description: `
    <p>Text for the tooltip.</p>
    <p>Keys depends on option <strong>lang</strong> (see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules" target="_blank">Intl.PluralRules</a>).</p>
    `
  },
  {
    name: 'resetBtnCallback',
    type: 'Function',
    default: 'null',
    description: `
    <p><code>useResetBtn</code> must be at <b>true</b>.</p>
    <p>This function is call when the reset button is click.</p>
    <p>By default it will call the <code>clearSelection</code> method.</p>
    `,
    deprecated: {
      reason: 'Since v2.0.0 added new option `resetButton`.',
      replacement: `
        <div class="code">
        ...
        resetButton: true,
        ...
        </div>
        OR
        <div class="code">
        ...
        resetButton: (picker) => {
          &nbsp;&nbsp; let b = document.createElement('button');
          &nbsp;&nbsp; b.innerText = 'Clear';
          &nbsp;&nbsp; b.addEventListener('click', (evt) => {
            &nbsp;&nbsp;&nbsp;&nbsp; evt.preventDefault();

            &nbsp;&nbsp;&nbsp;&nbsp; // some custom action
            &nbsp;&nbsp; });

            &nbsp;&nbsp; return b;
        },
        ...
        </div>
      `
    },
  },

  {
    name: 'moduleRanges',
    type: 'Boolean|Object',
    default: 'null',
    description: `
    <p></p>
    <p>Set predefined date ranges the user can select from. Each key is the label for the range, and its value
    an array with two dates representing the bounds of the range.</p>
    <p></p>
    <p>When is <code>true</code> will use default ranges (Today, Yesterday, Last 7 Days, Last 30 Days, This
      Month, Last Month).</p>
    <p>You can provide your ranges and position, eg:</p>
    <div class="code">
      ...
      moduleRanges: { 
      &nbsp;&nbsp; position: 'left', 
      &nbsp;&nbsp; ranges: {
      &nbsp;&nbsp;&nbsp;&nbsp; 'My Custom Range': [new Date(/* range start date */), new Date(/* range end date */)],
      &nbsp;&nbsp;&nbsp;&nbsp; 'My Other Range': [new Date(/* range start date */), new Date(/* range end date */)]
      &nbsp;&nbsp; }
      }
      ...      
    </div>
    `,
    minVersion: '1.3.0',
    dependencies: [
      {
        name: 'litepicker-module-ranges',
        link: 'https://github.com/wakirin/litepicker-module-ranges',
      }
    ],
  },
  {
    name: 'moduleNavKeyboard',
    type: 'Boolean',
    default: 'null',
    description: `
    <p>Adds keyboard navigation.</p>
    `,
    minVersion: '1.3.4',
    dependencies: [
      {
        name: 'litepicker-module-navkeyboard',
        link: 'https://github.com/wakirin/litepicker-module-navkeyboard',
      },
    ],
  },
  {
    name: 'switchingMonths',
    type: 'Number',
    default: 'null',
    description: '<p>Indicates whether the date range picker should switch months by this value, instead of value of <code>numberOfMonths</code>.</p>',
    minVersion: '2.0.0',
  },
  {
    name: 'resetButton',
    type: 'Boolean|Function',
    default: 'null',
    description:
      `
        <p>Adds a reset button to clear the current selection..</p>

        <div class="code">
        ...
        resetButton: true,
        ...
        </div>
        OR
        <div class="code">
        ...
        // Do not need call clear selection inside this function.
        // function should return HTML element
        resetButton: () => {
          &nbsp;&nbsp; let btn = document.createElement('button');
          &nbsp;&nbsp; btn.innerText = 'Clear';
          &nbsp;&nbsp; btn.addEventListener('click', (evt) => {
            &nbsp;&nbsp;&nbsp;&nbsp; evt.preventDefault();

            &nbsp;&nbsp;&nbsp;&nbsp; // some custom action
            &nbsp;&nbsp; });

            &nbsp;&nbsp; return btn;
        },
        ...
        </div>
      `,
    minVersion: '2.0.0',
  },
];

export default options;
