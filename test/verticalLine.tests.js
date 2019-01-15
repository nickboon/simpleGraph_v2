const test = require('tape');
const {
    assertEqualIgnoreWhiteSpace
} = require('./tapeHelpers');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/verticalLine');

test('new VerticalLine(height, xIntercept).elements[0](elementFactory, origin)', assert => {
    assert.equal(
        new Sut(600, 400).elements[0](new Elements(), new Point()),
        '<path d="M400 0 L400 600" stroke="undefined" opacity="undefined" />',
        'should return a vertical line element across the graph at the given x.'
    );
    assert.end();
});

test('new VerticalLine(height, xIntercept).setDivisions(100)setDivisions(100).elements', assert => {
    assertEqualIgnoreWhiteSpace(
        assert,
        new Sut(600, 300).setDivisions(100).elements.map(e => e(new Elements(), new Point())).join(''), `
            <path d="M300 0 L300 600" stroke="undefined" opacity="undefined" />
            <path d="M300 100 L290 100" stroke="undefined" opacity="undefined" />
            <text x="290" y="100" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-100</text>
            <path d="M300 200 L290 200" stroke="undefined" opacity="undefined" />
            <text x="290" y="200" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-200</text>
            <path d="M300 300 L290 300" stroke="undefined" opacity="undefined" />
            <text x="290" y="300" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-300</text>
            <path d="M300 400 L290 400" stroke="undefined" opacity="undefined" />
            <text x="290" y="400" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-400</text>
            <path d="M300 500 L290 500" stroke="undefined" opacity="undefined" />
            <text x="290" y="500" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-500</text>`,
        'should contain the expected labels.'
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
        setDivsions().elements.map(e => e(new Elements(), new Point())).join(''), `
            <path d="M00 L0 300" stroke="undefined" opacity="undefined"/>
            <path d="M0 100 L-10 100" stroke="undefined" opacity="undefined" />
            <text x="-10" y="100" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-100</text>
            <path d="M0 200 L-10 200" stroke="undefined" opacity="undefined" />
            <text x="-10" y="200" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-200</text>`,
        'should be idempotent.'
    );
    assert.end();
});

test('new VerticalLine(300, 100).setDivisions(100)', assert => {
    const setDivisions = () => new Sut(300, 100).setDivisions(100);
    setDivisions();
    assertEqualIgnoreWhiteSpace(
        assert,
        setDivisions().elements[2](new Elements, new Point()), `
            <path d="M100 100 L90 100" stroke="undefined" opacity="undefined" />
            <text x="90" y="100" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-100</text>
            <path d="M100 200 L90 200" stroke="undefined" opacity="undefined"/>
            <text x="90" y="200" fill="undefined" opacity="undefined" text-anchor="end" font-size="10">-200</text>`,
        'should be include a mark at origin.'
    );
    assert.end();
});