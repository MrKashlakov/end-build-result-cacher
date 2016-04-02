var Vow = require('vow');
var vowFs = require('vow-fs');
var requireOrEval = 

var _requireFormCache = function (result) {
	var cacheModule = new Module.constructor();
	cacheModule._compile(result);
	return cacheModule.exports;
}

var asyncRequre = function (node, fileName) {
	var defer = Vow.defer();
	var cache = this.node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		return requireOrEval(fileName);
	}
	defer.resolve(_requireFormCache(result));
	return defer.promise();
};

var readFile = function (node, fileName, encoding) {
	var cache = this.node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		console.log('use fs', fileName);
		return vowFs.read(fileName, encoding || 'UTF-8');
	}
	defer.resolve(result);
	return defer.promise();
};

module.exports = {
	readFile: readFile,
	asyncRequre: asyncRequre
}
