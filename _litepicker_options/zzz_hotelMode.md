---
type: Boolean
default: false
deprecated: true
---

_Tooltip will shown nights count instead of days._

_Also required to edit option tooltipText._

_from v1.0.22 when is true also changing this options:_

_bookedDaysInclusivity: '[)' (allowing to select check-out date as check-in date)_

_disallowBookedDaysInRange: true_

_selectForward: true_

_You can overwrite them if you manually set some of these options._

**Reason: The option `hotelMode` is misleading because there many cases for each hotel.**

### Replacement:
Use option `lockDaysFilter` and control the behavior you want and use option tooltipNumber (see example in `tooltipNumber` description).