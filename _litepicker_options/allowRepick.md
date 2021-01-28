---
type: Boolean
default: false
---

If date range is already selected, then user can change only one of start date or end date (depends on clicked field) instead of new date range.

{% capture collapse_content %}
<div style="display:flex">
  <input id="input-start-allow-repick" class="form-control" style="width: 150px;margin-right: 15px;">
  <input id="input-end-allow-repick" class="form-control" style="width: 150px">
</div>
<div class="demo-wrapper" data-cfg="allowRepick"></div>

---

Code:

```js
new Litepicker({
  element: document.getElementById('start-date'),
  elementEnd: document.getElementById('end-date'),
  singleMode: false,
  allowRepick: false,
})
```
{% endcapture %}

{% include collapse.html title="Demo" content=collapse_content %}