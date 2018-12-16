const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/point');

const defaultOptions = {
    fontSize: 10,
    textAnchor: 'start',
    radius: 10,
};

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

test('new Point(0, 0, defaultOptions)', assert => {
    assert.deepEqual(
        new Sut(0, 0, defaultOptions).elements.map(e => e(new Elements, new Point())),
        [
            '<path d="M10 0 L-10 0" stroke="undefined" opacity="undefined" />',
            '<path d="M0 -10 L0 10" stroke="undefined" opacity="undefined" />'
        ],
        'should add a cross at the origin with the expected radius.'
    );
    assert.end();
});

test('new Point(0,20, defaultOptions).label()', assert => {
    assert.deepEqual(
        new Sut(0, 20, defaultOptions).label().elements.map(e => e(new Elements, new Point())),
        [
            '<path d="M10 -20 L-10 -20" stroke="undefined" opacity="undefined" />',
            '<path d="M0 -30 L0 -10" stroke="undefined" opacity="undefined" />',
            '<text x="10" y="-20" fill="undefined" opacity="undefined" text-anchor="start" font-size="10">0, 20</text>'
        ],
        'should add a label and cross for that point.'
    );
    assert.end();
});

test('new Point(undefined, 100, defaultOptions).label(\'Test\')', assert => {
    assert.deepEqual(
        new Sut(undefined, 100, defaultOptions).label('Test').elements.map(e => e(new Elements, new Point())),
        [
            '<path d="M10 -100 L-10 -100" stroke="undefined" opacity="undefined" />',
            '<path d="M0 -110 L0 -90" stroke="undefined" opacity="undefined" />',
            '<text x="10" y="-100" fill="undefined" opacity="undefined" text-anchor="start" font-size="10">Test</text>'
        ],
        'should add a label displaying "Test" and a cross for that point.'
    );
    assert.end();
});

test('new Point(undefined, 100, defaultOption).label(\'Test\').offset()', assert => {
    assert.deepEqual(
        new Sut(undefined, 100, defaultOptions).label('Test').offset().elements.map(e => e(new Elements, new Point())),
        [
            '<text x="0" y="-100" fill="undefined" opacity="undefined" text-anchor="start" font-size="10">Test</text>'
        ],
        'should add a label displaying "Test" anchored to start with no cross.'
    );
    assert.end();
});

test('new Point(undefined, 100, defaultOption).label(\'Test\').offset(0, 1)', assert => {
    assert.deepEqual(
        new Sut(undefined, 100, defaultOptions).label('Test').offset(0, 1).elements.map(e => e(new Elements, new Point())),
        [
            '<path d="M0 -100 L0 -110" stroke="undefined" opacity="undefined" />',
            '<text x="0" y="-110" fill="undefined" opacity="undefined" text-anchor="middle" font-size="10">Test</text>'
        ],
        'should add a label displaying "Test" and the expected offset line.'
    );
    assert.end();
});