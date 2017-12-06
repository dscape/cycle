var assert = require('assert'),
    cycle = require('../'),
    decycle = cycle.decycle,
    retrocycle = cycle.retrocycle;

var sub0 = {baz: 'foo'},
    sub1 = {foo: 'bar'};

sub0.sub0 = sub0;
sub0.sub1 = sub1;
sub1.sub0 = sub0;

var o0 = {
    foo: 'bar',
    one: sub0,
    two: sub1
};

var o1 = {
    foo: 'bar',
    arr: [sub0, sub1, sub0]
};

assert.deepEqual(decycle(o0), {
    foo: 'bar',
    one: {
        baz: 'foo',
        sub0: {$ref: '$["one"]'},
        sub1: {
            foo: 'bar',
            sub0: {$ref: '$["one"]'}
        }
    },
    two: {$ref: '$["one"]["sub1"]'}
});

assert.deepEqual(decycle(o1), {
  foo: 'bar',
  arr: [
    {
        baz: 'foo',
        sub0: { $ref: '$["arr"][0]' },
        sub1: {
            foo: 'bar',
            sub0: { $ref: '$["arr"][0]' }
        }
    },
    { $ref: '$["arr"][0]["sub1"]' },
    { $ref: '$["arr"][0]' }
  ]
});
