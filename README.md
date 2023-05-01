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

Orichalcum comes 720b-2.4kb depending on the plugins you need.  

* orichalcum-min.js - 720bytes
* orichalcum-plugins-router.min.js - 1.6kb
* orichalcum-plugins-fetch.min.js - 1.6kb
* orichalcum-bundle.min.js - 2.4kb (includes: min, router, fetch)

### Why

I have always been a big fan of Mithril and how it removes the HTML from the development process. I feel a framework is suppose to streamline and simplify the development process... How do you get easier than removing HTML? However, I had one complaint with Mithril... render. Mithril continually checks and renders the child nodes. This is great for data binding, but it's has always felt wasteful. Don't get me wrong, I love Mithril's data binding, but I don't want it ALL the time.
&nbsp;

Recently I have been working on a project where the clients has a raspberry pi like device (complete knock off) and they wanted an app that could display customer appointments, read off there names in the waiting room, and allow the receptionist to add appointments. So my genius big brain thought it would be a great ideal to use a bash script to start a nodejs server and option up a fullscreen chrome tab to local host. The idea wasn't the bad, but the issue was the nodejs and chrome ate up all the memory and cpu.
&nbsp;

Because of that I knew it would be a tough task to use React, so I went with good o' reliable Mithril. This worked pretty well and I got the project done, but I started recieving a lot of complaints about it being slow. At this point my only option was to start over or I could use mithril's syntax to render to dom... and this project was born.
&nbsp;

### Examples - Rendering to Dom

* File Example: /examples/1
* Live Example: https://replit.com/@bryku/orichalcum-example-1#index.html

```
<!DOCTYPE html>
<html>
<head>
	<title>Orichalcum 1</title>
	<script src="js/orichalcum-1/orichalcum-bundle.min.js"></script>
</head>
<body>
<script>
	document.body.append(
		o('h3','Hello World')
	)
</script>
</body>
</html>
```

### Examples - Multiple Children

* File Example: /examples/2
* Live Example: https://replit.com/@bryku/orichalcum-example-2#index.html

```
<!DOCTYPE html>
<html>
<head>
	<title>Orichalcum 2</title>
	<script src="js/orichalcum-1/orichalcum-bundle.min.js"></script>
</head>
<body>
<script>
	document.body.append(
		o('div',[
			o('h3','Hello World'),
			o('p','Pizza is life!')
		])
	)
</script>
</body>
</html>
```

### Examples - Css (class, style, style)

* File Example: /examples/3
* Live Example: https://replit.com/@bryku/orichalcum-example-3#index.html

```
<!DOCTYPE html>
<html>
<head>
	<title>Example - 3</title>
	<script src="js/orichalcum-1/orichalcum-bundle.min.js"></script>
</head>
<body>
<script>
	document.body.append(
		o('div',[
			o('h3',{class: 'text-red'},'Hello World 1'),
			o('h3',{style: 'color: green'},'Hello World 2'),
			o('h3',{styles: {color: 'blue'}},'Hello World 1'),
		])
	)
</script>
</body>
</html>
```

### Examples - Events

* File Example: /examples/4
* Live Example: https://replit.com/@bryku/orichalcum-example-4#index.html

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>Example - 4</title>
	<script src="js/orichalcum-1/orichalcum-bundle.min.js"></script>
</head>
<body>
<script>
	document.body.append(
		o('div',[
			o('button',{onclick: ()=>{
				console.log('You clicked me!')
			}},'Click Me'),
		])
	)
</script>
</body>
</html>
```

