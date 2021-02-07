---
layout: default
nav: Customize colors
title: "Customize colors"
nav_order: 6
permalink: /docs/customize-colors
---

# Customize colors
{: .no_toc }

---

Include styles after Litepicker styles or use `!important` to override values.

Example:
```html

<style>
:root {
  /* change background color for .container__months */
  --litepicker-container-months-color-bg: #333 !important; 
}
</style>
```

See predefined colors in [main.scss](https://github.com/wakirin/Litepicker/blob/master/src/scss/main.scss).