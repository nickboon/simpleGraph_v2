const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/cubicBezier');


test('new CubicBezier(points)', assert => {
    const expected = [
        new Point(),
        new Point(200, 200),
        new Point(300, 300),
        new Point(400, 400)
    ];
    assert.deepEqual(
        new Sut(expected).points,
        expected,
        'should return a cubic bezier with the given points.'
    );
    assert.end();
});

test('new CubicBezier(points).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([
            new Point(),
            new Point(200, 200),
            new Point(300, 300),
            new Point(300, 300)
        ]).elements[0](new Elements(), new Point()),
        '<path d="M0 0 C200 -200, 300 -300, 300 -300" stroke="undefined" fill="none" opacity="undefined" />',
        'should return a quadratic bezier element with the given points.'
    );
    assert.end();
});