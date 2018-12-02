const test = require('tape');
const Point = require('../src/point');
const Elements = require('../src/elements');
const Sut = require('../src/divisions');


test('Divisions.getIncrementsInRange(-30, 30, 5)', assert => {
    assert.deepEqual(
        Sut.getIncrementsInRange(-30, 30, 5),
        [-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25],
        'should return multiples of 5 from -30 to 30 excluding start and end points.'
    );
    assert.end();
});

test('Divisions.getIncrementsInRange(-30, 30, 7)', assert => {
    assert.deepEqual(
        Sut.getIncrementsInRange(-30, 30, 7),
        [-23, -16, -9, -2, 5, 12, 19, 26],
        'should return increments of 7 from -30 to 30 excludug start point.'
    );
    assert.end();
});

test('Divisions.getIncrementsInRange(30, -30, -5)', assert => {
    assert.throws(
        () => Sut.getIncrementsInRange(30, -30, -5),
        'should throw.'
    );
    assert.end();
});

test('Divisions.getIncrementsInRange(30, -10, 5)', assert => {
    assert.deepEqual(
        Sut.getIncrementsInRange(30, -10, 5),
        [25, 20, 15, 10, 5, 0, -5],
        'should return increments of 5 from 30 to -10 excluding start and end points.'
    );
    assert.end();
});

// test('Divisions.getVectorIncrementsInRange(a, b, 5)', assert => {
//     const a = new Point(-4, 3);
//     const b = new Point(4, -3);
//     assert.deepEqual(
//         Sut.getVectorIncrementsInRange(new Point(-4, 3), new Point(4, -3), 5),
//         [new Point],
//         'should return increments of 5 along line ab excluding start and end points.'
//     );
//     assert.end();
// });

// test('Divisions.getElements(point, offsetPoint, text)', assert => {
//     const point = new Point();
//     const offsetPoint = new Point(0, 10);
//     const text = 0;

//     assert.deepEqual(
//         Sut.getElements(point, offsetPoint, text).map(e => e(new Elements(), new Point())),
//         [
//             '<path d="M0 0 L0 -10" stroke="undefined" opacity="undefined" />',
//             '<text x="0" y="-10" fill="undefined" opacity="undefined" text-anchor="undefined" font-size="undefined">0</text>'
//         ],
//         'should return functions for creating the correct line and text elements.'
//     );
//     assert.end();
// });