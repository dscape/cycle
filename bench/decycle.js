var decycle = require('../').decycle;

var i,
    N = 16000,
    sub0 = {baz: 'foo'},
    sub1 = {foo: 'bar'},
    sub2 = {};

sub2.sub2 = sub2;

sub0.sub0 = sub0;
sub0.sub1 = sub1;
sub1.sub0 = sub0;

var o0 = {
        foo: 'bar',
        one: sub0,
        two: sub1
    },
    o1 = {
        arr: [ sub0, sub1, sub0 ],
        foo: 'bar'
    };

console.time('simple');
for (i = 0; i < N; i++) {
    decycle(sub2);
}
console.timeEnd('simple');

console.time('2 sub');
for (i = 0; i < N; i++) {
    decycle(sub0);
}
console.timeEnd('2 sub');

console.time('3 sub');
for (i = 0; i < N; i++) {
    decycle(o0);
}
console.timeEnd('3 sub');

console.time('array');
for (i = 0; i < N; i++) {
    decycle(o1);
}
console.timeEnd('array');
