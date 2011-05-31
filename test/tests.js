var jaylist = new List();

module("jaylist Module");

test('Add items', function() {
    expect(4);
    equals(jaylist.add("that", 1), 1, 'Added ("that", 1).');
    equals(jaylist.add("this", 4), 4, 'Added ("this", 4).');
    equals(jaylist.add("this", 7), 7, 'Overwrite ("this", 4) with ("this", 7).');
    equals(jaylist.add("other", "things"), "things", 'Added ("other", "things").');
});

test('Contain functions', function() {
    expect(3);
    equals(jaylist.hasKey("that"), true, 'Has key "that".');
    equals(jaylist.hasKey("this"), true, 'Has key "this".');
    equals(jaylist.hasKey("Missing"), false, 'Does not have key "Missing".');
});

test('Get items', function() {
    expect(4);
    equals(jaylist.get("that"), 1, 'Retrieved the value of "that" (1).');
    equals(jaylist.get("this"), 7, 'Retrieved the value of "this" (7).');
    equals(jaylist.get("other"), "things", 'Retrieved the value of "other" ("things").');
    equals(jaylist.get("Missing"), undefined, 'Cannot retrieve a value not in the list (undefined).');
});

test('Remove items', function() {
    expect(4);
    jaylist.remove("that");
    equals(jaylist.get("that"), undefined, 'Removed "that".');
    jaylist.remove("this");
    equals(jaylist.get("this"), undefined, 'Removed "this".');
    jaylist.remove("other");
    equals(jaylist.get("other"), undefined, 'Removed "other".');
    equals(jaylist.remove("Missing"), undefined, 'Cannot remove value not in the list.');
});

test('Pop function', function () {
    expect(3);
    jaylist.add("popped", 4);
    jaylist.pop("popped");
    ok(!jaylist.hasKey("popped"), 'Popped key.');
    equals(jaylist.pop("Missing", 80), 80, 'Popping missing key returns default.');
    equals(jaylist.pop("Missing"), undefined, 'Popping missing key returns undefined.');
});

test('popItem function', function () {
    expect(2);
    jaylist.clear();
    jaylist.add("popper", 1832);
    var popped = jaylist.popItem();
    equals(popped[0], "popper", 'Popped a random item.');
    ok(!jaylist.hasKey("popper"), 'Removed it from the list.');
});

test('Mass retrieval', function() {
    expect(3);
    jaylist.clear();
    jaylist.add("howdy", 9);
    jaylist.add("amazing", 9);
    equals(jaylist.keys().toString(), "howdy,amazing", 'Retrieved keys.');
    equals(jaylist.values().toString(), "9", 'Retrieved values.');
    equals(jaylist.items().toString(), 'howdy,9,amazing,9', 'Retrieved items.');
});

test('Length functions', function() {
    expect(2);
    equals(jaylist.len(), 2, 'Retrieved length.');
    var emptylist = new List();
    equals(emptylist.len(), 0, 'Retrieved empty list length.')
});

test('Clear functions', function() {
    expect(1);
    jaylist.clear();
    equals(jaylist.len(), 0, 'Cleared list.');
});

test('Update function', function() {
    expect(1);
    var other_list = new List();
    other_list.add("hello", 1);
    other_list.add("howdy", 2);
    jaylist.add("original", 3);
    jaylist.update(other_list);
    equals(jaylist.keys().toString(), "original,hello,howdy", 'Updated list with List.');
});

test('Copy function', function() {
	expect(2);
	var some_list = new List();
	some_list.add("original", true);
	some_list.add("hello", 1);
	some_list.add("howdy", 2);
	var copy_list = some_list.copy();
	some_list.clear();
	equals(copy_list.keys().toString(), "original,hello,howdy", "Copied the keys.");
	equals(copy_list.values().toString(), "true,1,2", "Copied the values.")
});
