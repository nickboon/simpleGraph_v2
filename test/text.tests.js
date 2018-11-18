const test = require('tape');
const Elements = require('../src/elements');
const Vector = require('../src/vector');
const Sut = require('../src/text');

test('new Text(text, point)', assert => {
    const point = new Vector(100, 100);
    assert.deepEqual(
        new Sut('text', point), {
            text: 'text',
            point: point,
        },
        'should return a text object with a point at the origin.'
    );
    assert.end();
});

test('new Text(text, point).elements(elementFactory)', assert => {
    assert.equal(
        new Sut('text', new Vector()).elements(new Elements()),
        '<text x="0" y="0" fill="undefined" opacity="undefined" text-anchor="undefined" font-size="undefined">text</text>',
        'should return a text element with the given point.'
    );
    assert.end();
});