const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/polygon');

test('new Polygon(points)', assert => {
    const expected = [new Point(), new Point(200, 200), new Point(300, 300)];
    assert.deepEqual(
        new Sut(expected).points,
        expected, 'should return a polygon with the given points.'
    );
    assert.end();
});

test('new Polygon(points).elements(elementFactory)', assert => {
    assert.equal(
        new Sut([new Point(), new Point(200, 200), new Point(300, 300)]).elements[0](new Elements(), new Point()),
        '<polygon points="0,0 200,-200 300,-300" fill="undefined" opacity="undefined" />',
        'should return a polygon element with the given points.'
    );
    assert.end();
});