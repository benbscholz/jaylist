/** 
 * list.js provides the functions to create a hashed key-value list.
 */
 
var MAX_ELEMENTS = 100;     /* maximum elements for all lists */
var HASH_MULTIPLIER = 37;   /* prime multiplier for hash function */


/**
 * List allows to access elements through a key (string of characters)
 */
var List = function () {
    this.h_list = [];
    this.h_list.length = MAX_ELEMENTS;
};

List.prototype = {
    
    
    /**
     * get: returns the value attached to the given key.
     */
    get: function(key) {
        var h;
        h = this.hash(key);
        return this.h_list[h];
    },
    
    
    /**
     * add: inserts an object into the list, assigning it to the given key.
     */
    add: function (key, value) {
        var h;
        h = this.hash(key);
        this.h_list[h] = value;
    },
     
    
    /**
     * hash: hashes the given key and returns it.
     */
    hash: function (key) {
        var i, h;
        h = 0;
        
        for (i = 0; i < key.length; i = i + 1)
            h = (HASH_MULTIPLIER * h) + key.charCodeAt();
        return h % MAX_ELEMENTS;
    }  

};



