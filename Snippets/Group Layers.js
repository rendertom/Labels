/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Groups all layers with same label color together underneath the topmost layer with that color.

*/

(function groupLayers() {
	var composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Group Layers');

	groupLayersByLabel(composition, Labels.index);
	
	app.endUndoGroup();

	function groupLayersByLabel(composition, label) {
		var layer, firstLayerMachingLabel;
		for (var i = 1, il = composition.numLayers; i <= il; i++) {
			layer = composition.layer(i);
			if (layer.label !== label) continue;

			if (!firstLayerMachingLabel) {
				firstLayerMachingLabel = layer;
				continue;
			}

			layer.moveAfter(firstLayerMachingLabel);
		}
	}
})();