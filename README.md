### Orichalcum

Orichalcum is a Frontend Framework inspired by [Mithril](https://mithril.js.org/) and [Express](https://expressjs.com/), but with a micro twist... Our approach is to remove HTML from the development process and reduce memory and processing. 
&nbsp;

### Pros and Cons

Orichalcum takes a simple approach to rendering, instead of using a virutal dom or shadow dom we render directly to the document. The **plus side** is that we don't have to expend additional processing on observers or rerendering, but the **downside** is that we don't support data binding like Mithril.
&nbsp;

* Pros
    * Reduces Processing
    * Smaller File Size
* Cons
    * No Data Binding

### Size

* orichalcum.js - 674b (uncompressed)
* orichalcum.min.js - 594b (uncompressed)
* orichalcum-slim.min.js - 720b (uncompressed)
    * o() - element constructor
* orichalcum.min.js - 3.9kb (uncompressed)
    * o() - element constructor
    * router
    * fetch
    * form 

### Examples - o(type, attribute, text/child) - (string, object, string/element)

We can create Elements using the **o()**.
This function can accept 1, 2, or 3 attributes.

* type
* type, text
* type, attr, text

**Type**

```
document.body.append(
    o('button')
)
```

**Text**

```
document.body.append(
    o('button','CLICK ME')
)
```

**Attributes**

```
document.body.append(
    o('button',{class: 'text-red'},'CLICK ME')
)
```

We can get a little crazy and use class, style, styles, and events.

```
document.body.append(
    o('button',{
      class: 'texts-red',
      style: 'border: 3px solid #000',
      styles: {
         padding: '.3rem .6rem',
         borderRadius: '1rem',
      },
      onclick: (event)=>{
         console.log('you clicked me')
      },
    },'CLICK ME')
)
```

**Children**

When using o(), we can ignore the text and directly create the children

```
document.body.append(
    o('ul',{},[
      o('li','Item 1'),
      o('li','Item 2'),
      o('li','Item 3'),
    ])
)
```

### Example - o.router(element, routes) (string, object)

```
o.router(element, {
   '/': (req)=>{}
})
```
Request or **req** is sent to the callback function, and containers the following:

|Feature       |URL                               |Function                            |
|:------------:|:---------------------------------|:-----------------------------------|
|URL Parameters|`website.com/users/:user`         |req.query.user                      |
|Get Parameters|`website.com/search?name=john_doe`|req.get.name                        |
|Fragment      |`website.com/#nav`                |req.hash                            | 
|Element       |                                  |req.element                         | 

**NOTE**: You can only have 1 router per application.

```
let components = {};
components.nav = () =>{
    return o('nav',{id: 'nav'},[
        o('a',{href: '/#test'},'home '),
        o('a',{href: '/users'},'users '),
        o('a',{href: '/search?name=john_doe'},'search')
    ])
};

o.router(document.body,{
    '/search': (req)=>{
        o.title('Website.com / Search');
        return [
            o('h1','search?name='+req.get.name || ''),
            components.nav(),
        ]
    },
    '/users/:user': (req)=>{
        o.title('Website.com / Users / '+req.parameters.user);
        return [
            o('h1','users/'+req.parameters.user),
            components.nav(),
        ]
    },
    '/users': (req)=>{
        o.title('Website.com / Users');
        return [
            o('h1','users'),
            components.nav(),
            o('ul',[
                o('li',o('a',{href: '/users/john_doe'},'John Doe')),
                o('li',o('a',{href: '/users/jane_doe'},'Jane Doe')),
            ]),
        ]
    },
    '/': (req)=>{
        o.title('Website.com / Home');
        return [
            o('h1','home'),
            components.nav(),
            o('div',[
                o('div',{style: 'height: 1000px'},''),
                o('h1',{id:'test'},'scroll to here'),
                o('a',{href: '#nav'},'scroll up'),
                o('div',{style: 'height: 1000px'},''),
            ])
        ]
    },
});
```

### Examples - o.request(element) (element)

**o.request** allows you to specify the specific [status code]https://www.w3schools.com/tags/ref_httpmessages.asp), but it also has a default error function as well. 
&nbsp;


You can use **o.request** inside **o.route** using `req.element` as the element or you can specify any element you would like.

```
o.request(document.body)
   .fetch('./data1.json', false) // You can chain any number of fetches as you would like.
   .fetch('./data2.text', false, 'text') // The default type is json, but you can specify or any like 'text'.
   .load(()=>{ // OPTIONAL: runs before fetch (loading screen)
       return o('h1','loading...')  
   })
   .status('200',(data)=>{ // REQUIRED: status uses server status messages. 200 is success
       return o('h1','complete')
   })
   .status('404',(data)=>{ // OPTIONAL: This will trigger if the status code is 404.
       return o('h1','error 404 - page not found')
   })
   .error((err)=>{ // REQUIRED: this is the default error handler
      return o('h1', 'Error')
   })

---
