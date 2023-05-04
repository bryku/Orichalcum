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

### Example - o.router(target, routes) (string, object)

You can only have 1 router per application.

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
		req.title('Website.com / Search');
        return [
            o('h1','search?name='+req.get.name || ''),
            components.nav(),
        ]
	},
    '/users/:user': (req)=>{
        req.title('Website.com / Users / '+req.parameters.user);
        return [
            o('h1','users/'+req.parameters.user),
            components.nav(),
        ]
	},
    '/users': (req)=>{
        req.title('Website.com / Users');
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
        req.title('Website.com / Home');
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


---




### Examples - Multiple Children

* File Example: /examples/2
* Live Example: https://replit.com/@bryku/orichalcum-example-2#index.html

```
document.body.append(
    o('div',[
        o('h3','Hello World'),
        o('p','Pizza is life!')
    ])
)
```

### Examples - Css (class, style, style)

* File Example: /examples/3
* Live Example: https://replit.com/@bryku/orichalcum-example-3#index.html

```
document.body.append(
    o('div',[
        o('h3',{class: 'text-red'},'Hello World 1'),
        o('h3',{style: 'color: green'},'Hello World 2'),
        o('h3',{styles: {color: 'blue'}},'Hello World 1'),
    ])
)
```

### Examples - Events

* File Example: /examples/4
* Live Example: https://replit.com/@bryku/orichalcum-example-4#index.html

```
document.body.append(
    o('div',[
        o('button',{onclick: (event)=>{
            console.log('You clicked me!', event)
        }},'Click Me'),
    ])
)
```

### Examples - Router

* File Example: /examples/5
* Live Example: https://replit.com/@bryku/orichalcum-example-5#index.html

```
o.router(document.body,{
    '/about': ()=>{
        return [
            o('h1','About Page'),
            o('ul',[
                o('li', o('a',{href: '/'},'Home')),
                o('li', o('a',{href: '/about'},'About')),					
            ])
        ]
    },
    '/': ()=>{
        return [
            o('h1','Home Page'),
            o('ul',[
                o('li', o('a',{href: '/'},'Home')),
                o('li', o('a',{href: '/about'},'About')),					
            ])
        ]
    },
})
```

### Examples - Reusing Components

* File Example: /examples/6
* Live Example: https://replit.com/@bryku/orichalcum-example-6#index.html

```
let nav = function(){
    return o('ul',[
        o('li', o('a',{href: '/'},'Home')),
        o('li', o('a',{href: '/about'},'About')),					
    ])
}

o.router(document.body,{
    '/about': ()=>{
        return [
            o('h1','About Page'),
            nav(),
        ]
    },
    '/': ()=>{
        return [
            o('h1','Home Page'),
            nav()
        ]
    },
})
```

### Examples - Url & Get Parameters

* File Example: /examples/7
* Live Example: https://replit.com/@bryku/orichalcum-example-7#index.html

```
let nav = function(){
    return o('ul',[
        o('li', o('a',{href: '/'},'Home')),
        o('li', o('a',{href: '/?id=test'},'Home Test')),
        o('li', o('a',{href: '/users/bryku'},'Bryku')),
    ])
}

o.router(document.body,{
    '/users/:user': (req)=>{
        return [
            o('h1','User Page: '+req.parameters.user),
            nav(),
        ]
    },
    '/': (req)=>{
        return [
            o('h1','Home Page: '+ (req.get.id || '')),
            nav()
        ]
    },
})
```

### Examples - Fetch

* File Example: /examples/8
* Live Example: https://replit.com/@bryku/orichalcum-example-8#index.html

Fetch allows you to grab data from a website. Fetch will pend and cache results, so if you have multiple elements that are fetching the same url, it will only grab it once.

**Fetch Options**

* url - string 
* type - string
    * "json" - default
    * "text"
* state - function(element, data) - runs before fetch is triggered
* complete - function(element, data) - runs when data is returned
* error - function(element, error) - runs if invalid json or unable to connect to server
* finally - function(element) - runs at the end even if it is success or error

```
o.router(document.body,{
    '/': (req)=>{
        return [
            o('h1','Users'),
            o('ul',{
                fetch: {
                    url: './users.json',
                    complete: (element, data)=>{
                        return data.map((user)=>{
                            return o('li',user.name)
                        })
                    },
                }
            },'Loading...')
        ]
    },
})
```
