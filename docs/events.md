---
layout: default
nav: Events
title: "Events"
description: "All available Litepicker events."
nav_order: 3
permalink: /docs/events
---

# Events
{: .no_toc }

---

Example initialize:

```js

...
setup: (picker) => {
   picker.on('show', () => {
     // some action after show
   });

   picker.on('render', (ui) => {
     // some action after render
     // ui is root element of picker
   });
},
...
```

# Event list
{: .no_toc }

{% for opt in site.v2 %}
  {% unless opt.url contains '/events/' %}
    {% continue %}
  {% endunless %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ opt.event }} 
{: .text-grey-dk-000 }
{% elsif opt.since %}
## {{ opt.event }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ opt.event }}
{% endif %}

Arguments: `{{ opt.args }}`

{{ opt.content | markdownify }}

{% endfor %}