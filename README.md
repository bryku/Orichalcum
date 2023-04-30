### Orichalcum

Orichalcum is a Frontend Framework inspired by [Mithril](https://mithril.js.org/) and [Express](https://expressjs.com/), but with a micro twist... reduced memory and processing.
&nbsp;

### Pros and Cons

Orichalcum takes a simplistic approach to rendering. Instead of using a virutal dom or shadow dom, it simply renders your JavaScript directly to the document. The **downside** is that Orichalcum doesn't support data binding like **Mithril**, but the **plus side** is that it reduces processing that obersers or rerendering require.
&nbsp;

### Size

Orichalcum comes 720b-2.4kb depending on the plugins you need.  

* orichalcum-min.js - 720bytes
* orichalcum-plugins-router.min.js - 1.6kb
* orichalcum-plugins-fetch.min.js - 1.6kb
* orichalcum-bundle.min.js - 2.4kb (includes: min, router, fetch)

### Example - Basics


