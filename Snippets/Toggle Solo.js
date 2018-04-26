/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Let's create a simple script that:
	1. loops through all the layers in selected composition,
	2. checks if layers label index maches _our_ Labels.index and
	3. toggles layers 'solo' property if it matches

*/

(function toggleSolo() {
	var composition, layer;

	// Get active composition
	composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Toggle Solo');

	// Loop through all layers in composition
	for (var i = 1, il = composition.numLayers; i <= il; i ++) {
		layer = composition.layer(i);

		// Check if layers label matches our Labels.index
		if (layer.label !== Labels.index) {
			continue;
		}

		// Toggle layers 'solo' property.
		layer.solo = !layer.solo;
	}

	app.endUndoGroup();
})();