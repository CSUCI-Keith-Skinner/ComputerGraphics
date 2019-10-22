var loadTextResource = function(url, callback, importer)
{
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if (request.status < 200 || request.status > 299) {
			callback('Error: HTTP Status ' + request.status + ' on resource ' + url);
		} else {
			callback(null, request.responseText, importer);
		}
	};
	request.send();
};

var loadJSONResource = function (url, callback, importer)
{
	loadTextResource(url, function(err, result, importer) {
		if (err)
		{
			callback(err);
		}
		else
		{
			try
			{
				callback(null, JSON.parse(result), importer);
			}
			catch (err2)
			{
				callback(err2);
			}
		}
	}, importer);
}

class resourceImporter
{
	constructor(urls, names, types, onLoad)
	{
		this.urls = urls;
		this.names = names;
		this.types = types;
		this.fileMap = {};
		this.index = 0;
		this.onLoad = onLoad;
		this.loadResources();
	}

	loadResources()
	{
		if (this.index < this.urls.length)
		{
			var type = this.types[this.index];
			var url = this.urls[this.index];
			if (type == "text")
			{
				loadTextResource(url, this.callback, this);
			}
			else if (type == "json")
			{
				loadJSONResource(url, this.callback, this);
			}
			else
			{
				console.error("Invalid file import type:", type);
			}
		}
		else
		{
			this.onLoad(this.fileMap);
		}
	}

	callback(err, result, importer)
	{
		if (err)
		{
			console.error("Error importing resource:", err);
		}
		else
		{
			importer.fileMap[importer.names[importer.index]] = result;
			console.log("finished importing", importer.names[importer.index]);
			importer.index += 1;
			importer.loadResources();
		}
	}
}

var JSONToMesh = function(modelJSON, imageID, gl, program, flipTexture)
{
	var positionArray = modelJSON.meshes[0].vertices;
	var texCoordArray = modelJSON.meshes[0].texturecoords[0];
	var normalArray = modelJSON.meshes[0].normals;
	var indexArray = [].concat.apply([], modelJSON.meshes[0].faces);

	return new UVMesh(gl, program, positionArray, indexArray, normalArray, texCoordArray, imageID, flipTexture);
}