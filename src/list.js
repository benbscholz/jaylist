/**
 * jaylist is a wrapper for javascript's built-in hash storage system.
 * It provides functions to manipulate the list.
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
 * List allows access to elements through a key (string of characters).
 * _next is a placeholder for the next() iterator.
 */
var List = function () {
    this._table = {};
    this._next;
};

/**
 * List functions to create and manipulate a hashed list.
 *
 *  get(key)          -- Returns the value associated with key, un-
 *                       defined if there is no values associated
 *                       with the key.
 *  add(key, value)   -- Insert an object into the list, overwriting
 *                       any value already assigned to the key. Returns
 *                       the value upon successful addition.
 *  remove(item)      -- Removes the object from the list. Returns
 *                       undefined if no value is assigned to the key. 
 *                       Upon successful removal, it returns the value
 *                       removed. A list or array of keys may also be 
 *                       passed.
 *  keys()            -- Returns an array of the keys in the list.
 *  values()          -- Returns an array of the values in the list
 *                       with each value appearing only once.
 *  items()           -- Returns an array of key value pairs.
 *  len()             -- Returns the number of elements in the list, 
 *                       zero if empty.
 *  clear()           -- Removes the items from the list.
 *  hasKey(key)       -- Returns true if the list contains the key and 
 *                       false if it does not.
 *  pop(key, default) -- Returns the value associated with the key and
 *                       removes it. If the value doesn't exist return
 *                       default. Default is an optional argument that 
 *                       is set to undefined.
 *  popItem()         -- Returns a random key value pair ( [key, value] )
 *                       and removes it. Like it's python counterpart,
 *                       you can use it to destructively iterate over               
 *                       the list.
 *  update(list)      -- Updates the list with the entries of the input
 *                       list.
 *  copy()            -- Returns a deep copy of the list.
 *  each(callback)    -- Iterates over the entries in the list, passing
 *                       the parameter 'key'.
 *  next()            -- Iterates over the entries in the list returning
 *                       the key until the iteration is complete (calling
 *                       next() at this point will return undefined.
 *  object()          -- Returns the key value list as an object.
 *  isEqual(list)     -- Returns true if the lists are equivalent and false 
 *                       otherwise.
 */
