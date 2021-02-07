---
layout: default
nav: Methods
title: Methods
nav_order: 4
permalink: /docs/methods
---

# Methods
{: .no_toc }

---

{% for opt in site.v2 %}
  {% unless opt.url contains '/methods/' %}
    {% continue %}
  {% endunless %}
{% assign optName = opt.path | replace: '_v2/methods/', '' | replace: '.md', '' | replace: 'zzz_', '' %}
{% if opt.deprecated %}
## <span class="label label-red">Deprecated</span> {{ optName }} 
{: .text-grey-dk-000 }
{% elsif opt.since %}
## {{ optName }} <sup>{{ opt.since }}+</sup>
{% else %}
## {{ optName }}
{% endif %}

Arguments: `{{ opt.args }}`

Return: `{{ opt.return  }}`

{{ opt.content | markdownify }}

{% endfor %}