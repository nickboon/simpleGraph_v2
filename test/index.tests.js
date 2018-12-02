const test = require('tape');
const {
    assertEqualIgnoreWhiteSpace
} = require('./tapeHelpers');
const Sut = require('../src/index');

const expected = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg 
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="600"
            height="300"
        >
            <path d="M0 150 L600 150" stroke="#000" opacity="0.5" />
            <path d="M300 0 L300 300" stroke="#000" opacity="0.5" />            
        </svg>`;

test('new Graph().draw()', assert => {
    assertEqualIgnoreWhiteSpace(
        assert,
        new Sut().draw(),
        expected,
        'should return an svg with default dimensions, origin and axes.'
    );
    assert.end();
});

test('new Graph(100,100).draw()', assert => {
    assert.true(
        new Sut(100, 100).draw().includes('width="100" height="100"'),
        'should return a 100 x 100 pixel svg.'
    );
    assert.end();
});

test('new Graph().setDimensions(100,100).draw()', assert => {
    assert.true(
        new Sut().setDimensions(100, 100).draw().includes('width="100" height="100"'),
        'should return a 100 x 100 pixel svg.'
    );
    assert.end();
});

test('new Graph().setDimensions(undefined,100).draw()', assert => {
    assert.true(
        new Sut().setDimensions(undefined, 100).draw().includes('width="600" height="100"'),
        'should return a 100 pixel high svg with the default width.'
    );
    assert.end();
});

test('new Graph().setDefaults({width:700}).setDimensions(undefined,100).draw()', assert => {
    assert.true(
        new Sut().setDefaults({
            width: 700
        }).setDimensions(undefined, 100).draw().includes('width="700" height="100"'),
        'should return a 100 pixel high svg with the set default width.'
    );
    assert.end();
});

test('new Graph().setDefaults({colour:\'#f00\', opacity:0.1}).draw()', assert => {
    const actual = new Sut().setDefaults({
        colour: '#f00',
        opacity: 0.1
    }).draw();

    assert.true(
        actual.includes('<path d="M0 150 L600 150" stroke="#f00" opacity="0.1" />'),
        'should return a graph with an x axis of the expected colour and opacity.'
    );
    assert.true(
        actual.includes('<path d="M300 0 L300 300" stroke="#f00" opacity="0.1" />'),
        'should return a graph with an y axis of the expected colour and opacity.'
    );
    assert.end();
});

test('new Graph().setOrigin(undefined, 500).draw()', assert => {
    const actual = new Sut().setOrigin(undefined, 500).draw();

    assert.true(
        actual.includes('<path d="M0 500 L600 500" stroke="#000" opacity="0.5" />'),
        'should return a graph with the expected x axis.'
    );
    assert.true(
        actual.includes('<path d="M300 0 L300 300" stroke="#000" opacity="0.5" />'),
        'should return a graph with the expected y axis.'
    );
    assert.end();
});

test('new Graph().point()', assert => {
    const graph = new Sut();
    const actual = graph.point();
    assert.equal(
        actual.x,
        0,
        'should return a point with default x 0.'
    );
    assert.equal(
        actual.y,
        0,
        'should return a point with default y 0.'
    );
    assert.end();
});

test('new Graph().setOrigin(100,100).point()', assert => {
    const graph = new Sut();
    assert.equal(
        graph.setOrigin(100, 200).point().x,
        0,
        'should return a point with default x 0.'
    );
    assert.equal(
        graph.setOrigin(100, 200).point().y,
        0,
        'should return a point with point with default y 0.'
    );
    assert.end();
});

test('graph.draw([graph.line(pointA)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.line(graph.point(100, 100))
        ]).includes('<path d="M400 50 L300 150" stroke="#000" opacity="0.5" />'),
        'should return an svg including a line between the given point and the default origin.'
    );
    assert.end();
});

test('graph.draw([graph.horizontalLine(y)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.horizontalLine(100)
        ]).includes('<path d="M0 50 L600 50" stroke="#000" opacity="0.5" />'),
        'should return an svg including a line between the given point and the default origin.'
    );
    assert.end();
});

test('graph.draw([graph.verticalLine(x)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.verticalLine(100)
        ]).includes('<path d="M400 0 L400 300" stroke="#000" opacity="0.5" />'),
        'should return an svg including a line between the given point and the default origin.'
    );
    assert.end();
});

test('graph.draw([graph.polygon(points)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.polygon([
                graph.point(50, 100),
                graph.point(undefined, 100),
                graph.point()
            ])
        ]).includes('<polygon points="350,50 300,50 300,150" fill="#000" opacity="0.5" />'),
        'should return an svg including a polygon described by the given points.'
    );
    assert.end();
});

test('graph.draw([graph.quadraticBezier(points)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.quadraticBezier(
                graph.point(50, 100),
                graph.point(undefined, 100),
                graph.point()
            )
        ]).includes('<path d="M350 50 Q300 50, 300 150" stroke="#000" fill="none" opacity="0.5" />'),
        'should return an svg including a quadratic bezier described by the given points.'
    );
    assert.end();
});

test('graph.draw([graph.cubicBezier(points)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.cubicBezier(
                graph.point(50, 100),
                graph.point(undefined, 100),
                graph.point(),
                graph.point(-50, 50)
            )
        ]).includes('<path d="M350 50 C300 50, 300 150, 250 100" stroke="#000" fill="none" opacity="0.5" />'),
        'should return an svg including a cubic bezier described by the given points.'
    );
    assert.end();
});

test('graph.draw([graph.text(text, point)])', assert => {
    const graph = new Sut();
    assert.true(
        graph.draw([
            graph.text('text')
        ]).includes('<text x="300" y="150" fill="#000" opacity="0.5" text-anchor="start" font-size="10">text</text>'),
        'should return an svg including text at the origin.'
    );
    assert.end();
});