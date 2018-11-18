const test = require('tape');
const Elements = require('../src/elements');
const Vector = require('../src/vector');
const Sut = require('../src/cubicBezier');

test('new CubicBezier(points)', assert => {
    const expected = [
        new Vector(),
        new Vector(200, 200),
        new Vector(300, 300),
        new Vector(400, 400)
    ];
    assert.deepEqual(
        new Sut(expected), {
            points: expected
        },
        'should return a cubic bezier with the given points.'
    );
    assert.end();
});

test('new CubicBezier(points).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([
            new Vector(),
            new Vector(200, 200),
            new Vector(300, 300),
            new Vector(300, 300)
        ]).elements(new Elements()),
        '<path d="M0 0 C200 200, 300 300, 300 300" stroke="undefined" fill="none" opacity="undefined" />',
        'should return a quadratic bezier element with the given points.'
    );
    assert.end();
});