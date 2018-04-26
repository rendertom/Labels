/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Push layers with this label to the bottom of the layer stack one by one.

*/

(function() {
	var composition, layers, matchingLayers;

	composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	layers = getAllOrSelectedLayers(composition);
	if (layers.length === 0) return;

	matchingLayers = filterLayersWithMatchingLabel(layers, Labels.index);
	if (matchingLayers.length === 0) return;


	app.beginUndoGroup('Push layers back by one');

	pushLayersBackByOne(composition, matchingLayers);

	app.endUndoGroup();


	function pushLayersBackByOne(composition, layers) {
		var layer, nextLayer, numLayers;

		numLayers = composition.numLayers;
		for (var i = layers.length - 1; i >= 0; i--) {
			layer = layers[i];

			if (layer.index === numLayers) continue;

			nextLayer = composition.layer(layer.index + 1);

			if (layer.label === nextLayer.label && arrayContains(layers, nextLayer)) continue;
			layer.moveAfter(nextLayer);
		}
	}

	function getAllOrSelectedLayers(composition) {
		var layers;

		layers = composition.selectedLayers;
		if (layers.length > 0) {
			arraySortByProperty(layers, 'index');
		} else {
			layers = getAllLayersInComposition(composition);
		}

		return layers;
	}

	function getAllLayersInComposition(composition) {
		var layer, layers;

		layers = [];
		for (var i = 1, il = composition.numLayers; i <= il; i ++) {
			layer = composition.layer(i);
			layers.push(layer);
		}
		return layers;
	}

	function filterLayersWithMatchingLabel(layers, label) {
		var layer, matchingLayers;

		matchingLayers = [];
		for (var i = 0, il = layers.length; i < il; i ++) {
			layer = layers[i];
			if (layer.label === label) {
				matchingLayers.push(layer);
			}
		}
		return matchingLayers;
	}

	function arraySortByProperty(array, property) {
		array.sort(function(a, b) {
			return a[property] - b[property];
		});
	}

	function arrayContains(array, element) {
		for (var i = 0, il = array.length; i < il; i ++) {
			if (array[i] === element) {
				return true;
			}
		}
		return false;
	}
})();