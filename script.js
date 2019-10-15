
function getData() {
	fetch()
	.then(resp => resp.json())
	.then(json => drawTable(json));
}

function drawTable(data) {
	console.log('tests');
	class TableFlight extends HTMLElement {
		constructor() {
			super();
			
			var shadowRoot = this.attachShadow({mode: 'open'});
			var wrapper = document.createElement('div');
			
			wrapper.setAttribute('class', 'table1');
			
			var ul = document.createElement('ul');			
			
			data = [{id: 1, flight: 'boeing777'}, {id: 2, flight: 'boeing747'}];
			data.forEach(function(item){
				var li = document.createElement('li');
				li.textContent = item.flight;
				ul.appendChild(li);
			});
			
			var style = document.createElement('style');
			style.textContent = '.table1 {'
							  +	'width: 40px;'
							  + 'height: 40px;'
							  + 'margin: 200px auto;'
							  + 'border: 5px solid green;'
							  + '}'
							  + 'ul {'
							  + 'position: relative;'
							  + 'display: flex;'
							  + 'flex-direction: row;'
							  + '}'
							  + 'li{'
							  + 'margin-right: 50px'
							  + '}';
			
			shadowRoot.appendChild(style);
			shadowRoot.appendChild(wrapper);
			wrapper.appendChild(ul);
		}
	}
	
	customElements.define('table-flight', TableFlight);
	document.body.appendChild(document.createElement('table-flight'));
}

//window.onload = drawTable;