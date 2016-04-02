var Vow = require('vow');
var vowFs = require('vow-fs');
var requireOrEval = require('enb-require-or-eval');
var saveResult = require('./save-build-result');

var CACHE_KEY_PART = 'build-result';

var asyncRequire = function (node, fileName) {
	var cache = node.getNodeCache();
	var key = [CACHE_KEY_PART, fileName].join('-');
	var result = cache.get(key);
	console.log('REQUIRE FILE', fileName);
	if (!result) {
		console.log('FROM FS');
		return requireOrEval(fileName).then(function (result) {
			saveResult(node, fileName, result);
			return result;
		});
	}
	console.log('FROM CACHE');
	return Vow.resolve(result);
};

var readFile = function (node, fileName, encoding) {
	console.log('READ FILE', fileName);
	var cache = node.getNodeCache();
	var key = [CACHE_KEY_PART, fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		console.log('FROM FS');
		return vowFs.read(fileName, encoding || 'UTF-8').then(function (result) {
			saveResult(node, fileName, result);
			return result;
		});
	}
	console.log('FROM CACHE');
	return Vow.resolve(result);
};

module.exports = {
	readFile: readFile,
	asyncRequire: asyncRequire
};
