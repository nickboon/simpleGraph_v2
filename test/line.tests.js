const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/line');

test('new Line(points)', assert => {
    const expected = [new Point(100, 100), new Point(200, 200)];
    assert.deepEqual(
        new Sut(expected).points,
        expected,
        'should return a line with the given points.'
    );
    assert.end();
});

test('new Line(points).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([new Point(100, 100), new Point()]).elements[0](new Elements(), new Point()),
        '<path d="M100 -100 L0 0" stroke="undefined" opacity="undefined" />',
        'should return a line element with the given points.'
    );
    assert.end();
});