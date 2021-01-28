---
type: Boolean
default: true
---

Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.

{% capture collapse_content %}
<div style="display:flex">
  <input id="input-auto-apply" class="form-control" style="width: 150px;" readonly/>
</div>
<div class="demo-wrapper" data-cfg="autoApply"></div>

---

Code:

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  autoApply: false,
})
```
{% endcapture %}

{% include collapse.html title="Demo" content=collapse_content %}