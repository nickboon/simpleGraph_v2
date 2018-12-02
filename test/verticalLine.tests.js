const test = require('tape');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/verticalLine');

const assertEqualIgnoreWhiteSpace = (assert, actual, expected, message) => {
    const whitespace = /\s+/g;
    assert.equal(
        actual.replace(whitespace, ''),
        expected.replace(whitespace, ''),
        message
    );
};

test('new VerticalLine(height, xIntercept)', assert => {
    assert.deepEqual(
        new Sut(600, 400).points,
        [new Point(400, 0), new Point(400, 600)],
        'should return a vertical line across the graph at the given x.'
    );
    assert.end();
});

test('new VerticalLine(height, xIntercept).elements[0](elementFactory, origin)', assert => {
    assert.equal(
        new Sut(600, 400).elements[0](new Elements(), new Point()),
        '<path d="M400 0 L400 600" stroke="undefined" opacity="undefined" />',
        'should return a vertical line element across the graph at the given x.'
    );
    assert.end();
});

test('new VerticalLine(height, xIntercept).setDivisions(100)setDivisions(100).elements[1](elementsFactory, origin)', assert => {
    assertEqualIgnoreWhiteSpace(
        assert,
        new Sut(600, 300).setDivisions(100).elements[1](new Elements(), new Point()), `
            <text x="290" y="100" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-100</text>
            <path d="M300 100 L290 100" stroke="undefined" opacity="undefined" />
            <text x="290" y="200" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-200</text>
            <path d="M300 200 L290 200" stroke="undefined" opacity="undefined" />
            <text x="290" y="300" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-300</text>
            <path d="M300 300 L290 300" stroke="undefined" opacity="undefined" />
            <text x="290" y="400" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-400</text>
            <path d="M300 400 L290 400" stroke="undefined" opacity="undefined" />
            <text x="290" y="500" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-500</text>
            <path d="M300 500 L290 500" stroke="undefined" opacity="undefined" />`,
        'should return the expected given division elements.'
    );
    assert.end();
});

test('new VerticalLine(300).setDivisions().elements.map(e => e(elementfactory, origin))', assert => {
    assert.deepEqual(
        new Sut(300).setDivisions().elements.map(e => e(new Elements(), new Point())),
        ['<path d="M0 0 L0 300" stroke="undefined" opacity="undefined" />'],
        'should return a y axis with no divisions.'
    );
    assert.end();
});

test('new VerticalLine(300).setDivisions(100)', assert => {
    const setDivsions = () => new Sut(300).setDivisions(100);
    setDivsions();
    assertEqualIgnoreWhiteSpace(
        assert,
        setDivsions().elements[1](new Elements(), new Point()), `
            <text x="-10" y="100" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-100</text>
            <path d="M0 100 L-10 100" stroke="undefined" opacity="undefined" />
            <text x="-10" y="200" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-200</text>
            <path d="M0 200 L-10 200" stroke="undefined" opacity="undefined" />`,
        'should be idempotent.'
    );
    assert.end();
});

test('new VerticalLine(300, 100).setDivisions(100)', assert => {
    const setDivsions = () => new Sut(300, 100).setDivisions(100);
    setDivsions();
    assertEqualIgnoreWhiteSpace(
        assert,
        setDivsions().elements[2](new Elements, new Point()), `
        <textx="90"y="0"fill="undefined"opacity="undefined"text-anchor="end"font-size="10">0</text>
        <pathd="M1000L900"stroke="undefined"opacity="undefined"/>`,
        'should be include a mark at origin.'
    );
    assert.end();
});