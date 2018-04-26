/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Let's create a simple script that:
	1. toggles 'solo' property of all layers that do not match given label color in composition
	2. and toggles compositions 'hideShyLayers' property accordingly

*/

(function shyEverythingExcept() {
	var composition, layer;

	// Get active composition
	composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Shy Everything Except');

	for (var i = 1, il = composition.numLayers; i <= il; i ++) {
		layer = composition.layer(i);

		layer.shy = layer.label !== Labels.index;
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