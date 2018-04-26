/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

Let's create a simple script that:
	1. creates a Shape Layer,
	2. adds Rectangle to it and scales it to fit composition,
	3. adds Fill property and changes it's color to Labels.rgb,
	4. sets layers name to Labels.hex color and
	5. changes its label to Labels.index.

*/

(function createShapeLayer() {
	// Get active composition
	var composition = app.project.activeItem;
	if (!composition || !(composition instanceof CompItem)) {
		return alert('Please select composition first');
	}

	app.beginUndoGroup('Create Shape Layer');

	var selectedLayers = composition.selectedLayers;

	// Create Shape Layer
	var shapeLayer = composition.layers.addShape();

	// Add Rectangle to Shape Layers Contens group and scale it to fit composition
	var rectangleGroup = shapeLayer.property('ADBE Root Vectors Group').addProperty('ADBE Vector Shape - Rect');
	var sizeProperty = rectangleGroup.property('ADBE Vector Rect Size');
	sizeProperty.setValue([composition.width, composition.height]);

	// Add Fill and change its color
	var fillGroup = shapeLayer.property('ADBE Root Vectors Group').addProperty('ADBE Vector Graphic - Fill');
	var colorProperty = fillGroup.property('ADBE Vector Fill Color');
	colorProperty.setValue(Labels.rgb / 255);

	// Rename Shape Layer to Labels.hex color
	shapeLayer.name = '#' + Labels.hex;

	// Change its label color
	shapeLayer.label = Labels.index;

	if (selectedLayers.length > 0) {
		shapeLayer.moveBefore(selectedLayers[0]);
	}

	app.endUndoGroup();
})();