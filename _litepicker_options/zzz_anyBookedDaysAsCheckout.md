---
type: Boolean
default: false
deprecated: true
since: 1.0.22
---

_Allow to select any booked days as check-out._

**Reason: Since v2.0.0 added option `lockDaysFilter`.**

### Replacement:
```js
...
lockDaysFilter: (date1, date2, pickedDates) => {
   if (pickedDates.length < 1) {
     // this example will disable weekends
     // define your own condition for indicate locked days
     const d = date1.getDay();
     return [6, 0].includes(d);
   }

   return false;
},
...
```