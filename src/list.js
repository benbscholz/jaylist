// Jaylist v2.0
// Copyright (C) 2011 by Ben Brooks Scholz. MIT Licensed.


// List allows access to elements through a key (string of characters).
// _next is a placeholder for the next() iterator.
var list = function () {
    
    var _table = {};
    var _next;
    
    // replace 'instanceof List' with _isList(item), because instanceof 
    // breaks without the 'new' operator.
    var _isList = function (item) {
        if (item._table && item.next)
            return true;
        else
            return false;
    };

    // an iternal array type checker. It returns true 
    // if item is an array and false otherwise.
    var _isArray = function (item) {
        if (item && typeof item === 'object' && item.constructor === Array) 
            return true;
        else if (Object.prototype.toString.call(item) == '[object Array]')
            return true;
        else
            return false;
    };
    
    // recursive function for equality checking
    var _deepEquals = function (a_obj, b_obj) { 
        var i, 
            key, 
            atype = typeof a_obj, 
            btype = typeof b_obj;
                
        // basic equality checks
        if (a_obj === b_obj)
            return true;
        if (atype !== btype)
            return false;
                    
        // a_obj and b_obj are arrays; check their members
        if (_isArray(a_obj) && _isArray(b_obj)) {
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
                return _deepEquals(a_obj[key], b_obj[key]);
        }
                
        // if it has made it this far, a_obj and b_obj are equal
        return true;
    };
    
    // recursive function for deep copying a list
    var _deepCopy = function (obj) {
        var entry, 
            copied = {};

        // object is an instance of List
        if (_isList(obj)) 
            copied = list();

        // object is an array
        else if (_isArray(obj))
            copied = [];
                
        // copy each member of the object
        for (entry in obj) {

            if (obj.hasOwnProperty(entry)) {
                if (typeof obj[entry] === 'string' ||
                    typeof obj[entry] === 'number' ||
                    typeof obj[entry] === 'boolean')
                    copied[entry] = obj[entry];
                
                // if member is object, recursively call deepCopy(obj)
                else if (typeof obj[entry] === 'object' || _isArray(obj)) 
                    copied[entry] = _deepCopy(obj[entry]);

            }
        }
        return copied;
    };

    
    return {
        _table : _table,
        _next : _next,
        
        // get: Returns the value attached to the given key or undefined 
        // if it isn't found.
        //
        get : function (key) {
            if (this._table.hasOwnProperty(key))
                return this._table[key];
            else
                return undefined;
        },
        
        // add: Inserts an object into the list, assigning it to the given key.
        // It returns the value upon successful addition to the list. If a value
        // is inserted with a key that exists in the list already, the old value 
        // is overwritten.
        add : function (key, value) {     
            return (this._table[key] = value);
        },
        
        // remove: Removes an object from the list with the given key. It returns
        // undefined if no object with the given key exists in the list. Otherwise,
        // it returns the value removed. A list or array of keys may also be passed.
        remove : function (item) {
            var nitem;
            
            // item is a list: remove all keys from parent object
            if (_isList(item)) {
                while ((nitem = item.next())) 
                    delete this._table[nitem];
                        
            // item is an array: remove keys from parent object
            } else if (_isArray(item)) {
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

        // keys: Returns an array of the keys in the List.
        keys : function () {
            return Object.keys(this._table);
        },

        // values: Returns an array of the values in the list. Duplicate values
        // are only displayed once.
        values : function () {
            var i, 
                contains, 
                self = this, 
                values = [];
                
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

        // items: Returns an array of key-value pairs: [[key, value]]
        items : function () {
            var itemlist = [], 
                self = this;
            
            // push each key and value to itemlist
            this.each(function (key) { 
                itemlist.push([key, self._table[key]]); 
            });
            
            return itemlist;
        },

        // len: Returns the number of items in the list. Returns zero if empty.
        len : function () {
            var len = 0;
            
            // count the entries in the table
            this.each(function () { 
                len = len + 1; 
            });
            
            return len;
        },

        // clear: Removes the items from the list.
        clear : function () {
            this._table = {};
        },

        // hasKey: Returns true if the list contains the given key and false if
        // if does not.
        hasKey : function (key) {
            return (this.get(key) !== undefined);
        },

        // pop: Returns the value associated with the key and removes it. If there
        // is no value associated with the key, return undefined, & for that reason
        // def is optional.
        pop : function (key, def) {
            if (this.hasKey(key))
                this.remove(key);
            else
                return def;
        },

        // popItem: Returns a random key value pair ( [key, value] ) and removes it.
        popItem : function () {
            var pair,
                keys = this.keys();
            
            // make sure there are keys in the list
            if (keys.length === 0)
                return undefined;
                
            // pop a random key from the key list and push it to the pair
            pair = [keys[0]];
            
            // push the value to the pair and remove it
            pair.push(this.remove(pair[0]));
            
            return pair;
        },

        // update: Adds all the entries from the input list to the list.
        update : function (list) {
            var self = this;

            // iterate through the input list, push the entries to the list     
            list.each(function (key) {
                self._table[key] = list.get(key);
            });
        },

        // copy: Returns a deep copy of the list.
        copy : function () {
            var copy = list();
            copy.update(_deepCopy(this));
            
            return copy;
        },

        // each: Iterates over each entry in the list, calling the callback with the
        // parameter 'key'.
        each : function (callback) {
            for (var key in this._table)
                if (this._table.hasOwnProperty(key))
                    callback(key);
        },

        // next: Iterates over the list, returning the key of next entry on each call.
        // Returns undefined when the iteration is complete.
        next : function () {
            // _next contains keys to iterate through
            if (this._next !== undefined && this._next.length !== 0)
                return this._next.pop();
                
            // _next is empty; fill it with keys and pop one
            else if (this._next === undefined) {
                this._next = this.keys();
                return this._next.pop();
                
            // iteration complete, reset _next
            } else if (this._next.length === 0) {
                this._next = undefined;
                return this._next;
            }
        },

        // object: Return the key-value list as an object.
        object : function () {
            return this._table;
        },

        // isEqual: Returns true if the lists are equivalent and false otherwise.
        isEqual : function (list) {           
            // check if list argument is actually a list
            if (!(_isList(list)))
                return false;
                
            return _deepEquals(this._table, list._table);
        }
    };
};
