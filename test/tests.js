var jaylist = new List();
var otherlist = new List();
var copylist = new List();

otherlist.add("other", "list");

module("jaylist Module");

test("Add items", function() {
    expect(6);
    equals(jaylist.add("string", "string value"), "string value", 'Added ("string", "string value").');
    equals(jaylist.add("number", 4), 4, 'Added ("number", 4).');
    equals(jaylist.add("boolean", false), false, 'Added ("boolean", true).');
    equals(jaylist.add("array", [1,2,3]).toString(), [1,2,3].toString(), 'Added ("array", [1,2,3]).');
    equals(jaylist.add("object", otherlist), otherlist, 'Added ("object", otherlist).');
    equals(jaylist.add("array", [4,5,6]).toString(), [4,5,6].toString(), 'Overwrite ("array", [1,2,3]) with ("array", [4,5,6]).');
});

test("Contain functions", function() {
    expect(6);
    equals(jaylist.hasKey("string"), true, 'Has key "string".');
    equals(jaylist.hasKey("number"), true, 'Has key "number".');
    equals(jaylist.hasKey("boolean"), true, 'Has key "boolean".');
    equals(jaylist.hasKey("array"), true, 'Has key "array".');
    equals(jaylist.hasKey("object"), true, 'Has key "object".');
    equals(jaylist.hasKey("missing"), false, 'Missing key "missing".');
});

test("Get items", function() {
    expect(6);
    equals(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equals(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equals(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    equals(jaylist.get("array").toString(), [4,5,6].toString(), 'Retrieved the value of "array" ([4,5,6]).');
    equals(jaylist.get("object"), otherlist, 'Retrieved the value of "object" (otherlist).');
    equals(jaylist.get("missing"), undefined, 'Cannot retrieve a value not in the list (undefined).');
});


test("Remove items", function() {
    expect(31);
    copylist = jaylist.copy();
    equals(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    jaylist.remove("string");
    equals(jaylist.get("string"), undefined, 'Removed "string".');
    equals(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    jaylist.remove("number");
    equals(jaylist.get("number"), undefined, 'Removed "number".');
    equals(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    jaylist.remove("boolean");
    equals(jaylist.get("boolean"), undefined, 'Removed "boolean".');
    equals(jaylist.get("array").toString(), [4,5,6].toString(), 'Retrieved the value of "array" ([4,5,6]).');
    jaylist.remove("array");
    equals(jaylist.get("array"), undefined, 'Removed "array".');
    equals(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.remove("object");
    equals(jaylist.get("object"), undefined, 'Removed "object".');
    equals(jaylist.remove("missing"), undefined, 'Cannot remove value not in the list.');
    jaylist.update(copylist);
    equals(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equals(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equals(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    equals(jaylist.get("array").toString(), [4,5,6].toString(), 'Retrieved the value of "array" ([4,5,6]).');
    equals(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.remove(["string","number","boolean","array","object"]);
    equals(jaylist.get("string"), undefined, 'Removed "string".');
    equals(jaylist.get("number"), undefined, 'Removed "number".');
    equals(jaylist.get("boolean"), undefined, 'Removed "boolean".');
    equals(jaylist.get("array"), undefined, 'Removed "array".');
    equals(jaylist.get("object"), undefined, 'Removed "object".');
    jaylist.update(copylist);
    equals(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equals(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equals(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    equals(jaylist.get("array").toString(), [4,5,6].toString(), 'Retrieved the value of "array" ([4,5,6]).');
    equals(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.remove(copylist);
    equals(jaylist.get("string"), undefined, 'Removed "string".');
    equals(jaylist.get("number"), undefined, 'Removed "number".');
    equals(jaylist.get("boolean"), undefined, 'Removed "boolean".');
    equals(jaylist.get("array"), undefined, 'Removed "array".');
    equals(jaylist.get("object"), undefined, 'Removed "object".');
});

test("Pop function", function () {
    expect(11);
    jaylist.update(copylist);
    equals(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    jaylist.pop("string");
    equals(jaylist.get("string"), undefined, 'Popped key.');
    equals(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    jaylist.pop("number");
    equals(jaylist.get("number"), undefined, 'Popped key.');
    equals(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    jaylist.pop("boolean");
    equals(jaylist.get("boolean"), undefined, 'Popped key.');
    equals(jaylist.get("array").toString(), [4,5,6].toString(), 'Retrieved the value of "array" ([4,5,6]).');
    jaylist.pop("array");
    equals(jaylist.get("array"), undefined, 'Popped key.');
    jaylist.add("object", otherlist);
    equals(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.pop("object");
    equals(jaylist.get("object"), undefined, 'Popped key.');
    equals(jaylist.pop("Missing"), undefined, 'Popping missing key returns undefined.');
});

test("popItem function", function () {
    expect(2);
    jaylist.add("pop", "item");
    ok(jaylist.hasKey("pop"), 'Popped a random item.');
    var popped = jaylist.popItem();
    ok(!jaylist.hasKey("pop"), 'Popped item removed from list.');
});

test("Mass retrieval", function() {
    expect(3);
    jaylist.update(copylist);
    equals(jaylist.keys().toString(), 'string,number,boolean,array,object', 'Retrieved keys.');
    equals(jaylist.values().toString(), 'string value,4,false,4,5,6,[object Object]', 'Retrieved values.');
    equals(jaylist.items().toString(), 'string,string value,number,4,boolean,false,array,4,5,6,object,[object Object]', 'Retrieved items.');
});

test("Length functions", function() {
    expect(2);
    equals(jaylist.len(), 5, 'Retrieved length.');
    var emptylist = new List();
    equals(emptylist.len(), 0, 'Retrieved empty list length.')
});

test("Clear functions", function() {
    expect(2);
    equals(jaylist.len(), 5, 'Non-zero length retrieved.')
    jaylist.clear();
    equals(jaylist.len(), 0, 'Cleared list.');
});

test("Update function", function() {
    expect(1);
    jaylist.update(otherlist);
    equals(jaylist.keys().toString(), "other", 'Updated list with List.');
});

test("Copy function", function() {
    expect(2);
    jaylist = copylist.copy();
    equals(jaylist.keys().toString(), 'string,number,boolean,array,object', 'Retrieved keys.');
    equals(jaylist.values().toString(), 'string value,4,false,4,5,6,[object Object]', 'Retrieved values.');
});

test("Each function", function() {
    expect(2);
    equals(jaylist.len(), 5, "List of length 5.");
    jaylist.each(function(key){jaylist.pop(key)});
    equals(jaylist.len(), 0, "Popped each item in the list");
});

test("Next function", function() {
    expect(3);
    var alist = new List();
    alist.add("this", "that");
    alist.add("us", "them");
    ok(alist.hasKey(alist.next()));
    ok(alist.hasKey(alist.next()));
    equals(alist.next(), undefined);
});

test("Object function", function() {
    expect(2);
    var listy = new List()
    listy.add("key1", "value1");
    listy.add("key2", "value2");
    var obj = listy.object();
    equals(obj['key1'], "value1", "Retrieved value1.");
    equals(obj['key2'], "value2", "Retrieved value2.");
});

test("Equality function", function() {
    expect(4);
    jaylist.update(copylist);
    ok(jaylist.isEqual(copylist), "Lists are equal");
    ok(copylist.isEqual(jaylist), "Lists are equal");
    ok(!jaylist.isEqual([1,2,3]), "List is not equal to an array");
    ok(!jaylist.isEqual(otherlist), "List is not equal to list");
});