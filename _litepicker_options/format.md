---
type: String
default: YYYY-MM-DD
---

The default output format.

Allowed formats:

|  | Token | Output |
|-------|--------|---------|
| Day of Month | D | 1 2 ... 30 31 |
|  | DD | 01 02 ... 30 31 |
| Month | M | 1 2 ... 11 12 |
|  | MM | 01 02 ... 11 12 |
|  | MMM | Jan Feb ... Nov Dec |
|  | MMMM | January February ... November December |
| Year | YY | 70 71 ... 29 30 |
|  | YYYY | 1970 1971 ... 2029 2030 |

You may escape formatting tokens using \\.

Eg.:

```js
format: 'YYYY-MM-DD\T00:00:00'
```

Result: **2020-01-01T00:00:00**


Since v2.0.0 option `format` support external library for parse/output.

Example with [luxon](https://moment.github.io/luxon/index.html):

```js
...
format: {
   // parse function should return Date object
   // date - Date object or string (perhaps there will be more types, need to check)
   parse(date) {
    if (date instanceof Date) {
      return date;
    }

    if (typeof date === 'string') {
      return luxon.DateTime.fromFormat(date, 'yyyy LLL dd').toJSDate();
    }

    // from unix timestamp (eg.: new Date().getTime())
    if (typeof date === 'number') {
      return new Date(date);
    }

    return new Date();
   },

   // date - Date object
   // output function should return string
   output(date) {
     return luxon.DateTime.fromJSDate(date)
         .toFormat('yyyy LLL dd');
   }
}
...
```