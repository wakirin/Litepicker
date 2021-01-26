---
return: DateTime
args: (date)
since: 2.0.0
---

`date` is optional, if empty, will used `new Date()`.

Examples:
```js
const picker = new Litepicker({ ... });

picker.DateTime(); // return DateTime object
// or
picker.DateTime(new Date()); // also return DateTime object based on provided Date object
```