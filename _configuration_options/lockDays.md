---
type: Array
default: []
---

Disable days for select. Can contains array with range:

Eg: [ ['2019-01-01', '2019-01-10'], '2019-01-31' ].

This example will disable range from 01 Jan 2019 to 10 Jan 2019 and 31 Jan 2019.

Can contains Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option `lockDaysFormat`).