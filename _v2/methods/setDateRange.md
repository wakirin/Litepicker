---
return: void
args: (date1, date2, force)
---

Set date range.

`date1`, `date2` is should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option `format`).  

since 2.0.5:  
- `force` is Boolean, default: `false`. When `true` ignores locked days when selection.