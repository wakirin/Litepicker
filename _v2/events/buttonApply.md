---
event: button:apply
args: (date1, date2)
---

`date1`, `date2` is DateTime object. 

Event is called after click on button apply (footer).

```js
...
setup: (picker) => {
  picker.on('button:apply', (date1, date2) => {
    // some action
  });
},
...
```