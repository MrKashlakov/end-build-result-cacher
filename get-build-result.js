var vowFs = require('vow-fs');

var asyncRequre = function (node, fileName) {
	
};

var readFile = function (node, fileName, encoding) {
	var cache = this.node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	var result = cache.get(key);

	if (!result) {
		console.log('use fs', fileName);
		return vowFs.read(fileName, 'UTF-8');
	}
	defer.resolve(result);
	return defer.promise();
};

module.exports = {
	readFile: readFile,
	asyncRequre: asyncRequre
}
