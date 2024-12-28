const cache = new Map();
module.exports = {
    readFileFromCache(filePath){
        if(!cache.has(filePath)){
            cache.set(filePath, fs.readFileSync(filePath));
        }
        return cache.get(filePath);
    }
}