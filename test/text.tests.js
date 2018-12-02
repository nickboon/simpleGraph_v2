const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/text');

test('new Text(text, point)', assert => {
    const expected = new Point(100, 100);
    assert.deepEqual(
        new Sut('text', expected).points[0],
        expected,
        'should return a text object at the given point.'
    );
    assert.end();
});

test('new Text(text, point).elements(elementFactory)', assert => {
    assert.equal(
        new Sut('text', new Point()).elements[0](new Elements(), new Point()),
        '<text x="0" y="0" fill="undefined" opacity="undefined" text-anchor="undefined" font-size="undefined">text</text>',
        'should return a text element with the given point.'
    );
    assert.end();
});