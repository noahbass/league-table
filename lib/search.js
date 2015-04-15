/*
 * Given a key and an array, sort the array by the key
 *
 * @param key: string
 * @param array: array
 * @return int
 */
function search(key, array){
    for(var i = 0; i < array.length; i++) {
        if(array[i].name === key) {
            return i;
        }
    }
}

module.exports = search;
