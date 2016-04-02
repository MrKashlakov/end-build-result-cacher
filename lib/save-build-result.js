module.exports = function (node, filename, result) {
	var cache = node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	cache.set(key, result);
};
