/**
 * jaylist v2
 * jaylist is a wrapper for javascript's built-in hash storage system.
 *
 * Copyright (C) 2011 by Ben Brooks Scholz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
 * @constructor
 * List allows access to elements through a key (string of characters).
 */
var List = function () {
    this.table = {};
};

/**
 * List functions to create and manipulate a hashed list.
 *
 *  get(key)          -- Returns the value associated with key, 
 *                       undefined if there is no values asso-
 *                       ciated with the key.
 *  add(key, value)   -- Insert an object into the list, over-
 *                       writing any value already assigned to the
 *                       key. Returns the value upon successful
 *                       addition.
 *  remove(key)       -- Removes the object from the list. Returns
 *                       false if no value is assigned to the key. 
 *                       Upon successful removal, it returns the value
 *                       removed.
 *  keys()            -- Returns an array of the keys in the list.
 *  values()          -- Returns an array of the values in the list
 *                       with each value appearing only once.
 *  len()             -- Returns the number of elements in the list, 
 *                       zero if empty.
 *  clear()           -- Removes the items from the list.
 *  hasKey(key)       -- Returns true if the list contains the key and 
 *                       false if it does not.
 *  pop(key, default) -- Returns the value associated with the key and
 *                       removes it. If the value doesn't exist return
 *                       default. Default is an optional argument that 
 *                       is set to undefined.
 */
List.prototype = {


    /**
     * get: Returns the value attached to the given key or undefined 
     * if it isn't found.
     */
    get: function(key) {
        return this.table[key];
    },
    
    
    /**
     * add: Inserts an object into the list, assigning it to the given key.
     * It returns the value upon successful addition to the list. If a value
     * is inserted with a key that exists in the list already, the old value 
     * is overwritten.
     */
    add: function (key, value) {     
        this.table[key] = value;
        return this.table[key];
    },
    
    /**
     * remove: Removes an object from the list with the given key. It returns
     * false if no object with the given key exists in the list. Otherwise, it
     * returns the value removed.
     */
    remove: function (key) {
        var val;
        
        // if no value is assigned to the key
        if (this.table[key] === undefined)
            return false;
            
        // value associated with the key (for return)
        val = this.table[key];
        delete this.table[key];
        
        return val;
    },
    
    
    /**
     * keys: Returns an array of the keys in the List.
     */
    keys: function () {
        var key, keys, table;
        
        keys = [];
        table = this.table;
        
        // iterate throught the hash pairs in the table, pushing each key
        // to the keys array.
        for (key in table)
            // filter inherited properties w/ for...in construct
            if (table.hasOwnProperty(key))
                keys.push(key);
        
        return keys;
    },
    
    
    /**
     * values: Returns an array of the values in the list. Duplicate values
     * are only displayed once.
     */
    values: function () {
        var i, j, contains, keys, values;
        
        values = [];
        keys = this.keys();
        
        // iterate through the keys in the list
        for (i = 0; i < keys.length; i = i + 1) {
            // contains is false if the value does not already appear in the
            // values array and true if it is found.
            contains = false;
            for (j = 0; j < values.length; j = j + 1) {
                if (this.get(keys[i]) === values[j]) {
                    contains = true;
                    break;
                }
            }
            
            // if the value is not already in the values array, push the value
            if (!contains)
                values.push(this.get(keys[i]));
        }
        
        return values;
    },
    
    
    /**
     * len: Returns the number of items in the list. Returns zero if empty.
     */
    len: function () {
        var len, entry;
        len = 0;
        for (entry in this.table) 
            if (this.table.hasOwnProperty(entry))
                len = len + 1;

        return len;
    },
    
    
    /**
     * clear: Removes the items from the list.
     */
    clear: function () {
        var i, keys;
        keys = this.keys();
        for (i = 0; i < keys.length; i = i + 1)
            delete this.table[keys[i]];
    },
    
    
    /**
     * hasKey: Returns true if the list contains the given key and false if
     * if does not.
     */
    hasKey: function(key) {
        if (this.get(key) !== undefined)
            return true;
        else
            return false;
    },
    
    
    /**
     * pop: Returns the value associated with the key and removes it. If there
     * is no value associated with the key, return default. Default is optional.
     */
    pop: function (key, def) {
        if (this.hasKey(key)) 
            return this.remove(key);
        else
            return def; 
    }
};

// functions available to the user
window['List'] = List;
List.prototype['get'] = List.prototype.get;
List.prototype['add'] = List.prototype.add;
List.prototype['remove'] = List.prototype.remove;
List.prototype['keys'] = List.prototype.keys;
List.prototype['values'] = List.prototype.values;
List.prototype['len'] = List.prototype.len;
List.prototype['clear'] = List.prototype.clear;
List.prototype['hasKey'] = List.prototype.hasKey;
List.prototype['pop'] = List.prototype.pop;
