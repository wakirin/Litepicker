---
event: render:day
args: "(day, date)"
---

`day` is element of rendered day.

`date` is DateTime object of day.

Event is called after renderDay function.

```js
...
setup: (picker) => {
  picker.on('render:day', (day, date) => {
    // some action
  });
},
...
```