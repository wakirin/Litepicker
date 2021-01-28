---
event: change:year
args: (date, calendarIdx)
---

`date` is DateTime object of year.

`calendarIdx` is index of calendar when splitView is enabled. 

Event is called after change year.

```js
...
setup: (picker) => {
  picker.on('change:year', (date, calendarIdx) => {
    // some action
  });
},
...
```