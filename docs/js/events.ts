const events = [
  {
    name: 'onShow',
    default: 'null',
    description: `
    <p>Trigger on show the picker.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onShow: function() {
    &nbsp;&nbsp; console.log('show');
    }
    ...
    </div>
    `
  },
  {
    name: 'onHide',
    default: 'null',
    description: `
    <p>Trigger on hide the picker.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onHide: function() {
    &nbsp;&nbsp; console.log('hide');
    }
    ...
    </div>
    `
  },
  {
    name: 'onSelect',
    default: 'null',
    description: `
    <p>Trigger on select date/date range.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onSelect: function(date1, date2) {
    &nbsp;&nbsp; console.log(date1, date2);
    }
    ...
    </div>
    <p>date1 and date2 is DateTime Object.</p>
    <p>date2 is available when the option <strong>singleMode</strong> is false</p>
    `
  },
  {
    name: 'onSelectStart',
    default: 'null',
    description: `
    <p>Trigger on select start date of range.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onSelectStart: function(date) {
    &nbsp;&nbsp; console.log(date);
    }
    ...
    </div>
    <p>date DateTime Object.</p>
    `
  },
  {
    name: 'onSelectEnd',
    default: 'null',
    description: `
    <p>Trigger on select end date of range.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onSelectEnd: function(date1, date2) {
    &nbsp;&nbsp; console.log(date1, date2);
    }
    ...
    </div>
    <p>date1 and date2 is DateTime Object.</p>
    `
  },
  {
    name: 'onError',
    default: 'null',
    description: `
    <p>Trigger on error date range.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onError: function(error) {
    &nbsp;&nbsp; console.log(error);
    }
    ...
    </div>
    `
  },
  {
    name: 'onRender',
    default: 'null',
    description: `
    <p>Trigger after the render of the picker.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onRender: function(element) {
    &nbsp;&nbsp; console.log('picker element', element);
    }
    ...
    </div>
    `
  },
  {
    name: 'onRenderDay',
    default: 'null',
    description: `
    <p>Trigger after rendering a day item.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onRenderDay: function(element) {
    &nbsp;&nbsp; console.log('day element', element);
    }
    ...
    </div>
    `
  },
  {
    name: 'onChangeMonth',
    default: 'null',
    description: `
    <p>Trigger on change month..</p>
    <p>Example:</p>
    <div class="code">
    ...
    onChangeMonth: function(date, idx) {
    &nbsp;&nbsp; console.log(date, idx);
    }
    ...
    </div>
    <p>date is Date Object, idx is Number.</p>
    <p>idx is showing which calendar has change when option <strong>splitView</strong> is enabled.</p>
    <p>idx starts from 0.</p>
    `
  },
  {
    name: 'onChangeYear',
    default: 'null',
    description: `
    <p>Trigger on change year..</p>
    <p>Example:</p>
    <div class="code">
    ...
    onChangeYear: function(date, idx) {
    &nbsp;&nbsp; console.log(date, idx);
    }
    ...
    </div>
    <p>date is Date Object, idx is Number.</p>
    <p>idx is showing which calendar has change when option <strong>splitView</strong> is enabled.</p>
    <p>idx starts from 0.</p>
    `
  },
  {
    name: 'onDayHover',
    default: 'null',
    description: `
    <p>Trigger when user hovers or clicks a day item.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onDayHover: function(date, attributes) {
    &nbsp;&nbsp; console.log(date, attributes);
    }
    ...
    </div>
    <p><code>date</code> is the date object of the currently hovered day item.</p>
    <p><code>attributes</code> is a string array with the day item's css classes (e.g.
      <strong>is-start-date</strong>, <strong>is-locked</strong>, <strong>is-booked</strong>, etc.).</p>
    `
  },
  {
    name: 'onShowTooltip',
    default: 'null',
    description: `
    <p>Trigger on show tooltip the picker.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onShowTooltip: function(tooltip, dayElement) {
    &nbsp;&nbsp; console.log(tooltip, dayElement);
    }
    ...
    </div>
    `,
    minVersion: '1.5.4',
  },
  {
    name: 'onCancelButton',
    default: 'null',
    description: `
    <p>Trigger on click button Cancel.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onCancelButton: function() {
    &nbsp;&nbsp; console.log('button cancel clicked');
    }
    ...
    </div>
    `,
    minVersion: '2.0.0',
  },
  {
    name: 'onApplyButton',
    default: 'null',
    description: `
    <p>Trigger on click button Apply.</p>
    <p>Example:</p>
    <div class="code">
    ...
    onApplyButton: function(date1, date2) {
    &nbsp;&nbsp; console.log(date1, date2);
    }
    ...
    </div>
    `,
    minVersion: '2.0.0',
  },
];

export default events;
