const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/cross');

test('new Cross(point, r)', assert => {
    assert.deepEqual(
        new Sut(new Point, 10).points.map(p => [p.x, p.y]),
        [
            [10, 0],
            [-10, 0],
            [0, 10],
            [0, -10]
        ],
        'should return a cross with the expected points.'
    );
    assert.end();
});

test('new Cross(point, 40).elements(elementFactory)', assert => {
    assert.deepEqual(
        new Sut(new Point(100, 100), 50).elements.map(e => e(new Elements(), new Point())),
        [
            '<path d="M150 -100 L50 -100" stroke="undefined" opacity="undefined" />',
            '<path d="M100 -150 L100 -50" stroke="undefined" opacity="undefined" />'
        ],
        'should return cross elements with the given points.'
    );
    assert.end();
});