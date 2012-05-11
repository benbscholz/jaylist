// Jaylist tests.

module('jaylist module');

test('create a list', function () {
		expect(1);

		var xs = list();
		ok(xs, 'list created');
});

test('add: add items to a list', function () {
		expect(7);

		var xs = list();
		var ys = list();
		
		deepEqual(xs.add('string', 'strval'), 'strval', 'Added ("string", "strval").');
		deepEqual(xs.add('number', 18593214), 18593214, 'Added ("number", 18593214).');
		deepEqual(xs.add('boolean',   false),    false, 'Added ("boolean",   false).');
		deepEqual(xs.add('object',	     ys),       ys, 'Added ("object",       ys).');
		deepEqual(xs.add('array', [1,2,3,4]), [1,2,3,4],'Added ("array", [1,2,3,4]).');
		deepEqual(xs.add('array', [4,3,2,1]), [4,3,2,1],'Added ("array", [4,3,2,1]).');
		deepEqual(xs.add('hasOwnProperty'), undefined, 'Cannot add property.');
});

test('hasKey: check a list for keys', function () {
		expect(6);

		var xs = list();
		var ys = list();

		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',   false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		ok(xs.hasKey('string'), 'Has key "string".');
		ok(xs.hasKey('number'), 'Has key "number".');
		ok(xs.hasKey('boolean'),'Has key "boolean".');
		ok(xs.hasKey('object'), 'Has key "object".');
		ok(xs.hasKey('array'),  'Has key "array".');
		ok(!xs.hasKey('missing'),'Missing key "missing".');
});

test('get: retrieve values using a key', function () {
		expect(6);
		
		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.get('string'), 'strval', 'Retrieved the value of "string".');
		deepEqual(xs.get('number'), 18593214, 'Retrieved the value of "number".');
		deepEqual(xs.get('boolean'),false,    'Retrieved the value of "boolean".');
		deepEqual(xs.get('object'), ys,       'Retrieved the value of "object".');
		deepEqual(xs.get('array'),  [1,2,3,4],'Retrieved the value of "array".');
		deepEqual(xs.get('hasOwnProperty'), undefined, 'Cannot retrieve property.');
});

test('remove: remove values using a key', function () {
		expect(10);
		
		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.remove('string'), 'strval', 'Removed the value of "string".');
		ok(!xs.get('string'), '"string" removed.');

		deepEqual(xs.remove('number'), 18593214, 'Removed the value of "number".');
		ok(!xs.get('number'), '"number" removed.');

		deepEqual(xs.remove('boolean'),false,    'Removed the value of "boolean".');
		ok(!xs.get('boolean'), '"boolean" removed.');

		deepEqual(xs.remove('object'), ys,       'Removed the value of "object".');
		ok(!xs.get('object'), '"object" removed.');

		deepEqual(xs.remove('array'),  [1,2,3,4],'Removed the value of "array".');
		ok(!xs.get('array'), '"array" removed.');
});


test('keys: return the keys in the list', function () {
		expect(1);
		
		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.keys(), ['string', 'number', 'boolean', 'object', 'array'], 'Popped the value of "string".');
});

test('values: return values in the list', function () {
		expect(1);
		
		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.values(), ['strval', 18593214, false, ys, [1,2,3,4]], 'Popped the value of "string".');
});

test('items: return (key, value) pairs in the list', function () {
		expect(1);
		
		var xs = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.items(), [['string', 'strval'], ['number', 18593214],
													 ['boolean',   false], ['array', [1,2,3,4]]], 'Retrieved [key, value] list.');
});

test('len: return the number of items in the list', function () {
		expect(2);

		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		equal(xs.len(), 5, 'List of length 5.');
		equal(ys.len(), 0, 'List of length 0.');
});

test('clear: empty the list', function () {
		expect(2);

		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		equal(xs.len(), 5, 'List of length 5.');
		xs.clear();
		equal(xs.len(), 0, 'List of length 0.');
});

test('update: add the contents of one list to another', function () {
		expect(1);

		var xs = list();
		var ys = list();
		var zs = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       zs);
		xs.add('array', [1,2,3,4]);

		ys.update(xs);
		deepEqual(xs._table, ys._table, 'List updated.');
});

test('copy: return a deep copy of the list', function () {
		expect(1);

		var ws;
		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('array', [1,2,3,4]);

		ws = xs.copy();
		deepEqual(xs._table, ws._table, 'List copied.');
});

test('each: execute a callback for each key in the list', function () {
		expect(1);

		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		xs.each(function(key){xs.remove(key);});
		equal(xs.len(), 0, 'Callback `remove` executed.');
});

test('next: loop-style iteration', function () {
		expect(6);

		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.next(), 'string', '`string` retrieved.');
		deepEqual(xs.next(), 'number', '`number` retrieved.');
		deepEqual(xs.next(), 'boolean', '`boolean` retrieved.');
		deepEqual(xs.next(), 'object', '`object` retrieved.');
		deepEqual(xs.next(), 'array', '`array` retrieved.');
		deepEqual(xs.next(), undefined, 'iteration complete.');
});

test('object: returns the list in object-literal form', function () {
		expect(1);

		var xs = list();
		var ys = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       ys);
		xs.add('array', [1,2,3,4]);

		deepEqual(xs.object(),  {'string' : 'strval',
														 'number' : 18593214,
														 'boolean': false,
														 'object' : ys,
														 'array'  : [1,2,3,4]}, 'Object retrieved.');
});

test('isEqual: list equality', function () {
		expect(2);

		var xs = list();
		var ys = list();
		var zs = list();
		
		xs.add('string', 'strval');
		xs.add('number', 18593214);
		xs.add('boolean',    false);
		xs.add('object',       zs);
		xs.add('array', [1,2,3,4]);

		ys.add('string', 'strval');
		ys.add('number', 18593214);
		ys.add('boolean',    false);
		ys.add('object',       zs);
		ys.add('array', [1,2,3,4]);
	
		ok(xs.isEqual(ys), 'Lists are equal.');
		ok(ys.isEqual(xs), 'Lists are equal.');
});

























