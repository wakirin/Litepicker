---
type: Function
default: null
since: 2.0.0
---

Lock days by custom function.
Examples:

```js
...
lockDaysFilter: (date1, date2, pickedDates) => {
   // define your condition
   //
   // date1 - start date or day of render (DateTime)
   // date2 - end date (DateTime)
   // pickedDates - number of selected days (Number)
   //
   // this function calling on render and after apply
   // thus, you need to check pickedDates.length, if it is:
   // 0 - no dates selected
   // 1 - selected start date
   // 2 - selected start and end dates
   //
   // function should return Boolean, when true - day locked
}
...
```

Example for disabled weekends:

```js
...
lockDaysFilter: (day) => {
   const d = day.getDay();

   return [6, 0].includes(d);
},
...
```

With disallowLockDaysInRange option enabled:

```js
...
lockDaysFilter: (date1, date2, pickedDates) => {

   while (date1.toJSDate() < date2.toJSDate()) {
     const day = date1.getDay();
     isWeekend = [6, 0].includes(day);
     if (isWeekend) { return true; }
       date1.add(1, 'day');
   }

   return false;
},
...
```

date1, date2 is [DateTime](https://github.com/wakirin/Litepicker/blob/master/src/datetime.ts) object.