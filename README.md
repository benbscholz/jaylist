#jaylist is a simple key-value list.

###Usage:

####Create the list:
    var mylist = new List(); 
    
####Add a value to the list:
    mylist.add("key", value);
If add() is given a key that already exists in the list, the previous value will be overwritten. 
    
####Get the value from the list:
    var val = mylist.get("key"); 
    
####Remove the value from the list:
    mylist.remove("key");