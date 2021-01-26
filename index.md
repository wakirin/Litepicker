---
layout: default
title: Home
nav_order: 1
description: "Date range picker - lightweight, no dependencies."
permalink: /
---

# Litepicker
{: .fs-9 }

Date range picker - lightweight, no dependencies.
{: .fs-6 .fw-300 }

## Features
- No dependencies
- Single date or date range
- Show multiple months
- Min/Max days for select and/or Min/Max dates for select
- Select forward/backward
- Inline mode
- Repick date range
- Lock days
- Keyboard accessibility (with plugin)
- Mobile friendly (with plugin)
- Predefined ranges (with plugin)


[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/wakirin/Litepicker){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Getting started

### Installation

#### npm
```bash
npm install litepicker
```

#### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
```

### Usage

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker.

```ts
import Litepicker from 'litepicker';
```

_If you encounter errors in Typescript, try adding `esModuleInterop: true` to your tsconfig.json. (see issue [#53](https://github.com/wakirin/Litepicker/issues/53))_


### Now you can create Litepicker instance.

```js
<script>
  const picker = new Litepicker({ 
    element: document.getElementById('litepicker') 
  });
</script>

```

### No CSS version
To prevent the inclusion of the CSS styles tag in the head, you can define a global variable before initializing Litepicker:

```js
window.disableLitepickerStyles = true;
const picker = new Litepicker({ ... });
```

Another way you can use version which does not include CSS styles.

```ts
import Litepicker from 'litepicker/dist/nocss/litepicker.umd.js';
```

#### Non-module environments
```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/nocss/litepicker.js"></script>
```

#### CSS basic styles
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/litepicker/dist/css/style.css"/>
```

## IE11

To support IE11 you need to install polyfills [litepicker-polyfills-ie11](https://github.com/wakirin/litepicker-polyfills-ie11).

Example:

```html
<--- include polyfill first --->
<script src="https://cdn.jsdelivr.net/npm/litepicker-polyfills-ie11/dist/index.js"></script>
<--- then include the Litepicker library --->
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/js/main.js"></script>
```


If you’re using a bundler, e.g. webpack:
```ts
// Include this library first
import 'litepicker-polyfills-ie11';
// then import Litepicker
import Litepicker from 'litepicker';
```

---

## About the project

Litepicker is &copy; 2017-{{ "now" | date: "%Y" }} by [Rinat G.](https://github.com/wakirin)

### License

Litepicker is distributed by an [MIT license](https://github.com/wakirin/Litepicker/blob/master/README.md).

