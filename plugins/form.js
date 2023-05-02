o.plugins.form = function(e, v){
	e.addEventListener('submit',(event)=>{
		event.preventDefault();
		let data = {};
		let form = new FormData(event.target);
		for (const [key, value] of form) {
			data[key] = value
		}
		v(event, e, data)
	})
	return e
}