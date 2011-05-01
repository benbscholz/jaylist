/**
 * Author: Ben Brooks Scholz (c) 2011
 *
 * list.js provides the functions to create a hashed key-value list.
 *
 * This code is licensed under the GPLv3.
 *
 * The global constant MAX_ELEMENTS determines the initialized list
 * size. This value should be changed based on the size of your data
 * set. 
 */
 
// maximum elements for all lists 
var MAX_ELEMENTS = 500; 
// prime multiplier for hash function
var HASH_MULTIPLIER = 37;   


/**
 * @constructor
 * List allows to access elements through a key (string of characters).
 * It operates like a hash table: it is an associative array with the 
 * values chained in a linked list to deal with hash collisions. 
 */
var List = function () {
    this.h_list = [];
    this.h_list.length = MAX_ELEMENTS;
};


/**
 * List functions to create and manipulate a hashed list.
 */
List.prototype = {
    
    
    /**
     * Entry consists of a key, value, and a link to the next entry.
     */
    Entry: function (k, v) {
        this.key = k;  
        this.val = v;
        this.next = undefined;
    },
    
    
    /**
     * get: returns the value attached to the given key or undefined if it isn't found.
     */
    get: function(key) {
        var h, next;
        // hash the key
        h = this.hash(key);
        // if there is a missing value return undefined
        if (this.h_list[h] === undefined) 
            return undefined;
        next = this.h_list[h];
        // iterate through the entries with the hash    
        while(next !== undefined) {
            if (next.key === key)
                return next.val;
            next = next.next;
        }
        // nothing found
        return undefined;
    },
    
    
    /**
     * add: inserts an object into the list, assigning it to the given key.
     * It returns the value upon successful addition to the list. In the 
     * event of hash collisions, the entry is chained to end of the value
     * already in the hash's cell. If a value is inserted with a key that
     * exists in the list already, the old value is overwritten.
     */
    add: function (key, value) {
        var h, entry, next;
        // create new entry with the key and value, hash the key
        entry = new this.Entry(key, value);
        h = this.hash(key);
        // if the hash corresponds to nothing, add the entry
        if (this.h_list[h] === undefined) {
            this.h_list[h] = entry;
            return this.h_list[h].val;
        } else {
            next = this.h_list[h];
            // iterate through the items in the list, overwriting any value with
            // the input key. If the end of the list is reached and no matching 
            // key is found, append the entry to the end of the chain.
            while (next !== undefined) {
                if (next.key === key) {
                    next.val = value;
                    return next.val;
                } else if (next.next === undefined) {
                    next.next = entry;
                    return next.next.val;
                }
                next = next.next;              
            }
        }
    },
    
    
    /**
     * remove: removes an object from the list with the given key. It returns
     * false if no object with the given key exists in the list. Otherwise, it
     * returns the value removed.
     */
    remove: function (key) {
        var h, current, next;
        h = this.hash(key);
        // if the hash doesn't correspong to anything
        if (this.h_list[h] === undefined)
            return false;
        else {
            next = this.h_list[h];
            // iterate through the entries with the hash
            while (next !== undefined) {
                if (next.key === key)
                    // if the key matches the first cell
                    // connect h_list[h] to the next value
                    if (current === undefined) {
                        this.h_list[h] = next.next;
                        // the value removed
                        return next.val;
                    // remove by chaining previous entry to next entry
                    } else {
                        current.next = next.next;
                        // the value removed
                        return next.val;
                    }
                // step forward in the chain
                current = next;
                next = next.next;
            }
            // nothing found
            return false;
        }
    },
     
    
    /**
     * hash: Hashes the given key and returns it. The key should be
     * a character string, as the character codes are used to compute
     * the hash. Returns false if the key is not a string.
     */
    hash: function (key) {
        var i, h;       
        h = 0;
        // iterate through the characters in the key string.
        // compute the hash using the character codes and 
        // hash multiplier prime constant.
        for (i = 0; i < key.length; i = i + 1)
            h = (HASH_MULTIPLIER * h) + key.charCodeAt(i);
        return h % MAX_ELEMENTS;
    }    
};

window['List'] = List;
List.prototype['get'] = List.prototype.get;
List.prototype['add'] = List.prototype.add;
List.prototype['remove'] = List.prototype.remove;