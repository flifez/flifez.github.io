---
---

// This blank YAML front matter is required for Jekyll to process Liquid tags in JavaScript!

let time = '{{ site.time }}';
var raw = time.split(' ');
var processed = raw[1].split(':')[0] + ':' + raw[1].split(':')[1];

document.write(processed);