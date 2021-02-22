---
layout: default
nav: Home
title: "Open-source date range picker. No dependencies."
description: "Lightweight, highly configurable, many options. Plugins: keyboard accessibility, mobile friendly, predefined ranges, multiple select."
nav_order: 1
permalink: /
---

# Litepicker
{: .no_toc .fs-9 }

Date range picker - lightweight, no dependencies.
{: .fs-6 .fw-300 }

<div id="index-demo">
  <div id="index-demo-selection">&nbsp;</div>
  <div class="demo-wrapper" data-cfg="index" style="min-height: 232px;">
    <div id="index-demo-lp"></div>
  </div>
</div>

## Features
{: .no_toc }
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
- Multiple select (with plugin)


[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/wakirin/Litepicker){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Getting started

### Installation
{: .no_toc }

#### npm
{: .no_toc }
```bash
npm install litepicker
```

#### CDN
{: .no_toc }
```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
```

Be careful, this link will return the latest version.  
To avoid breaking changes, you need to install a specific version.   
See [jsdelivr docs](https://www.jsdelivr.com/features#npm).

## Usage

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker.

```ts
import Litepicker from 'litepicker';
```

_If you encounter errors in Typescript, try adding `esModuleInterop: true` to your tsconfig.json. (see issue [#53](https://github.com/wakirin/Litepicker/issues/53))_


Now you can create Litepicker instance.

```html
<script>
  const picker = new Litepicker({ 
    element: document.getElementById('litepicker') 
  });
</script>

```

## No CSS version
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
{: .no_toc }
```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/nocss/litepicker.js"></script>
```

#### CSS basic styles
{: .no_toc }
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css"/>
```

## Bundle version (all plugins included)
#### Non-module environments
{: .no_toc }
```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/bundle.js"></script>
```

## IE11

To support IE11 you need to install polyfills [litepicker-polyfills-ie11](https://github.com/wakirin/litepicker-polyfills-ie11).

Example:

```html
<--- include polyfill first --->
<script src="https://cdn.jsdelivr.net/npm/litepicker-polyfills-ie11/dist/index.js"></script>
<--- then include the Litepicker library --->
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
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

Litepicker is &copy; 2019-{{ "now" | date: "%Y" }} by [Rinat G.](https://github.com/wakirin)

## License

Litepicker is distributed by an [MIT license](https://github.com/wakirin/Litepicker/blob/master/README.md).

