# jaylist

## a simple wrapper for javascript's built-in hash storage. 

### Usage:

#### Create the list:

    var jaylist = new List(); 
    
    
#### Add a value to the list:

    jaylist.add("key", value);
  
  
#### Get the value from the list:

    var val = jaylist.get("key"); 
    
    
#### Remove the value from the list:

    jaylist.remove("key");
    
    
#### Get the keys in the list:

    var keys = jaylist.keys();
    
    
#### Get the values in the list:

    var values = jaylist.values();
    
     
#### Get the length of the list:

    var len = jaylist.len();
     
     
#### Clear the list:

    jaylist.clear();
    
    
### jaylist Functions:

#### add(key, value)

--Insert an object into the list, overwriting any value already assigned to the key. Returns the value upon successful addition.

#### get(key)

--Returns the value associated with key, undefined if the key has not been entered into the list.

#### remove(key)

--Removes the object from the list. Returns false if no value is assigned to the key. Upon successful removal, it returns the value removed.

#### keys()

--Returns an array of the keys in the list.
 
#### values()

--Returns an array of the values in the list with each value appearing only once.

#### len() 

--Returns the number of elements in the list, 0 when empty.

#### clear()

--Removes all the items from the list.

