/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Parent all layers with the same label color to a null.

*/

(function parentLayers() {
	var composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Parent Layer to Null');

	parentLayersToNull(composition, Labels.index);

	app.endUndoGroup();

	function parentLayersToNull(composition, label) {
		var layer, nullLayer;
		for (var i = 1, il = composition.numLayers; i <= il; i++) {
			layer = composition.layer(i);
			if (layer.label !== label) continue;

			if (!nullLayer) {
				nullLayer = composition.layers.addNull();
			}

			layer.parent = nullLayer;
		}
	}
})();