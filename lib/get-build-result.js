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
	console.log('REQUIRE FILE');
	if (!result) {
		console.log('FROM FS');
		return requireOrEval(fileName);
	}
	console.log('FROM CACHE');
	return Vow.resolve(_requireFormCache(result));
};

var readFile = function (node, fileName, encoding) {
	console.log('READ FILE');
	var cache = node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		console.log('FROM FS');
		return vowFs.read(fileName, encoding || 'UTF-8');
	}
	console.log('FROM CACHE');
	return Vow.resolve(result);
};

module.exports = {
	readFile: readFile,
	asyncRequire: asyncRequre
};
