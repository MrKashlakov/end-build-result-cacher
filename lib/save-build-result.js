module.exports = function (node, fileName, result) {
	if (result) {
		console.log('SAVE FILE', fileName);
		var cache = node.getNodeCache();
		var key = ['build-result', fileName].join('-');
		cache.set(key, result);
	}
};
