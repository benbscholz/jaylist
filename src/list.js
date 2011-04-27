/*
 * list.js provides the functions to create a hashed key-value list.
 */
 
 
var MAX_ELEMENTS = 500;     /* maximum elements for all lists */
var HASH_MULTIPLIER = 37;   /* prime multiplier for hash function */


/*
 * List allows to access elements through a key (string of characters)
 */
var List = function () {
    this.h_list = [];
    this.h_list.length = MAX_ELEMENTS;
};


/*
 * Entry consists of a key, value, and a link to the next entry.
 */
var Entry = function (k, v) {
    this.key = k;
    this.val = v;
    this.next = null;
};


List.prototype = {
    
    
    /*
     * get: returns the value attached to the given key or undefined if it isn't found.
     */
    get: function(key) {
        var h, nextentry;
        
        // hash the key
        h = this.mash(key);
        
        // missing value
        if (this.h_list[h] === undefined) 
            return undefined;
        
        // iterate through the entries with the hash    
        nextentry = this.h_list[h];
        for(;;) {
            if (nextentry.key === key)
                return nextentry.val;
            nextentry = nextentry.next;
        }
        
        // nothing found
        return undefined;
    },
    
    
    /*
     * add: inserts an object into the list, assigning it to the given key.
     */
    add: function (key, value) {
        var h, entry, nextentry;
        
        // create new entry with the key and value, hash the key
        entry = new Entry(key, value);
        h = this.mash(key);
        
        // if the hash corresponds to nothing, add the entry
        if (this.h_list[h] === undefined) {
            this.h_list[h] = entry;
        } else {
            nextentry = this.h_list[h];
            
            // iterate to the last item at that hash value in the list
            while (nextentry.next !== null) {
                nextentry = nextentry.next;
            }
            nextentry.next = entry;
        }
    },
     
    
    /*
     * mash: hashes the given key and returns it.
     */
    mash: function (key) {
        var i, h;
        h = 0;
        
        for (i = 0; i < key.length; i = i + 1)
            h = (HASH_MULTIPLIER * h) + key.charCodeAt();
        return h % MAX_ELEMENTS;
    }  
};




