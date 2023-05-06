o.plugins.href = function(e, v){
	e.href = v;
	if(v.indexOf('://') == -1){
		e.addEventListener('click',(event)=>{
			event.preventDefault();
			o.route(event.target.closest('[href]').href);
		})
	}
	return e
}
o.title = (title = '')=>{
	document.title = title;
	history.replaceState(history.state,title,location.pathname+location.search);
}
o.route = function(url = '/', body = false){
	let r = {
		element: this.routeElement,
		url: url,
		path: url.match(/\/(.*?)(\?|\#|$)/gm)[0].replace(/\?|\#/gm,''),
		hash: (url.match(/\#(.*?)$/) || [false])[0],
		get: (url.match(/\?(.*?)(\#|$)/) || [''])[0]
			.replace(/\?|#/gm,'')
			.split('&')
			.filter(v => v.length > 0)
			.reduce((o,v)=>{
				let i = v.indexOf('=');
				o[v.slice(0,i)] = v.slice(i+1);
				return o
			},{}),
		parameters: {},
		body: body,
	};
	let route = Object.keys(o.routes).find((route)=>{
		let uDir = r.path.split('/');
		let rDir = route.split('/');
		return rDir.every((_,i)=>{
			// Match
			if(uDir[i] == rDir[i]){return true}
			// Wild Card
			else if(uDir[i] == rDir[i] == '*'){return true}
			// Variable
			else if(uDir[i] && rDir[i][0] == ':'){
				r.parameters[rDir[i].slice(1)] = uDir[i];
				return true
			}
			return false
		})
	}) || '/error';
	// Set History
	this.routeUrl = url;
	history.pushState(history.state, document.title, url);
	// Running Router Callback
	let elements = this.routes[route](r);
		elements = Array.isArray(elements) ? elements : [elements];
	// Rendering Router Callback
	r.element.innerHTML = '';
	r.element.append(...elements);
	// Scroll
	if(r.hash){
		let h = document.querySelector(r.hash);
		if(h){
			h.scrollIntoView({behavior:"smooth",block:"start"})
		}
	}
	return true
}
o.router = function(element, routes, interval = 100){
	this.routes = routes;
	this.routeElement = element;
	this.routeUrl = '';
	this.routeInterval = setInterval(()=>{
        // Originally I used popstate
	    // However, it changed the behavior of the back/foward button (chrome & edge).
	    // Using setInterval() keeps the original behavior. 
	    if(this.routeUrl != location.pathname + location.search){
	        this.route(location.pathname + location.search);
	    }
    },interval)
}
