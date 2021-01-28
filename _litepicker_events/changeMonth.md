---
event: change:month
args: (date, calendarIdx)
---

`date` is DateTime object of month.

`calendarIdx` is index of calendar when splitView is enabled. 

Event is called after change month.

```js
...
setup: (picker) => {
  picker.on('change:month', (date, calendarIdx) => {
    // some action
  });
},
...
```