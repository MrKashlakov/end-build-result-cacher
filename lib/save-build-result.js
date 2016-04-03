module.exports = function (node, fileName, result) {
	if (result) {
		var cacheKeyPart = 'build-result';
		console.log('SAVE FILE', fileName);
		var cache = node[cacheKeyPart] = node[cacheKeyPart] || {};
		var key = ['build-result', fileName].join('-');
		cache[fileName] = result;
	}
};