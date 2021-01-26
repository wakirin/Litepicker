---
type: Array
default: []
deprecated: true
---

_Disable days for select. Can contains array with range:_

_Eg: [ ['2019-01-01', '2019-01-10'], '2019-01-31' ]._

_This example will disable range from 01 Jan 2019 to 10 Jan 2019 and 31 Jan 2019._

_Can contains Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option bookedDaysFormat)._

_Unlike the option lockDays:_

_check-in date can be selected as check-out_
_check-out date can be selected as check-in_
_Eg: you have bookedDays: [['2020-01-10', '2020-01-20']], '2020-01-10' is allowing to select as check-out, '2020-01-20' is allow to select as check-in._

### Replacement:
use `lockDays` instead of `bookedDays`.