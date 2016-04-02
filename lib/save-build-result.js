module.exports = function (node, fileName, result) {
	console.log('SAVE FILE', fileName, result);
	var cache = node.getNodeCache();
	var key = ['build-result', fileName].join('-');
	cache.set(key, result);
};
