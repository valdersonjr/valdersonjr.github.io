---
layout: page
permalink: /tags/
title: Tags
---

<section>
{% assign tags_sorted = site.tags | sort %}
{% for tag in tags_sorted %}
    {% capture tag_name %}{{ tag | first }}{% endcapture %}

    <h3 class="tag-head"><small>{{ tag_name }}</small></h3>
    <a name="{{ tag_name | slugize }}"></a>

    {% for post in site.tags[tag_name] %}
      <ul>
        <li><time>{{ post.date | date:"%d/%m/%Y" }} - </time>
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            {{ post.title }}
          </a>
        </li>
      </ul>
    {% endfor %}
    <br>
{% endfor %}
</section>