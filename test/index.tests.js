const test = require('tape');
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
    assert.equal(
        new Sut().draw(),
        expected,
        'should return an svg with default dimensions, origin and axes.'
    );
    assert.end();
});

test('new Graph(100,100).draw()', assert => {
    assert.true(
        new Sut(100, 100).draw().includes(
            `width="100"
            height="100"`),
        'should return a 100 x 100 pixel svg.'
    );
    assert.end();
});

test('new Graph().setDimensions(100,100).draw()', assert => {
    assert.true(
        new Sut().setDimensions(100, 100).draw().includes(
            `width="100"
            height="100"`),
        'should return a 100 x 100 pixel svg.'
    );
    assert.end();
});

test('new Graph().setDimensions(undefined,100).draw()', assert => {
    assert.true(
        new Sut().setDimensions(undefined, 100).draw().includes(
            `width="600"
            height="100"`),
        'should return a 100 pixel high svg with the default width.'
    );
    assert.end();
});

test('new Graph().setDefaults({width:700}).setDimensions(undefined,100).draw()', assert => {
    assert.true(
        new Sut().setDefaults({
            width: 700
        }).setDimensions(undefined, 100).draw().includes(
            `width="700"
            height="100"`),
        'should return a 100 pixel high svg with the set default width.'
    );
    assert.end();
});

test('new Graph().setDefaults({colour:\'#f00\', opacity:0.1}).draw()', assert => {
    assert.true(
        new Sut().setDefaults({
            colour: '#f00',
            opacity: 0.1
        }).draw().includes(
            `<path d="M0 150 L600 150" stroke="#f00" opacity="0.1" />
            <path d="M300 0 L300 300" stroke="#f00" opacity="0.1" />`),
        'should return a 100 pixel high svg with the set default width.'
    );
    assert.end();
});

test('new Graph().setOrigin(undefined, 500).draw()', assert => {
    assert.true(
        new Sut().setOrigin(undefined, 500).draw().includes(
            `<path d="M0 500 L600 500" stroke="#000" opacity="0.5" />
            <path d="M300 0 L300 300" stroke="#000" opacity="0.5" />`),
        'should return a graph with an origin at the default value for x and a y value of 500.'
    );
    assert.end();
});

test('new Graph().setOrigin(100,100).point()', assert => {
    const graph = new Sut();
    assert.deepEqual(
        graph.point(),
        graph.origin,
        'should return a point at the default origin.'
    );
    assert.end();
});

test('new Graph().setOrigin(100,100).point()', assert => {
    const graph = new Sut();
    assert.deepEqual(
        graph.setOrigin(100, 100).point(),
        graph.origin,
        'should return a point at the given origin.'
    );
    assert.end();
});

test('new Graph().line(pointA)', assert => {
    const graph = new Sut();
    const pointA = graph.point(100, 100);
    assert.deepEqual(
        graph.line(pointA), {
            points: [
                pointA,
                graph.origin
            ]
        }, 'should return a line between the given point and the default origin.'
    );
    assert.end();
});

test('graph.draw([graph.line(pointA)])', assert => {
    const graph = new Sut();
    const pointA = graph.point(100, 100);
    assert.true(
        graph.draw([
            graph.line(pointA)
        ]).includes('<path d="M400 50 L300 150" stroke="#000" opacity="0.5" />'),
        'should return an svg including a line between the given point and the default origin.'
    );
    assert.end();
});