const test = require('tape');
const Sut = require('../src/point');
const Vector = require('../src/vector');

test('new Point(origin)', assert => {
    const origin = new Vector(100, 100);
    assert.deepEqual(
        new Sut(origin),
        origin,
        'should return a point at the origin.'
    );
    assert.end();
});

test('new Point(origin, undefined, 100)', assert => {
    const origin = new Vector(100, 100);
    assert.deepEqual(
        new Sut(origin),
        new Vector(origin.x, 100),
        'should return a point with y = 200.'
    );
    assert.end();
});

test('new Point()', assert => {
    const origin = new Vector(100, 100);
    assert.throws(
        () => new Sut(),
        'should throw.'
    );
    assert.end();
});