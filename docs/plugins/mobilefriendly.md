---
layout: default
nav: Mobile friendly plugin
title: "Mobile friendly plugin"
description: "Adds swipes (left/right) to switch months."
parent: Plugins
---

# Mobile friendly plugin

Adds swipes (left/right) to switch months.

Litepicker version 2.0.0 or higher is required.

{% capture mobilefriendly_video %}
<video class="demo-video" autoplay="autoplay" muted loop preload="metadata">
    <source src="{{ '/assets/video/mobilefriendly.mp4' | relative_url }}" type="video/mp4">
</video>
{% endcapture %}

{% include collapse.html title="Video" content=mobilefriendly_video %}

### Installation
{: .no_toc }

```html
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>
// include plugin after Litepicker
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/plugins/mobilefriendly.js"></script>
```

If you’re using a bundler, e.g. webpack, you’ll need to import Litepicker first.

```ts
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/mobilefriendly';
```

Now you can create Litepicker instance with plugin:

```html
<script>
const picker = new Litepicker({ 
  element: document.getElementById('litepicker'),
  plugins: ['mobilefriendly']
});
</script>
```

# Events:
{: .no_toc }

### mobilefriendly.before:show <sup>2.0.0+</sup>
{: .no_toc }

Arguments: `(el)`

`el` is triggered element. 

Event is called before show in mobile view.

```js
...
setup: (picker) => {
  picker.on('mobilefriendly.before:show', (el) => {
    // some action
  });
},
...
```

### mobilefriendly.show <sup>2.0.0+</sup>
{: .no_toc }

Arguments: `(el)`

`el` is triggered element. 

Event is called after show in mobile view.

```js
...
setup: (picker) => {
  picker.on('mobilefriendly.show', (el) => {
    // some action
  });
},
...
```

{% capture mobilefriendly_content %}
Test on mobile.

<div style="display:flex">
  <input id="input-mobilefriendly" class="form-control" style="width: 250px" readonly/>
</div>
<div class="demo-wrapper" data-cfg="mobilefriendly"></div>

---

Code:

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  plugins: ['mobilefriendly']
})
```
{% endcapture %}

{% include collapse.html title="Demo" content=mobilefriendly_content %}