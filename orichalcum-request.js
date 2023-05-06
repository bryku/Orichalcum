o.request = (element)=>{
	return {
		element: element,
		append: function(children){
			this.element.innerHTML = '';
			this.element.append(...[children].flat(1))
		},
		fetches: [],
		load: function(callback){
			this.append(callback(this.element));
			return this
		},
		fetch: function(url, options = {method: 'GET'}, type = 'json'){
			this.fetches.push(
				fetch(url).then((res)=>{
					if(res.status != 200){throw new Error(res.status)}
					return res[type]()
				})
			);
			return this
		},
		callbacks: {},
		status: function(code, callback){
			this.callbacks[code] = callback;
			return this
		},
		error: function(callback, e = this.elmeent, a = this.append){
			Promise.all(this.fetches)
				.then((data)=>{
					this.append(this.callbacks['200'](data, this.element))
				})
				.catch((err)=>{
					if(this.callbacks[err.message]){
						this.append(this.callbacks[err.message](err, this.element))
					}else{
						this.append(callback(err, this.element))
					}
				})
		},
	}
}
