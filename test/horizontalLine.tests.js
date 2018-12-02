const test = require('tape');
const {
    assertEqualIgnoreWhiteSpace
} = require('./tapeHelpers');
const Elements = require('../src/elements');
const Point = require('../src/point');
const Sut = require('../src/horizontalLine');

test('new HorizontalLine(width, yIntercept)', assert => {
    assert.deepEqual(
        new Sut(600, 300).points,
        [new Point(0, 300), new Point(600, 300)],
        'should return a horizontal line across the graph at the given yIntercept.'
    );
    assert.end();
});

test('new HorizontalLine(width, yIntercept).elements(elementFactory, origin)', assert => {
    assert.equal(
        new Sut(600, 300).elements[0](new Elements(), new Point()),
        '<path d="M0 -300 L600 -300" stroke="undefined" opacity="undefined" />',
        'should return a horizontal line element across the graph at the given yIntercept.'
    );
    assert.end();
});

test('new HorizintalLine(width, yIntercept).setDivisions(100).elements[1](elementfactory, origin)', assert => {
    assertEqualIgnoreWhiteSpace(
        assert,
        new Sut(600, 300).setDivisions(100).elements[1](new Elements(), new Point()), `        
        <textx="100"y="-280"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-100</text>
        <pathd="M100-300L100-290"stroke="undefined"opacity="undefined"/>
        <textx="200"y="-280"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-200</text>
        <pathd="M200-300L200-290"stroke="undefined"opacity="undefined"/>
        <textx="300"y="-280"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-300</text>
        <pathd="M300-300L300-290"stroke="undefined"opacity="undefined"/>
        <textx="400"y="-280"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-400</text>
        <pathd="M400-300L400-290"stroke="undefined"opacity="undefined"/>
        <textx="500"y="-280"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-500</text>
        <pathd="M500-300L500-290"stroke="undefined"opacity="undefined"/>`,
        'should return the expected element divisions.'
    );
    assert.end();
});

test('new HorizintalLine(300).setDivisions().elements.map(e => e(elementfactory, origin))', assert => {
    assert.deepEqual(
        new Sut(300).setDivisions().elements.map(e => e(new Elements(), new Point())),
        ['<path d="M0 0 L300 0" stroke="undefined" opacity="undefined" />'],
        'should return an x axis with no divisions.'
    );
    assert.end();
});

test('new HorizintalLine(300).setDivisions(100)', assert => {
    const setDivsions = () => new Sut(300).setDivisions(100);
    setDivsions();
    assertEqualIgnoreWhiteSpace(
        assert,
        setDivsions().elements[1](new Elements(), new Point()), `
        <textx="100"y="20"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-100</text>
        <pathd="M1000L10010"stroke="undefined"opacity="undefined"/>
        <textx="200"y="20"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">-200</text>
        <pathd="M2000L20010"stroke="undefined"opacity="undefined"/>`,
        'should be idempotent.'
    );
    assert.end();
});

test('new HorizintalLine(300, 100).setDivisions(100)', assert => {
    const setDivisions = () => new Sut(300, 100).setDivisions(100);
    setDivisions();
    assertEqualIgnoreWhiteSpace(
        assert,
        setDivisions().elements[2](new Elements, new Point()), `
        <textx="0"y="-80"fill="undefined"opacity="undefined"text-anchor="middle"font-size="10">0</text>
        <pathd="M0-100L0-90"stroke="undefined"opacity="undefined"/>`,
        'should be include a mark at origin.'
    );
    assert.end();
});