---
layout: default
title: Options
nav_order: 2
permalink: /docs/options
---

# Options
{: .no_toc }

---

{% for opt in site.v2 %}
  {% unless opt.url contains '/options/' %}
    {% continue %}
  {% endunless %}
{% assign optName = opt.path | replace: '_v2/options/', '' | replace: '.md', '' | replace: 'zzz_', '' %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ optName }} 
{: .text-grey-dk-000 }
{% elsif opt.since %}
## {{ optName }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ optName }}
{% endif %}

Type: `{{ opt.type }}`

Default: `{{ opt.default | jsonify }}`

{{ opt.content | markdownify }}

{% endfor %}