const test = require('tape');
const Elements = require('../src/elements');
const Vector = require('../src/vector');
const Sut = require('../src/line');

test('new Line(points)', assert => {
    const expected = [new Vector(100, 100), new Vector(200, 200)];
    assert.deepEqual(
        new Sut(expected), {
            points: expected
        },
        'should return a line with the given points.'
    );
    assert.end();
});

test('new Line(points).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([new Vector(100, 100), new Vector()]).elements(new Elements()),
        '<path d="M100 100 L0 0" stroke="undefined" opacity="undefined" />',
        'should return a line element with the given points.'
    );
    assert.end();
});