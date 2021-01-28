---
type: Object
default: { 
   minYear: 1990, 
   maxYear: null, 
   months: false, 
   years: false
 }
since: 1.0.21
---

Enable dropdowns for months, years.

If `maxYear` is `null` then `maxYear` will be equal to `(new Date()).getFullYear()`.

Since v1.4.7 `years` can be equal to `asc` string to change the sort direction.