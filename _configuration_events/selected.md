---
event: selected
args: (date1, date2)
---

`date1`, `date2` is DateTime object.

Event is called when selection is submitted.

```js
...
setup: (picker) => {
  picker.on('selected', (date1, date2) => {
    // some action
  });
},
...
```