List.prototype = {


    /**
     * get: Returns the value attached to the given key or undefined 
     * if it isn't found.
     */
    get: function(key) {
        if (this._table.hasOwnProperty(key))
            return this._table[key];
        else
            return undefined;
    },
    
    
    /**
     * add: Inserts an object into the list, assigning it to the given key.
     * It returns the value upon successful addition to the list. If a value
     * is inserted with a key that exists in the list already, the old value 
     * is overwritten.
     */
    add: function (key, value) {     
        return (this._table[key] = value);
    },
    
    /**
     * remove: Removes an object from the list with the given key. It returns
     * undefined if no object with the given key exists in the list. Otherwise,
     * it returns the value removed. A list or array of keys may also be passed.
     */
    remove: function (item) {
        // item is a list: remove all keys from parent object
        if (item instanceof List) {
            while (nitem = item.next()) 
                delete this._table[nitem];
                
        // item is an array: remove keys from parent object
        } else if (Object.prototype.toString.call(item) === "[object Array]") {
            while (item.length !== 0)
                delete this._table[item.pop()];
                
        // item is a single key: remove it and return its value (undefined is returned
        // if the key is not a member of the parent object).
        } else {
            var val = this._table[item];
            delete this._table[item];
            return val;
        }
    },
    
    
    /**
     * keys: Returns an array of the keys in the List.
     */
    keys: function () {
        return Object.keys(this._table);
    },
    
    
    /**
     * values: Returns an array of the values in the list. Duplicate values
     * are only displayed once.
     */
    values: function () {
        var i, contains, self = this, values = [];
        
        // iterate through the keys in the list
        this.each(function (key) {
            
            contains = false;
            i = values.length;
            
            // decrement the value for the length of values.
            // contains is false if the value does not already 
            // appear in the values array and true if it is 
            // found. when contains is true, break out of the loop.
            while (i-- && !contains)
                if (self.get(key) === values[i])
                    contains = true;
            
            // push the value if it is not in the values array      
            if (!contains)
                values.push(self.get(key));
        });
        
        return values;
    },
    
    
    /**
     * items: Returns an array of key-value pairs: [[key, value]]
     */
    items: function () {
        var self = this, itemlist = [];
        
        // push each key and value to itemlist
        this.each(function (key) { 
            itemlist.push([key, self._table[key]]); 
        });
        
        return itemlist;
    },
    
    
    /**
     * len: Returns the number of items in the list. Returns zero if empty.
     */
    len: function () {
        var len = 0;
        
        // count the entries in the table
        this.each(function () { 
            len = len + 1; 
        });
        
        return len;
    },
    
    
    /**
     * clear: Removes the items from the list.
     */
    clear: function () {
        this._table = {};
    },
    
    
    /**
     * hasKey: Returns true if the list contains the given key and false if
     * if does not.
     */
    hasKey: function(key) {
        return (this.get(key) !== undefined);
    },
    
    
    /**
     * pop: Returns the value associated with the key and removes it. If there
     * is no value associated with the key, return undefined, & for that reason
     * def is optional.
     */
    pop: function (key, def) {
        return this.hasKey(key) ? this.remove(key) : def;
    },
    
    
    /**
     * popItem: Returns a random key value pair ( [key, value] ) and removes it.
     */
    popItem: function () {
        var pair, keys = this.keys();
        
        // make sure there are keys in the list
        if (keys.length === 0)
            return undefined;
            
        // pop a random key from the key list and push it to the pair
        pair = [keys[0]];
        
        // push the value to the pair and remove it
        pair.push(this.remove(pair[0]));
        
        return pair;
    },
    
    
    /**
     * update: Adds all the entries from the input list to the list.
     */
    update: function (list) {
        var self = this;
        
        // iterate through the input list, push the entries to the list     
        list.each(function (key) {
            self._table[key] = list._table[key];
        });
    },


    /**
     * copy: Returns a deep copy of the list.
     */
    copy: function () {
        // recursive function for deep copying a list
        var deepCopy = function (obj) {
            var entry, copied = {};

            // object is an instance of List
            if (obj instanceof List)
                copied = new List();
                
            // object is an array
            else if (Object.prototype.toString.call(obj))
                copied = [];
            
            // copy each member of the object
            for (entry in obj) {
                if (obj.hasOwnProperty(entry)) {
                    if (typeof obj[entry] === 'string' ||
                        typeof obj[entry] === 'number' ||
                        typeof obj[entry] === 'boolean')
                        copied[entry] = obj[entry];
                    
                    // if member is object, recursively call deepCopy(obj)
                    else if (typeof obj[entry] === 'object')
                        copied[entry] = deepCopy(obj[entry]);
                }
            }
            return copied;
        };		
        
        // create a new list and fill it with the result of deepCopy(obj)
        var copy = new List();
        copy.update(deepCopy(this));
        
        return copy;
    },
    
    
    /**
     * each: Iterates over each entry in the list, calling the callback with the
     * parameter 'key'.
     */
    each: function (callback) {
        for (var key in this._table)
            if (this._table.hasOwnProperty(key))
                callback(key);
    },
    
    
    /**
     * next: Iterates over the list, returning the key of next entry on each call.
     * Returns undefined when the iteration is complete.
     */
    next: function () {
        // _next contains keys to iterate through
        if (this._next !== undefined && this._next.length !== 0)
            return this._next.pop();
            
        // _next is empty; fill it with keys and pop one
        else if (this._next === undefined) {
            this._next = this.keys();
            return this._next.pop();
            
        // iteration complete, reset _next
        } else if (this._next.length === 0)
            return this._next = undefined;
    },
    
    
    /**
     * object: Return the key-value list as an object.
     */
    object: function () {
       return this._table;
    },
    
    
    /**
     * isEqual: Returns true if the lists are equivalent and false otherwise.
     */
    isEqual: function (list) {
        // recursive function for equality checking
        var deepEquals = function (a_obj, b_obj) {
        
            var i, key, atype = typeof a_obj, btype = typeof b_obj;
            
            // basic equality checks
            if (a_obj === b_obj)
                return true;
            if (atype !== btype)
                return false;
                
            // a_obj and b_obj are arrays; check their members
            if (Object.prototype.toString.call(a_obj) === 
                Object.prototype.toString.call(b_obj) === "[object Array]") {
                if (a_obj.length !== b_obj.length)
                    return false;
                for (i = 0; i < a_obj.length; i += 1)
                    if (a_obj[i] !== b_obj[i]) 
                        return false;
                return true;
            }
            
            // if a_obj and b_obj aren't objects, at this point, they aren't equal
            if (atype !== "object") 
                return false;
                
            // check number of keys in object
            if (Object.keys(a_obj).length !== Object.keys(b_obj).length)
                return false;
                
            // equality of key-values and recursive call to deepEquals()
            for (key in a_obj) {
                if (!b_obj.hasOwnProperty(key))
                    return false;
                if (a_obj.hasOwnProperty(key) && b_obj.hasOwnProperty(key))
                    return deepEquals(a_obj[key], b_obj[key]);
            }
            
            // if it has made it this far, a_obj and b_obj are equal
            return true;
        };
        
        // check if list argument is actually a list
        if (!(list instanceof List))
            return false;
            
        return deepEquals(this._table, list._table);
    }
};