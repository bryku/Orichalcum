let o = function(element_type, element_attr, element_text){
	// Sorting Vars
	let type = element_type;
	let attr = arguments.length == 3
		? element_attr
		: {};
	let text = arguments.length == 2
		? element_attr
		: element_text || '';
	// Element
	let e = document.createElement(type);
		e.innerText = typeof text != 'object' ? text : '';
	// Attr & Events
	for (let prop in attr) {
		// Classes - attr.class
		if(prop == 'class'){
			e.className += attr.class
		}
		// Styles - attr.styles
		else if(prop == 'styles'){
			for(let style in attr.styles){
				e.style[style] = attr.styles[style]
			}
		}
		// Plugins - attr.____  (o.plugins.____)
		else if(o.plugins[prop]){
			e = o.plugins[prop](e, attr[prop])
		}
		// Properties - attr.____ (element.____)
		else{
			e[prop] = attr[prop]
		}
	}
	// Child
	if (typeof text == 'object' && Array.isArray(text)) {
		e.append(...text)
	} else if (typeof text == 'object' && text.nodeName) {
		e.append(text)
	}
	return e
}
o.version = '1.0.0';
o.plugins = {}
