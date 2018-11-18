class Point {
    constructor(origin, x = 0, y = 0) {
        if (typeof (origin) !== 'object')
            throw new Error('You must pass the origin to a new Point.');

        this.x = x + origin.x;
        this.y = y + origin.y;
    }
}

module.exports = Point;