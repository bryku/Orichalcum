// Router Functions
o.plugins.href = function(e, v){
	// Highjack elements with 'href' attribute.
	// Prevent Page load and let router handle it.
	e.href = v;
	if(v.indexOf('://') == -1){
		e.addEventListener('click',(event)=>{
			event.preventDefault();
			o.route(event.target.closest('a').getAttribute('href'));
		})
	}
	return e
}

o.route = function(url = '/', body, element = o.routeElement){
	let urlArray = url.split('?');
	let r = {
		url: o.routeUrl = url,
		element: element,
		title:(title)=>{		
			document.title = title;
			history.replaceState(history.state, title, location.pathname+location.search);
		},
		parameters: {},
		get: {},
		redirect: o.route,
		body: body,
	};
	for(let route in o.routes){
		let uDirectories = urlArray[0].split('/');
		let rDirectories = route.split('/');
		// Find Matching Route
		let match = rDirectories.every((_,i)=>{
			if(uDirectories[i] == rDirectories[i]){// Match
				return true
			}else if(uDirectories[i] && rDirectories[i] == '*'){// Wild Card
				return true	
			}else if(uDirectories[i] && rDirectories[i].startsWith(':')){// URL Parameter
				r.parameters[rDirectories[i].slice(1)] = uDirectories[i];
				return true
			}
			return false
		});
		if(match){
			// Get Parameters
			if(urlArray[1]){
				r.get = urlArray[1].split('?').reduce((o,v,i)=>{
					let index = v.indexOf('=');
					if(index > -1){
						o[v.slice(0,index)] = v.slice(index + 1)
					}
					return o
				},{})
			}
			// Add URL State
			history.pushState(history.state, document.title, url);
			// Running Router Callback
			let elements = o.routes[route](r);
				elements = Array.isArray(elements) ? elements : [elements];
			// Rendering Router Callback
			r.element.innerHTML = '';
			r.element.append(...elements);
			return true
		}else if(o.routes['error']){
			o.routes['error'](r)
		}
	}
}
o.router = function(element, routes, interval = 100){
	o.routes = routes;
	o.routeElement = element;
	o.routeUrl = '';
	o.routeInterval = setInterval(()=>{
	    // Originally I used popstate
	    // However, it changed the behavior of the back/foward button (chrome & edge).
	    // Using setInterval() keeps the original behavior. 
	    if(o.routeUrl != location.pathname + location.search){
	        o.route(location.pathname + location.search);
	    }
    },interval)
}
