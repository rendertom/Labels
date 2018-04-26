/*

Labels script exposes following API:
index   (Number) 	label index,
hex  	(String) 	label HEX color,
rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
name 	(String) 	label name

Let's create a simple script that:
	1. toggles 'shy' property of all layers with given label color in composition
	2. and toggles compositions 'hideShyLayers' property accordingly

*/

(function toggleShy() {
	var composition, layer;

	// Get active composition
	composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Toggle Shy');

	for (var i = 1, il = composition.numLayers; i <= il; i ++) {
		layer = composition.layer(i);

		if (layer.label !== Labels.index) {
			continue;
		}

		layer.shy = !layer.shy;
	}

	composition.hideShyLayers = compHasShyLayers(composition);
	app.endUndoGroup();

	function compHasShyLayers(composition) {
		for (var i = 1, il = composition.numLayers; i < il; i ++) {
			if (composition.layer(i).shy === true) {
				return true;
			}
		}
		return false;
	}
})();