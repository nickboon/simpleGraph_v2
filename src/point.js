class Point {
    constructor(origin, x = 0, y = 0) {
        if (typeof (origin) !== 'object')
            throw new Error('You must pass the origin to a new Point.');

        this.x = origin.x + x;
        this.y = origin.y - y;
    }
}

module.exports = Point;