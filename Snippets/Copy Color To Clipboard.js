/*

Labels script exposes following API:
	index   (Number) 	label index,
	hex  	(String) 	label HEX color,
	rgb  	(Array) 	label RGB color [0-255, 0-255, 0-255],
	name 	(String) 	label name

*/

(function copyColorToClipboard() {

	var hexColor = '#' + Labels.hex;
	copyToClipboard(hexColor);
	writeLn(hexColor);

	function copyToClipboard(string) {
		var cmd = 'cmd.exe /c cmd.exe /c "echo ' + string + ' | clip"';
		if (isMac()) {
			var pathToTempFile = Folder.temp.fsName + "/ClipBoard.txt";
			writeFile(pathToTempFile, string);
			cmd = 'cat ' + pathToTempFile + ' | pbcopy';
		}

		system.callSystem(cmd);
	}

	function isMac() {
		return !isWin();
	}

	function isWin() {
		return $.os.indexOf("Windows") !== -1;
	}

	function writeFile(fileObj, fileContent, encoding) {
		encoding = encoding || "utf-8";
		fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);

		var parentFolder = fileObj.parent;
		if (!parentFolder.exists && !parentFolder.create())
			throw "Cannot create file in path " + fileObj.fsName;

		fileObj.encoding = encoding;
		fileObj.open("w");
		fileObj.write(fileContent);
		fileObj.close();

		return fileObj;
	}

})();