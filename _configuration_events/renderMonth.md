---
event: render:month
args: "(month, date)"
---

`month` is element of rendered month.

`date` is DateTime object of month.

Event is called after renderMonth function.

```js
...
setup: (picker) => {
  picker.on('render:month', (month, date) => {
    // some action
  });
},
...
```