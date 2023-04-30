// Fetch Functions
o.plugins.fetch = function(element, values){
	if(!values.options){values.options = {method: 'GET'}}
	if(!values.options.credentials){values.options.credentials = 'include'}
	if(!values.type){values.type = 'json'}
	values.element = element;
	values.next = [];
	o.fetch(values);
	return element
}
o.fetchCallback = function(callback, element, data = false){
	if(callback){
		let children = callback(element, data);
		if(children){
			children = Array.isArray(children) ? children : [children];
			element.innerHTML = '';
			element.append(...children);
		}
	}
}
o.fetchCacheMax = 9;
o.fetchCache = [];
o.fetchCheck = function(values){
	let cache = this.fetchCache.find((v)=>{return v.url == values.url});
	if(cache){
		return new Promise((res, rej)=>{
			if(cache.completed){
				res(v)
			}else{
				cache.next.push(values)
				rej("processing")
			}
		})
	}else{
		o.fetchCache.push(values);
		if(o.fetchCache.length > o.fetchCacheMax){
			o.fetchCache.shift()
		}
		return fetch(values.url, values.options)
			.then((res)=>{
				if(res.status !== 200){throw new Error("Connection Error")}
				if(values.type == 'json'){return res.json()}
				else{return res.text()}
			})
	}
}
o.fetch = function(values){
	o.fetchCallback(values.start, values.element);
	o.fetchCheck(values)
		.then((data)=>{
			o.fetchCallback(values.complete, values.element, data);
			o.fetchCache = o.fetchCache.map((v)=>{
				if(v.url == values.url){
					v.completed = true;
					v.data = data;
				}
				return v
			});
			if(values.next.length > 0){
				let nextFetch = values.next.shift();
					nextFetch.next = values.next;
				o.fetch(nextFetch)
			}
		})
		.catch((err)=>{
			if(err.message != 'processing'){
				o.fetchCallback(values.error, values.element)
			}
		})
		.finally(()=>{
			o.fetchCallback(values.finally, values.element)
		})
}
