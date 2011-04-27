var jaylist = new List();

test('jaylist', function() {
    equals(jaylist.add("this", 1), 1, 'Added ("that", 1).');
    equals(jaylist.get("this"), 1, 'Retrieved the value of "that".');
    equals(jaylist.get("that"), undefined, 'Cannot retrieve value that does not exist.');
    ok(jaylist.remove("this"), 'Removed "this".');
    ok(!jaylist.remove("that"), 'Cannot remove value that does not exist.');
})