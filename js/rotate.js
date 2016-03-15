if (window.addEventListener) {
	document.body.addEventListener('mouseover', function(ev){
		if (this.className === '') {
		this.className = 'hover';
		}
	}, false);
}