var jaylist = new List();

module("jaylist Module");

test('Hash Functionality', function() {
    equals(typeof jaylist.hash("hello"), "number", 'Hash a string.');
    ok(!jaylist.hash(235), 'Cannot hash a non-string.');
});

test('Add items', function() {
    equals(jaylist.add("that", 1), 1, 'Added ("that", 1).');
    equals(jaylist.add("this", 4), 4, 'Added ("this", 4).');
    equals(jaylist.add("this", 7), 7, 'Overwrite ("this", 4) with ("this", 7).');
    equals(jaylist.add("other", "things"), "things", 'Added ("other", "things").');
});

test('Get items', function() {
    equals(jaylist.get("that"), 1, 'Retrieved the value of "that" (1).');
    equals(jaylist.get("this"), 7, 'Retrieved the value of "this" (7).');
    equals(jaylist.get("other"), "things", 'Retrieved the value of "other" ("things").');
    equals(jaylist.get("Missing"), undefined, 'Cannot retrieve a value not in the list (undefined).');
});

test('Remove items', function() {
    jaylist.remove("that");
    equals(jaylist.get("that"), undefined, 'Removed "that".');
    jaylist.remove("this");
    equals(jaylist.get("this"), undefined, 'Removed "this".');
    jaylist.remove("other");
    equals(jaylist.get("other"), undefined, 'Removed "other".');
    equals(jaylist.remove("Missing"), false, 'Cannot remove value not in the list.');
});