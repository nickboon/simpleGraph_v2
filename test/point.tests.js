// const test = require('tape');
// const Sut = require('../src/point');
// const Vector = require('../src/vector');

// const toVector = point => new Vector(point.x, point.y);

// test('new Point(origin)', assert => {
//     const origin = new Vector(100, 100);
//     assert.deepEqual(
//         toVector(new Sut(origin)),
//         new Vector(),
//         'should return a point at the origin.'
//     );
//     assert.end();
// });

// test('new Point(origin, undefined, 100)', assert => {
//     const origin = new Vector(100, 100);
//     assert.deepEqual(
//         toVector(new Sut(origin)),
//         new Vector(),
//         'should return a point with y = 200.'
//     );
//     assert.end();
// });

// test('new Point()', assert => {
//     assert.throws(
//         () => new Sut(),
//         'should throw.'
//     );
//     assert.end();
// });