const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/point');

test('new Point()', assert => {
    const actual = new Sut();
    assert.deepEqual(
        [actual.x, actual.y],
        [0, 0],
        'should return a point at the origin.'
    );
    assert.end();
});

test('new Point(undefined, 100)', assert => {
    const actual = new Sut(undefined, 100);
    assert.deepEqual(
        [actual.x, actual.y],
        [0, 100],
        'should return a point with y = 100.'
    );
    assert.end();
});

test('new Point(undefined, 100).label()', assert => {
    assert.equal(
        new Sut(undefined, 100).label().elements[0](new Elements, new Point()),
        '<text x="0" y="-100" fill="undefined" opacity="undefined" text-anchor="undefined" font-size="undefined">0, 100</text>',
        'should add a label for that point with no offset.'
    );
    assert.end();
});

test('new Point(undefined, 100).label(\'Test\')', assert => {
    assert.equal(
        new Sut(undefined, 100).label('Test').elements[0](new Elements, new Point()),
        '<text x="0" y="-100" fill="undefined" opacity="undefined" text-anchor="undefined" font-size="undefined">Test</text>',
        'should add a label displaying "Test" for that point with no offset.'
    );
    assert.end();
});