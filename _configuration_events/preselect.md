---
event: preselect
args: (date1, date2)
---

`date1`, `date2` is DateTime object.

Event is called on select days (before submit selection).

```js
...
setup: (picker) => {
  picker.on('preselect', (date1, date2) => {
    // some action
  });
},
...
```