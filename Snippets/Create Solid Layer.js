/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Let's create a simple script that:
	1. creates a Solid Layer with base color of Labels.rgb
	   and name Labels.hex and that fits into composition
	2. Move it above selected layers.

*/

(function createSolidLayer() {
	// Get active composition
	var composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Create Solid Layer');

	// Store curent selection, so we can access it later;
	var selectedLayers = composition.selectedLayers;

	// Create Solid Layer
	var solidLayer = composition.layers.addSolid(
		Labels.rgb / 255,
		'#' + Labels.hex,
		composition.width,
		composition.height,
		1
	);

	// Change layers label color
	solidLayer.label = Labels.index;

	// Move layer above selected layer
	if (selectedLayers.length > 0) {
		solidLayer.moveBefore(selectedLayers[0]);
	}

	app.endUndoGroup();
})();