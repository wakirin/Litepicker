---
layout: default
nav: FAQ
title: "FAQ"
description: "Frequently asked questions."
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

## How to add Litepicker to NuxtJS ?

- Download Litepicker from CDN: `https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js`
- Place in `plugins` folder of your NuxtJS project.
- Update `nuxt.config.js`
```js
// nuxt.config.js
  plugins: [
    { src: '~/plugins/litepicker.js', mode: 'client' }
  ],
```
- Initialize Litepicker
```ts
// index.vue
export default {
    mounted: function () {
      new Litepicker({
        element: document.getElementById("datepicker"),
      });
    },
};
```

## Need a custom solution for date picker ?
Contact me, we will discuss it.  
<a href="mailto:litepicker@lvl.ninja">litepicker@lvl.ninja</a>