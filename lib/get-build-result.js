var Vow = require('vow');
var vowFs = require('vow-fs');
var requireOrEval = require('enb-require-or-eval');

var _requireFormCache = function (result) {
	var cacheModule = new Module.constructor();
	cacheModule._compile(result);
	return cacheModule.exports;
};

var asyncRequre = function (node, fileName) {
	var cache = node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		return requireOrEval(fileName);
	}

	return Vow.resolve(_requireFormCache(result));
};

var readFile = function (node, fileName, encoding) {
	var cache = node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		return vowFs.read(fileName, encoding || 'UTF-8');
	}

	return Vow.resolve(result);
};

module.exports = {
	readFile: readFile,
	asyncRequire: asyncRequre
};
