const methods = [
  {
    name: 'show()',
    description: '<p>Make the picker visible.</p>',
  },
  {
    name: 'hide()',
    description: '<p>Hide the picker.</p>',
  },
  {
    name: 'getDate()',
    description: '<p>Alias of <strong>getStartDate</strong>.</p>',
  },
  {
    name: 'getStartDate()',
    description: '<p>Return current start of date range as Date Object.</p>',
  },
  {
    name: 'getEndDate()',
    description: '<p>Return current end of date range as Date Object.</p>',
  },
  {
    name: 'setDate(date)',
    description: `
    <p>Set date when <strong>singleDate</strong> is true.</p>
    <p>date is should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    `,
  },
  {
    name: 'setDateRange(date1, date2)',
    description: `
    <p>Set date range.</p>
    <p>date1, date2 is should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option <strong>format</strong>).</p>
    `
  },
  {
    name: 'setLockDays(array)',
    description: `
    <p>Set lock days.</p>
    <p>See options <strong>lockDays</strong> for format information.</p>
    `
  },
  {
    name: 'setBookedDays(array)',
    description: `
    <p>Set booked days.</p>
    <p>See options <strong>bookedDays</strong> for format information.</p>
    `,
    deprecated: {
      reason: 'Since v2.0.0 there is no option `bookedDays`.',
      replacement: `
        use <code>setLockDays</code> instead of <code>setBookedDays</code>
      `
    },
  },
  {
    name: 'setHighlightedDays(array)',
    description: `
    <p>Set highlighted days.</p>
    <p>See options <strong>highlightedDays</strong> for format information.</p>
    `
  },
  {
    name: 'gotoDate(date, idx)',
    description: `
    <p>Set month by the date.</p>
    <p>date is should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option
      <strong>format</strong>).</p>
    <p>idx is required when option <strong>splitView</strong> is enabled.</p>
    `
  },
  {
    name: 'setOptions(object)',
    description: `
    <p>Set new options to the picker.</p>
    <p>Options <strong>element, elementEnd, parentEl</strong> cannot be changed.</p>
    `
  },
  {
    name: 'clearSelection()',
    description: '<p>Clear selection.</p>'
  },
  {
    name: 'destroy()',
    description: '<p>Destroy the picker.</p>'
  }
];

export default methods;
