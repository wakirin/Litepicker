---
type: Boolean
default: false
deprecated: true
since: 1.0.22
---

_Prevent to select date ranges with booked dates._

_Throw error «INVALID_RANGE» in the event onError._

### Replacement:
use `disallowLockDaysInRange` instead of `disallowBookedDaysInRange`.