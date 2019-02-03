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

test('new Line(points, colour, opacity).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([new Point(100, 100), new Point()], '#00f', .5).elements[0](new Elements(), new Point()),
        '<path d="M100 -100 L0 0" stroke="#00f" opacity="0.5" />',
        'should return a line element with the given points, colour and opacity.'
    );
    assert.end();
});