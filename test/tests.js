var jaylist = list(),
	otherlist = list(),
	copylist = list();

otherlist.add("other", "list");

module("jaylist Module");

test("create lists", function() {
	expect(3);
	
	var ceelist,
		beelist = list();
	ok(beelist, "create a list");
	beelist.add("one", 1);
	beelist.add("two", 2);
	beelist.add("three", 3);
	ceelist = beelist.copy();
	ok(beelist.isEqual(ceelist), "list is copied");
	beelist.clear();
	equal(ceelist.get("one"), 1, "list is deep copied");
});

test("add", function() {
    expect(6);
    
    equal(jaylist.add("string", "string value"), "string value", 'Added ("string", "string value").');
    equal(jaylist.add("number", 4), 4, 'Added ("number", 4).');
    equal(jaylist.add("boolean", false), false, 'Added ("boolean", true).');
    deepEqual(jaylist.add("array", [1,2,3]), [1,2,3], 'Added ("array", [1,2,3]).');
    equal(jaylist.add("object", otherlist), otherlist, 'Added ("object", otherlist).');
    deepEqual(jaylist.add("array", [4,5,6]), [4,5,6], 'Overwrite ("array", [1,2,3]) with ("array", [4,5,6]).');
});

test("hasKey", function() {
    expect(6);
    
    equal(jaylist.hasKey("string"), true, 'Has key "string".');
    equal(jaylist.hasKey("number"), true, 'Has key "number".');
    equal(jaylist.hasKey("boolean"), true, 'Has key "boolean".');
    equal(jaylist.hasKey("array"), true, 'Has key "array".');
    equal(jaylist.hasKey("object"), true, 'Has key "object".');
    equal(jaylist.hasKey("missing"), false, 'Missing key "missing".');
});

