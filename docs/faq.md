---
layout: default
title: FAQ
nav_order: 7
permalink: /docs/examples
---

# FAQ
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## How to show nights in tooltip ?

<div>
  <input id="input-eg-show-nights" class="form-control" style="width: 300px;margin: 15px 0" readonly/>
</div>
<div class="demo-wrapper" data-cfg="egShowNights"></div>  

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  singleMode: false,
  tooltipText: {
    one: 'night',
    other: 'nights'
  },
  tooltipNumber: (totalDays) => {
    return totalDays - 1;
  }
})
```

## How to show previous month instead of current ?

<div>
  <input id="input-eg-show-previous-month" class="form-control" style="width: 300px;margin: 15px 0" readonly/>
</div>
<div class="demo-wrapper" data-cfg="egShowPrevious"></div>  

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  startDate: new Date(),
  setup: (picker) => {

    picker.on('show', () => {
      let date = picker.getDate();
      if (date) {
        date.setMonth(date.getMonth() - 1);
        picker.gotoDate(date);
      }
    });

  }
})
```

## @TODO
add more examples