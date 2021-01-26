---
type: Boolean
default: false
deprecated: true
---

_Disable Saturday and Sunday._

**Reason: Since v2.0.0 added option `lockDaysFilter`.**

### Replacement:
```js
...
lockDaysFilter: (day) => {
   const d = day.getDay();

   return [6, 0].includes(d);
},
...
```