test("get", function() {
    expect(6);
    
    equal(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equal(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equal(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    deepEqual(jaylist.get("array"), [4,5,6], 'Retrieved the value of "array" ([4,5,6]).');
    equal(jaylist.get("object"), otherlist, 'Retrieved the value of "object" (otherlist).');
    equal(jaylist.get("missing"), undefined, 'Cannot retrieve a value not in the list (undefined).');
});


test("remove", function() {
    expect(31);
    
    copylist = jaylist.copy();

    equal(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    jaylist.remove("string");
    equal(jaylist.get("string"), undefined, 'Removed "string".');
    
    equal(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    jaylist.remove("number");
    equal(jaylist.get("number"), undefined, 'Removed "number".');

    equal(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    jaylist.remove("boolean");
    equal(jaylist.get("boolean"), undefined, 'Removed "boolean".');

    deepEqual(jaylist.get("array"), [4,5,6], 'Retrieved the value of "array" ([4,5,6]).');
    jaylist.remove("array");
    equal(jaylist.get("array"), undefined, 'Removed "array".');

    equal(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.remove("object");
    equal(jaylist.get("object"), undefined, 'Removed "object".');
    equal(jaylist.remove("missing"), undefined, 'Cannot remove value not in the list.');

    jaylist.update(copylist);
    equal(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equal(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equal(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    deepEqual(jaylist.get("array"), [4,5,6], 'Retrieved the value of "array" ([4,5,6]).');
    equal(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
	jaylist.remove(["string","number","boolean","array","object"]);
    equal(jaylist.get("string"), undefined, 'Removed "string".');
    equal(jaylist.get("number"), undefined, 'Removed "number".');
    equal(jaylist.get("boolean"), undefined, 'Removed "boolean".');
    equal(jaylist.get("array"), undefined, 'Removed "array".');
    equal(jaylist.get("object"), undefined, 'Removed "object".');
    
	jaylist.update(copylist);
    equal(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    equal(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    equal(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    deepEqual(jaylist.get("array"), [4,5,6], 'Retrieved the value of "array" ([4,5,6]).');
    equal(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.remove(copylist);
    equal(jaylist.get("string"), undefined, 'Removed "string".');
    equal(jaylist.get("number"), undefined, 'Removed "number".');
    equal(jaylist.get("boolean"), undefined, 'Removed "boolean".');
    equal(jaylist.get("array"), undefined, 'Removed "array".');
    equal(jaylist.get("object"), undefined, 'Removed "object".');
});

test("take", function () {
	expect(3);
	var alist = list(),
		blist = list();
	alist.add("one", 1);
	alist.add("two", 2);
	alist.add("three", 3);
	alist.add("four", 4);
	deepEqual(alist.take(3), [["one",1],["two",2],["three",3]], "Take first three items of the list.");
	deepEqual(alist.items(), [["four",4]], "Items were taken.");
	deepEqual(blist.take(3), [], "Take nothing from empty list.");
})

test("pop", function () {
    expect(11);

    jaylist.update(copylist);
    equal(jaylist.get("string"), "string value", 'Retrieved the value of "string" ("string value").');
    jaylist.pop("string");
    equal(jaylist.get("string"), undefined, 'Popped key.');
    
    equal(jaylist.get("number"), 4, 'Retrieved the value of "number" (4).');
    jaylist.pop("number");
    equal(jaylist.get("number"), undefined, 'Popped key.');
    
    equal(jaylist.get("boolean"), false, 'Retrieved the value of "boolean" (false).');
    jaylist.pop("boolean");
    equal(jaylist.get("boolean"), undefined, 'Popped key.');
    
    deepEqual(jaylist.get("array"), [4,5,6], 'Retrieved the value of "array" ([4,5,6]).');
    jaylist.pop("array");
    equal(jaylist.get("array"), undefined, 'Popped key.');
    
    jaylist.add("object", otherlist);
    equal(jaylist.get("object").table, otherlist.table, 'Retrieved the value of "object" (otherlist).');
    jaylist.pop("object");
    equal(jaylist.get("object"), undefined, 'Popped key.');
    
    equal(jaylist.pop("Missing"), undefined, 'Popping missing key returns undefined.');
});

test("popItem", function () {
    expect(2);
    
    jaylist.add("pop", "item");
    ok(jaylist.hasKey("pop"), 'Popped a random item.');
    var popped = jaylist.popItem();
    ok(!jaylist.hasKey("pop"), 'Popped item removed from list.');
});

test("keys, values, items", function() {
    expect(3);
    jaylist.update(copylist);
    deepEqual(jaylist.keys(), ['string','number','boolean','array','object'], 'Retrieved keys.');
    deepEqual(jaylist.values(), ['string value',4,false,[4,5,6],copylist.object().object], 'Retrieved values.');
    deepEqual(jaylist.items(), [['string','string value'],['number',4],['boolean',false],['array',[4,5,6]],['object',copylist.object().object]], 'Retrieved items.');
});

test("len", function() {
    expect(2);
    equal(jaylist.len(), 5, 'Retrieved length.');
    var emptylist = list();
    equal(emptylist.len(), 0, 'Retrieved empty list length.')
});

test("clear", function() {
    expect(2);
    
    equal(jaylist.len(), 5, 'Non-zero length retrieved.')
    jaylist.clear();
    equal(jaylist.len(), 0, 'Cleared list.');
});

test("update", function() {
    expect(1);
    
    jaylist.update(otherlist);
    equal(jaylist.keys().toString(), "other", 'Updated list with list.');
});

test("copy", function() {
    expect(2);

    jaylist = copylist.copy();
    deepEqual(jaylist.keys(), ['string','number','boolean','array','object'], 'Retrieved keys.');
    deepEqual(jaylist.values(), ['string value',4,false,[4,5,6],jaylist.get('object')], 'Retrieved values.');
});

test("each", function() {
    expect(2);
    
    equal(jaylist.len(), 5, "list of length 5.");
    jaylist.each(function(key){jaylist.pop(key)});
    equal(jaylist.len(), 0, "Popped each item in the list");
});

test("next", function() {
    expect(3);
    
    var alist = list();
    alist.add("this", "that");
    alist.add("us", "them");
    ok(alist.hasKey(alist.next()));
    ok(alist.hasKey(alist.next()));
    equal(alist.next(), undefined);
});

test("object", function() {
    expect(2);
    
    var listy = list()
    listy.add("key1", "value1");
    listy.add("key2", "value2");
    var obj = listy.object();
    equal(obj['key1'], "value1", "Retrieved value1.");
    equal(obj['key2'], "value2", "Retrieved value2.");
});

test("isEqual", function() {
    expect(4);
    
    jaylist.update(copylist);
    ok(jaylist.isEqual(copylist), "lists are equal");
    ok(copylist.isEqual(jaylist), "lists are equal");
    ok(!jaylist.isEqual([1,2,3]), "list is not equal to an array");
    ok(!jaylist.isEqual(otherlist), "list is not equal to list");
});