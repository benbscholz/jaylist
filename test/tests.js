var jaylist = new List();

module("jaylist Module");

test('Add items', function() {
    expect(4);
    equals(jaylist.add("that", 1), 1, 'Added ("that", 1).');
    equals(jaylist.add("this", 4), 4, 'Added ("this", 4).');
    equals(jaylist.add("this", 7), 7, 'Overwrite ("this", 4) with ("this", 7).');
    equals(jaylist.add("other", "things"), "things", 'Added ("other", "things").');
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
    equals(jaylist.remove("Missing"), false, 'Cannot remove value not in the list.');
});

test('Mass retrieval', function() {
    expect(2);
    jaylist.add("howdy", 9);
    jaylist.add("amazing", 9);
    equals(jaylist.keys().toString(), "howdy,amazing", 'Retrieved keys.');
    equals(jaylist.values().toString(), "9", 'Retrieved values.');
});

test('Length Functions', function() {
    expect(2);
    equals(jaylist.len(), 2, 'Retrieved length.');
    var emptylist = new List();
    equals(emptylist.len(), 0, 'Retrieved empty list length.')
})
